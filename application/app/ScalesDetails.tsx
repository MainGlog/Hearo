import {View, StyleSheet, Text, Image, TouchableOpacity, TextInput, Keyboard} from 'react-native';
import Scale from '@/models/Scale';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/app/index';
import {createRef, useState} from 'react';
import AddToRoutineButton from '@/components/AddToRoutineButton';
import Exercise from '@/models/Exercise';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import Note from "@/models/Note";
import DismissKeyboard from "@/components/DismissKeyboard";

interface ScalesDetailsScreenProps extends NativeStackScreenProps<RootStackParamList, 'ScaleDetails'> {}

//@ts-ignore
export default function ScalesDetailsScreen({route}){
    const scale = new Scale(route.params.name, route.params.imageFilePath, route.params.notes as Note[]);

    const [ascendingButtonActive, setAscendingButtonActive] = useState(false);
    const [randomButtonActive, setRandomButtonActive] = useState(false);
    const [customButtonActive, setCustomButtonActive] = useState(false);

    const listeningModeButtonStates = {
        'ascending': setAscendingButtonActive,
        'random': setRandomButtonActive,
        'custom': setCustomButtonActive
    }

    const exercise = new Exercise('scale', 'Scale Exercise', null, null, scale);
    const options = {
        listeningMode: 'ascending',
        timePerNote: 2,
        randomOptions: {
            numberOfNotes: 5,
            numberOfOctaves: 2,
        },
        customOptions: {
            notesToInclude: [Note],
            order: 'ascending',
        }
    }

    let notesAsKeyValue: any[] = scale.notes.map((note, index) => ({
        key: index.toString(),
        value: note.name
    }));


   /* for (let i = 0; i < scale.notes.length; i++) {
        notesAsKeyValue.push({ key: i.toString(), value: scale.notes[i].name })
        console.log(notesAsKeyValue[i].key);
    }*/



    return (
        <DismissKeyboard>
            <View>
                <Text style={styles.title}>{scale!.name} Scale</Text>
                <View style={styles.imageContainer}>
                    <Image style={styles.imageContainer} source={scale!.imageFilePath}></Image>
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
                                options.listeningMode = 'ascending';
                            }}
                        >
                            <Text style={styles.modeSelectionText}>Ascending & Descending (Default)</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.modeContainer, {backgroundColor: randomButtonActive ? 'lightblue' : 'transparent'}]}
                            onPress={() => {
                                setButtonActivity('random');
                                options.listeningMode = 'random';
                            }}

                        >
                            <Text style={styles.modeSelectionText}>Random Notes</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.modeContainer, {backgroundColor: customButtonActive ? 'lightblue' : 'transparent'}]}
                            onPress={() => {
                                setButtonActivity('custom');
                                options.listeningMode = 'custom';
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
                                            options.randomOptions.numberOfNotes = Number(numberOfNotes.nativeEvent.text);
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
                                        options.randomOptions.numberOfOctaves = Number(numberOfOctaves.nativeEvent.text);
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
                                style={styles.optionButton}
                                data={notesAsKeyValue}
                                mode={"modal"}
                                placeholder={'Notes to Include'}
                                placeholderStyle={styles.optionLabel}
                                onChange={() => {

                                }}
                                visibleSelectedItem={false}
                                onConfirmSelectItem={(item) => {
                                    // Clear the list first
                                    options.customOptions.notesToInclude.splice(0, 1);

                                    // Add selected notes to the list
                                    options.customOptions.notesToInclude.push(item);
                                }}
                                labelField={'value'}
                                valueField={'key'}
                            />
                            <TouchableOpacity
                                // This should give a menu where users can drag around the notes in the included list
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
                            onSelectionChange={(input) => {
                                /*if (isNaN(Number(input))) {
                                    this.textInput.clear()
                                }*/
                                options.timePerNote = Number(input);
                            }}
                        >
                            <Text style={styles.placeholderLabel}>Time per Note</Text>
                        </TextInput>
                    </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <AddToRoutineButton exercise={exercise} isMiniButton={false}></AddToRoutineButton>
                </View>
            </View>
        </DismissKeyboard>
    )

    function setButtonActivity(buttonName: String)
    {
        listeningModeButtonStates['ascending'](false);
        listeningModeButtonStates['random'](false);
        listeningModeButtonStates['custom'](false);

        switch (buttonName)
        {
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
        minWidth: '33%',
        textAlign: 'center',
        alignContent: 'center'
    },
    optionLabel: {
        textAlign: 'center',
        fontSize: 16
    },
    placeholderLabel: {
        textAlign: 'center',
        color: 'grey'
    }
});