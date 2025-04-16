import {View, StyleSheet, FlatList, Text, Pressable, Modal} from "react-native";
import {SafeAreaView, SafeAreaProvider} from "react-native-safe-area-context";
import Routine from "@/models/Routine";
import {useState} from "react";
import Exercise from "@/models/Exercise";
import {FontAwesome} from "@expo/vector-icons";
// @ts-ignore

const routines: Routine[] = [
    new Routine(1, "Routine 1", []),
    new Routine(2, "Routine 2", []),
    new Routine(3, "Routine 3", []),
    new Routine(4, "Routine 4", []),
    new Routine(5, "Routine 5", []),
    new Routine(6, "Routine 6", []),
];

// Used to please TypeScript when passing in the properties from AddToRoutineButton
type Props = {
    exercise: Exercise | null,
    isVisible: boolean
}

export default function AddToRoutineModal({exercise, isVisible} : Props){
    // Controls the visibility of the overlay


    return(
        <SafeAreaProvider>
            <SafeAreaView>
                <Modal
                    visible={isVisible}
                    presentationStyle={"overFullScreen"}
                    transparent={true}
                    onShow={() => {
                        // Do something that will make the background blur
                    }}
                >
                    <View style={styles.container}>
                        <Text style={styles.headingText}>
                            Add to Routine
                        </Text>
                        <FlatList
                            data={routines}
                            renderItem={({item}) => (
                                <View style={styles.routineContainer}>
                                    <Text style={styles.routineText}>{item.name}</Text>
                                    <Pressable
                                        onPress={() => {
                                            if (exercise) {
                                                item.exercises.push(exercise!)
                                            }
                                        }}
                                    >
                                        <FontAwesome style={styles.icon} name={"plus"} size={20} color="black" />
                                    </Pressable>
                                </View>
                            )}
                        >
                        </FlatList>
                        <Pressable
                            onPress={() => {
                                isVisible = !isVisible
                                console.log(isVisible)
                            }}
                            style={styles.saveButton}
                        >
                            <Text style={styles.saveButtonText}>Save</Text>
                        </Pressable>
                    </View>
                </Modal>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
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
        borderBottomWidth: 1,
        flexDirection: "row",
        paddingVertical: 3,
        justifyContent: "space-between"
    },
    routineText: {
        fontSize: 15,
        textAlign: "center",
        marginLeft: "15%"
    },
    icon: {
        marginRight: "15%",
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
    }
});