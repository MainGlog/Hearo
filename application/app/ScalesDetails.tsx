import {View, StyleSheet, Text, Image, TouchableOpacity, TextInput, Keyboard} from 'react-native';
import Scale from '@/models/Scale';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/app/index';
import {useEffect, useState} from 'react';
import Exercise from '@/models/Exercise';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import Note from "@/models/Note";
import DismissKeyboard from "@/components/DismissKeyboard";
import Key from "@/models/Key";
import {getIntervalsByScaleId} from "@/services/IntervalService";
import ScaleExercise from "@/models/ScaleExercise";
import {getAllNotes} from "@/services/NoteService";
import {getAllKeys} from "@/services/KeyService";
import {getAllScales} from "@/services/ScaleService";
import AddToRoutineModal from "@/components/AddToRoutineModal";
interface ScalesDetailsScreenProps extends NativeStackScreenProps<RootStackParamList, 'ScaleDetails'> {}

export default function ScalesDetailsScreen({route}: ScalesDetailsScreenProps) {
    let scale = new Scale(route.params.id, route.params.name, route.params.quality,
        route.params.rootId, route.params.keyId, route.params.imageFilePath);

    // ScaleName is used later when changing keys to find the scale of the same type but in a different key
    const scalePrefixIndex= scale.name.indexOf(' ');
    const scaleName = scale.name.slice(scalePrefixIndex, scale.name.length);

    const [rootNote, setRootNote] = useState<string>('');
    const [scaleExercise, setScaleExercise] = useState<ScaleExercise>(new ScaleExercise(0, 'ascending', 10, null, null, scale.id));
    const [exercise, setExercise] = useState<Exercise>(new Exercise('scale', 0, null, null, scale.id));

    const [notes, setNotes] = useState<Note[]>([]);
    const [keys, setKeys] = useState<Key[]>([]);
    const [scales, setScales] = useState<Scale[]>([]);
    let scaleNotes: Note[] = [];
    const [scaleNotesAsKeyValue, setScaleNotesAsKeyValue] = useState<any[]>([]);
    const [notesAsKeyValue, setNotesAsKeyValue] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const keysData = await getAllKeys();
                const notesData = await getAllNotes();
                const scalesData = await getAllScales();

                setKeys(keysData);
                setNotes(notesData);
                setScales(scalesData);

                // For some reason, the response gives A the id of 11 despite the API response giving it 0
                const A = notesData.find((n) => n.name === "A");
                A!.id = 0;

                setNotesAsKeyValue(notesData.map((note, index) => ({
                    key: index.toString(),
                    value: note.name
                })));
            }
            catch (error) {
                console.error("Error retrieving data: " + error);
            }
        }
        fetchData();
    }, [])

    const fetchData = async(newKey: Key | null = null) => {
        try {
            if (newKey) {
                console.log("Scale before reset: ", scale);

                scale = scales.find(s => s.name.includes(scaleName) && s.keyId === newKey.id)!;
                setRootNote(notes.find(n => n.id === scale.rootId)?.name!);

                console.log("Scale: ", scale);
                console.log("ScaleExercise in KeyFetch: ", scaleExercise);

                // exercise.scale = scale;
                setExercise({...exercise, scale: scale});
                // scaleExercise.scaleId = scale.id;
                setScaleExercise({...scaleExercise, scaleId: scale.id, scale: scale});
            }

            // Resets the scale notes after each time the data is fetched
            scaleNotes = [];

            const intervalsData = await getIntervalsByScaleId(scale.id);

            const rootNote = notes.find((n) => n.id === scale.rootId);
            if (rootNote) scaleNotes.push(rootNote);

            for (const interval of intervalsData!) {
                const note = notes.find((n) => n.id === interval.intervalNoteId)!;
                if (note) scaleNotes.push(note);
            }

            if (scaleNotes) setScaleNotesAsKeyValue(scaleNotes.map((note, index) => ({
                key: index.toString(),
                value: note.name
            })));
        }
        catch (error) {
            console.error("Error retrieving data: " + error);
        }
    }

    // Anytime the notes are updated, fetchData is called to refresh the scaleNotes and reflect the new key
    useEffect(() => {
        fetchData();
    }, [notes]);

    const [ascendingButtonActive, setAscendingButtonActive] = useState(false);
    const [randomButtonActive, setRandomButtonActive] = useState(false);
    const [customButtonActive, setCustomButtonActive] = useState(false);
    const [timePerNoteText, setTimePerNoteText] = useState('');

    const listeningModeButtonStates = {
        'ascending': setAscendingButtonActive,
        'random': setRandomButtonActive,
        'custom': setCustomButtonActive
    }

    const defaultBackground = "#e3e1e7";

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
                    <Text style={styles.title}>{rootNote}{scaleName} Scale</Text>
                    <Dropdown
                        // Button to select the key or root note for the scale
                        style={{...styles.optionButton, minWidth: "25%"}}
                        data={notesAsKeyValue}
                        mode={'modal'}
                        placeholder={'Select Key'}
                        placeholderStyle={styles.optionLabel}
                        labelField={'value'}
                        valueField={'key'}
                        onChange={(note) => {
                            if (exercise.scale && keys) {
                                const key = keys
                                    .find((k) => k.quality === exercise.scale!.quality
                                        && k.name === note.value)!;

                                // TODO Gb Minor throws an error

                                fetchData(key);
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
                            style={[styles.modeContainer, {backgroundColor: ascendingButtonActive ? 'lightblue' : defaultBackground}]}
                            onPress={() => {
                                setButtonActivity('ascending');
                                scaleExercise.listeningMode = 'ascending';
                            }}
                        >
                            <Text style={styles.modeSelectionText}>Ascending & Descending (Default)</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.modeContainer, {backgroundColor: randomButtonActive ? 'lightblue' : defaultBackground}]}
                            onPress={() => {
                                setButtonActivity('random');
                                scaleExercise.listeningMode = 'random';
                            }}
                        >
                            <Text style={styles.modeSelectionText}>Random Notes</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.modeContainer, {backgroundColor: customButtonActive ? 'lightblue' : defaultBackground}]}
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
                <AddToRoutineModal
                    scaleExercise={scaleExercise}
                    exercise={exercise}
                    chord={null}
                    buttonSize={'large'}
                />
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
        backgroundColor: '#e3e1e7',
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