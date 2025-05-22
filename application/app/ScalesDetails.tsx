import {View, StyleSheet, Text, Image, TouchableOpacity, TextInput, Keyboard} from 'react-native';
import Scale from '@/models/Scale';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/app/index';
import {useEffect, useState} from 'react';
import AddToRoutineButton from '@/components/AddToRoutineButton';
import Exercise from '@/models/Exercise';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import Note from "@/models/Note";
import DismissKeyboard from "@/components/DismissKeyboard";
import Key from "@/models/Key";
import {getIntervalsByScaleId} from "@/services/IntervalService";
import Interval from "@/models/Interval";
import ScaleExercise from "@/models/ScaleExercise";
import {getAllNotes} from "@/services/NoteService";
import {getAllKeys} from "@/services/KeyService";
interface ScalesDetailsScreenProps extends NativeStackScreenProps<RootStackParamList, 'ScaleDetails'> {}

export default function ScalesDetailsScreen({route}: ScalesDetailsScreenProps) {
    let scale = new Scale(route.params.id, route.params.name, route.params.quality,
        route.params.rootId, route.params.keyId, route.params.imageFilePath);

    const [notes, setNotes] = useState<Note[]>([]);
    const [keys, setKeys] = useState<Key[]>([]);
    const [intervals, setIntervals] = useState<Interval[] | void>([]);
    let scaleNotes: Note[] = [];
    const [scaleNotesAsKeyValue, setScaleNotesAsKeyValue] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const intervalsData = await getIntervalsByScaleId(scale.id);
                const keysData = await getAllKeys();
                const notesData = await getAllNotes();

                setIntervals(intervalsData);
                setKeys(keysData);
                setNotes(notesData);

                // For some reason, the response gives A the id of 11 despite the API response giving it 0
                const A = notesData.find((n) => n.name === "A");
                A!.id = 0;

                // TODO update database to replace scaleRoot (String representation of the root note)
                //  with rootId (foreign key for note). This will require going into population script :(

                scaleNotes.push(notesData.find((n) => n.name === scale.rootId)!);

                intervalsData!.map((i: Interval) => {
                    const note = notesData.find((n) => n.id === i.intervalNoteId)!;
                    scaleNotes.push(note);
                });

                setScaleNotesAsKeyValue(scaleNotes.map((note, index) => ({
                    key: index.toString(),
                    value: note.name
                })));

            }
            catch (error) {
                console.error("Error retrieving data: " + error);
            }
        }
        fetchData();
    }, [scale.id]);

    let notesAsKeyValue: any[] = notes.map((note, index) => ({
        key: index.toString(),
        value: note.name
    }));

    const [ascendingButtonActive, setAscendingButtonActive] = useState(false);
    const [randomButtonActive, setRandomButtonActive] = useState(false);
    const [customButtonActive, setCustomButtonActive] = useState(false);
    const [timePerNoteText, setTimePerNoteText] = useState('');


    const listeningModeButtonStates = {
        'ascending': setAscendingButtonActive,
        'random': setRandomButtonActive,
        'custom': setCustomButtonActive
    }

    const exercise = new Exercise('scale', 0, null, null, scale.id);
    let scaleExercise = new ScaleExercise(0, 'ascending', 10, null, null, scale.id);

    console.log(scale.id);

    return (
        <DismissKeyboard>
            <View>
                <View style={styles.topBar}>
                    <TouchableOpacity
                        // Back Button
                        onPress={() => {
                            // TODO Navigate to Scales page
                        }}
                    />
                    <Text style={styles.title}>{scale!.name.split(' ')[1]} Scale</Text>
                    <Dropdown
                        // Button to select the key or root note for the scale
                        style={{...styles.optionButton, minWidth: "25%"}}
                        data={notesAsKeyValue}
                        mode={'modal'}
                        placeholder={'Select Key'}
                        placeholderStyle={styles.optionLabel}
                        labelField={'value'}
                        valueField={'key'}
                        value={'C'}
                        onChange={(note) => {
                            if (exercise.scale) {
                                exercise.scale.keyId = keys
                                    .find((k) => k.quality === exercise.scale!.quality
                                        && k.name.includes(note.name))?.id!
                                // TODO whenever this changes, the API needs to refresh with new notes data to reflect the new key
                            }
                        }}
                    />
                </View>

                <View style={styles.imageContainer}>
                    <Image style={styles.imageContainer} source={Scale.returnImageFilePath(scale.imageFilePath) as any}></Image>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionText}>
                        {/*{scale!.description}*/}
                    </Text>
                </View>

                <View style={styles.listeningModesContainer}>
                    <Text style={styles.heading}>Listening Modes</Text>
                    <View style={styles.modeSelectionContainer}>
                        <TouchableOpacity
                            style={[styles.modeContainer, {backgroundColor: ascendingButtonActive ? 'lightblue' : 'transparent'}]}
                            onPress={() => {
                                setButtonActivity('ascending');
                                scaleExercise.listeningMode = 'ascending';
                            }}
                        >
                            <Text style={styles.modeSelectionText}>Ascending & Descending (Default)</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.modeContainer, {backgroundColor: randomButtonActive ? 'lightblue' : 'transparent'}]}
                            onPress={() => {
                                setButtonActivity('random');
                                scaleExercise.listeningMode = 'random';
                            }}
                        >
                            <Text style={styles.modeSelectionText}>Random Notes</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.modeContainer, {backgroundColor: customButtonActive ? 'lightblue' : 'transparent'}]}
                            onPress={() => {
                                setButtonActivity('custom');
                                scaleExercise.listeningMode = 'custom';
                            }}
                        >
                            <Text style={styles.modeSelectionText}>Custom Selection</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {randomButtonActive ?
                    <View style={styles.optionContainer}>
                        <Text style={styles.heading}>Random Notes Options</Text>
                        <View style={styles.optionRow}>
                            <View>
                                <Text style={styles.optionLabel}>Number of Notes</Text>
                                <TextInput
                                    style={styles.optionButton}
                                    placeholder={'Number of Notes'}
                                    inputMode={'numeric'}
                                    maxLength={2}
                                    onChange={numberOfNotes => {
                                        scaleExercise.numberOfNotes = Number(numberOfNotes.nativeEvent.text);
                                    }}
                                />
                            </View>
                            <View>
                                <Text style={styles.optionLabel}>Number of Octaves</Text>
                                <TextInput
                                    style={styles.optionButton}
                                    placeholder={'Number of Octaves'}
                                    inputMode={'numeric'}
                                    maxLength={2}
                                    onChange={numberOfOctaves => {
                                        scaleExercise.numberOfOctaves = Number(numberOfOctaves.nativeEvent.text);
                                    }}
                                />
                            </View>
                        </View>
                    </View> : null
                }


                {customButtonActive ?
                    <View style={styles.optionContainer}>
                        <Text style={styles.heading}>Custom Selection Options</Text>
                        <View style={styles.optionRow}>
                            <MultiSelect
                                style={{...styles.optionButton, minWidth: '35%'}}
                                data={scaleNotesAsKeyValue}
                                mode={"modal"}
                                placeholder={'Notes to Include'}
                                placeholderStyle={styles.optionLabel}
                                onChange={() => {
                                    // TODO
                                }}
                                visibleSelectedItem={false}
                                onConfirmSelectItem={(item) => {
                                    // Clear the list first
                                    // TODO create EXERCISE_NOTES entity
                                    //  Increment the note order by 1
                                    // options.customOptions.notesToInclude.splice(0, 1);

                                    // Add selected notes to the list
                                    // options.customOptions.notesToInclude.push(item);
                                }}
                                labelField={'value'}
                                valueField={'key'}
                            />
                            <TouchableOpacity
                                // TODO This should give a menu where users can drag around the notes in the included list
                                style={styles.optionButton}
                                onPress={() => {

                                }}
                            >
                                <Text>Order</Text>
                            </TouchableOpacity>
                        </View>
                    </View> : null
                }

                <View style={styles.optionContainer}>
                    <Text style={styles.heading}>Options</Text>
                    <Text style={styles.optionLabel}>Time Per Note (Seconds)</Text>

                    <View style={styles.optionRow}>
                        <TextInput
                            style={styles.optionButton}
                            placeholder={'Time per Note'}
                            onChangeText={setTimePerNoteText}
                            value={timePerNoteText}
                            inputMode={'numeric'}
                        />
                    </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <AddToRoutineButton
                        scaleExercise={scaleExercise}
                        exercise={exercise}
                        isMiniButton={false}/>
                </View>
            </View>
        </DismissKeyboard>
    )

    function setButtonActivity(buttonName: String) {
        listeningModeButtonStates['ascending'](false);
        listeningModeButtonStates['random'](false);
        listeningModeButtonStates['custom'](false);

        switch (buttonName) {
            case 'ascending':
                setAscendingButtonActive(true);
                break;
            case 'random':
                setRandomButtonActive(true);
                break;
            case 'custom':
                setCustomButtonActive(true);
                break;
        }

    }
}



const styles = StyleSheet.create({
    topBar: {
      flexDirection: "row",
        justifyContent: "space-around"
    },
    imageContainer: {
        maxWidth: '99%',
        maxHeight: 125
    },
    title: {
        textAlign: 'center',
        fontSize: 30
    },
    heading: {
        textAlign: 'center',
        fontSize: 20,
        marginVertical: 10
    },
    descriptionContainer:{

    },
    descriptionText: {

    },
    listeningModesContainer: {
        borderTopWidth: 1
    },
    modeSelectionContainer:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    modeContainer: {
        borderRadius: 20,
        borderWidth: 1,
        width: '26%',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    modeSelectionText: {
        alignContent: 'center',
        textAlign: 'center'
    },
    optionContainer: {
        marginTop: 20,
        borderTopWidth: 1,
    },
    optionRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    optionButton: {
        borderRadius: 20,
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 20,
        minWidth: '20%',
        textAlign: 'center',
        alignContent: 'center'
    },
    optionLabel: {
        textAlign: 'center',
        fontSize: 16
    }
});