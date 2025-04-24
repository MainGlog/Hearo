import {View, StyleSheet, FlatList, Text, Pressable, Modal, TouchableOpacity} from "react-native";
import {SafeAreaView, SafeAreaProvider} from "react-native-safe-area-context";
import Routine from "@/models/Routine";
import Exercise from "@/models/Exercise";
import {FontAwesome} from "@expo/vector-icons";
import {MultiSelect} from "react-native-element-dropdown";

// @ts-ignore
const routines: Routine[] = [
    new Routine(1, "Routine 1", []),
    new Routine(2, "Routine 2", []),
    new Routine(3, "Routine 3", []),
    new Routine(4, "Routine 4", []),
    new Routine(5, "Routine 5", []),
    new Routine(6, "Routine 6", []),
];

const routinesAsJSONArray: any[] = routines.map((routine) => ({
    id: routine.id.toString(),
    name: routine.name,
    exercises: routine.exercises
}))

let selectedRoutines: Routine[] = [];

// Used to please TypeScript when passing in the properties from AddToRoutineButton
type Props = {
    exercise: Exercise | null,
    buttonSize: string
}

export default function AddToRoutineModal({exercise, buttonSize} : Props) {
    return(
        <MultiSelect
            data={routinesAsJSONArray}
            labelField={'name'}
            valueField={'id'}
            // TODO conditional styling based on whether an item has been selected, get the icon to change as well
            renderItem={(item: any, selected?: boolean) => (
                <View style={[styles.routineContainer, selectedRoutines[0] === item && styles.selectedItemTop,
                    selectedRoutines[selectedRoutines.length - 1]  === item && styles.selectedItemBottom,
                    selected && styles.selectedItem]}>
                    <Text style={styles.routineText}>{item.name}</Text>
                    <FontAwesome style={{marginRight: 5}} name={"plus"} size={15} color="grey" />
                </View>
            )}
            visibleSelectedItem={false}
            placeholder={''}
            style={buttonSize === 'mini' ? styles.mini : styles.large}
            containerStyle={styles.container}
            mode={'modal'}
            onChange={(selectedItems: string[]) => {
                // Add routine to the running array based on the names of the selected items
                selectedItems.map((item) => {
                    if(item.includes("Create New Routine")) {
                        // TODO Create New Routine Logic
                    }

                    const routine = routines.find((routine) => routine.name === item);
                    if (routine) {
                        if (selectedRoutines.includes(routine)){
                            // Prevents duplicate entries
                            return;
                        }
                        selectedRoutines.push(routine)
                    }
                })

                // Add the exercise to the exercise arrays in the selected routines
                if (selectedRoutines && exercise) {
                    for (let routine of selectedRoutines) {
                        routine!.exercises.push(exercise!);
                    }
                }
            }}
            renderLeftIcon={() => (
                <FontAwesome style={styles.icon} name={"plus"} size={15} color="grey" />
                )
            }
            renderRightIcon={() => null}
            flatListProps={{

            }}
            iconStyle={
                styles.icon
                // Find a way to style this dynamically, making the plus sign change based on whether the item is selected
            }
        >

        </MultiSelect>
    )
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
        borderWidth: 1,
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