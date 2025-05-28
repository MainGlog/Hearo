import {View, StyleSheet, Text,} from "react-native";
import Routine from "@/models/Routine";
import {FontAwesome} from "@expo/vector-icons";
import {MultiSelect} from "react-native-element-dropdown";
import {useEffect, useState} from "react";
import Chord from "@/models/Chord";
import ScaleExercise from "@/models/ScaleExercise";
import {createSERoutine, getAllSERoutines} from "@/services/SERoutineService";
import SERoutine from "@/models/SERoutine";
import {getAllRoutines} from "@/services/RoutineService";
import {createScaleExercise, getAllScaleExercises} from "@/services/ScaleExerciseService";
import Exercise from "@/models/Exercise";

// Used to please TypeScript when passing in the properties from AddToRoutineButton
type Props = {
    scaleExercise: ScaleExercise | null,
    exercise: Exercise | null,
    chord: Chord | null,
    buttonSize: string
}

export default function AddToRoutineModal({scaleExercise, exercise, buttonSize} : Props) {
    const [routines, setRoutines] = useState<Routine[] | void>([]);
    const [scaleExercises, setScaleExercises] = useState<ScaleExercise[] | void>([]);
    const [SERoutines, setSERoutines] = useState<SERoutine[] | void>([]);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [previousItems, setPreviousItems] = useState<string[]>([]);
    const [newestItem, setNewestItem] = useState<string>('');
    const [routinesAsJSONArray, setRoutinesAsJSONArray] = useState<Array<{id: string, name: string}>>([]);
    const [selectedRoutines, setSelectedRoutines] = useState<Routine[]>([]);

    useEffect(() => {
        if (scaleExercise) createScaleExercise(
            scaleExercise.listeningMode!, scaleExercise.timePerNote!, scaleExercise.numberOfNotes,
            scaleExercise.numberOfOctaves, scaleExercise.scaleId
        );
        const fetchData = async() => {
            try {
                const routinesData = await getAllRoutines();
                const scaleExercisesData = await getAllScaleExercises();
                const SERoutineData = await getAllSERoutines();

                setRoutines(routinesData);
                setScaleExercises(scaleExercisesData);
                setSERoutines(SERoutineData);

                // AddToRoutineModal is used in ScalesDetails, where the scaleExercise is being created
                // In that page, the amount of scaleExercises is not known, so the object created has an ID of 0
                // To avoid a redundant API call, the true id is set here as there's already a call to get all scaleExercises
                if (scaleExercise && exercise) {
                    scaleExercise.id = scaleExercisesData.length;
                    exercise.id = scaleExercise.id;
                }

                if (routinesData) {
                    const routinesJSON = routinesData.map((routine) => ({
                        id: routine.id.toString(),
                        name: routine.name,
                    }));
                    setRoutinesAsJSONArray(routinesJSON)
                }
            }
            catch (error) {
                console.error("Error retrieving data: " + error);
            }
        }
        fetchData();
    }, [])

    return(
        <MultiSelect
            data={routinesAsJSONArray}
            labelField={'name'}
            valueField={'id'}
            // TODO conditional styling based on whether an item has been selected, get the icon to change as well
            renderItem={(item: any, selected?: boolean) => (
                // This sets the top and bottom items in the container to their appropriate styles if they exist
                // A boolean followed by && will apply the style if the boolean is true
                <View style={[styles.routineContainer,
                    selectedRoutines[0] === item && styles.selectedItemTop,
                    selectedRoutines[selectedRoutines.length - 1]  === item && styles.selectedItemBottom,
                    selected && styles.selectedItem]}>
                    <Text style={styles.routineText}>{item.name}</Text>
                    <FontAwesome style={{marginRight: 5}} name={"plus"} size={15} color="grey" />
                </View>
            )}
            visibleSelectedItem={false}
            placeholder={''}
            value={selectedItems}
            style={buttonSize === 'mini' ? styles.mini : styles.large}
            containerStyle={styles.container}
            mode={'modal'}
            onBlur={() => {
                setSelectedItems([]);
                setSelectedRoutines([]);
            }}
            selectedStyle={{borderColor: '#FFF000', borderWidth: 5}} // TODO adjust styles to set the first and last items with the proper border
            selectedTextStyle={{color: "#00FFFF"}} // TODO set the first and last items to
            onChange={item => {

                // TODO figure out how to extract the latest item from the array
                //  This will be used when creating the routine in the selectedItems.map block

                setSelectedItems(item);

                const newRoutinesArray = item.map(id => routines![Number(id)]).filter(routine => routine != null);
                setSelectedRoutines(newRoutinesArray);

                // TODO figure out how to handle the fact that you can toggle items to be selected
                const newItem = item.find(i => !previousItems.includes(i))
                if (newItem) setNewestItem(newItem);

                selectedItems.map((item) => {
                    if(item.includes("Create New Routine")) {
                        // TODO Create New Routine Logic
                        //  Will likely not be in V1
                    }

                    // Item corresponds to the indices in the list of routines
                    // TODO fix the index after extracting latest index
                    const routine = routines![Number(newestItem)];

                    // Prevent duplicate entries
                    if (routine && !selectedRoutines.includes(routine)) {
                        setSelectedRoutines([...selectedRoutines, routine]);
                    }
                })

                if (scaleExercise) {
                    newRoutinesArray.forEach((routine) => {
                        // Ensure no duplicates
                        const existingExercise = SERoutines!.find(ser =>
                            ser.exerciseId === scaleExercise.id &&
                            ser.routineId === routine.id
                        );

                        console.log(scaleExercise);
                        console.log(routine);

                        if (!existingExercise) {
                            // TODO set this to only activate after the user has clicked a confirm button
                            const seRoutine = new SERoutine(scaleExercise.id, routine.id);
                            setSERoutines(SERoutines ? [...SERoutines, seRoutine ] : [seRoutine]);


                            // Add to database
                            createSERoutine(scaleExercise.id, routine.id)
                                .catch(error => {
                                    console.log("Error creating SERoutine: " + error);
                                });

                            // Add exercise to routine's exercise array if not already present
                            if (!routine.exercises) routine.exercises = [scaleExercise];
                            else if (!routine.exercises.some(ex => ex.id === scaleExercise.id)) {
                                routine.exercises.push(scaleExercise);
                            }
                        }
                    })

                }
            }}
            renderLeftIcon={() => (
                <FontAwesome style={styles.icon} name={"plus"} size={15} color="grey" />
            )}
            renderRightIcon={() => null}
            flatListProps={{

            }}
            iconStyle={
                styles.icon
                // TODO Find a way to style this dynamically, making the plus sign change based on whether the item is selected
            }
        >
        </MultiSelect>
    );
}

const styles = StyleSheet.create({
    modal: {
        zIndex: 10,
        elevation: 10
    },
    mini: {
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "grey",
        width: 20,
        height: 20,
        marginTop: 15,
        marginLeft: 10,
        backgroundColor: 'lightgreen'
    },
    large: {
        borderRadius: 20,
        backgroundColor: '#e3e1e7',
        marginTop: 10,
        paddingHorizontal: 10,
        maxWidth: "40%",
    },
    container: {
        borderRadius: 20,

        borderWidth: 1,
        marginHorizontal: "auto",
        marginVertical: "auto",
        minWidth: "60%",
    },
    headingText: {
        textAlign: "center",
        borderBottomWidth: 1,
    },
    routineContainer: {
        flexDirection: "row",
        paddingVertical: 10,
        justifyContent: "space-between",
    },
    routineText: {
        fontSize: 15,
        textAlign: "center",
        marginLeft: "15%"
    },
    icon: {
        marginLeft: 2,
        marginTop: 1,
        alignContent: "center"
    },
    saveButton: {
        borderWidth: 1,
        borderRadius: 20,
        maxWidth: "25%",
        marginHorizontal: "auto",
        paddingHorizontal: 20,
        marginVertical: 5
    },
    saveButtonText: {
        textAlign: "center"
    },
    selectedItem: {
        backgroundColor: '#acefff',
        flexDirection: "row",
        paddingVertical: 3,
        justifyContent: "space-between"
    },
    selectedItemTop: {
        backgroundColor: '#acefff',
        flexDirection: "row",
        paddingVertical: 3,
        justifyContent: "space-between",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    selectedItemBottom: {
        backgroundColor: '#acefff',
        flexDirection: "row",
        paddingVertical: 3,
        justifyContent: "space-between",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    selectedText: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center'
    }
});