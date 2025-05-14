import {View, TextInput, Text, TouchableOpacity, StyleSheet} from "react-native";
import Routine from "@/models/Routine";
import Exercise from "@/models/Exercise";
import {createRoutine} from "@/services/RoutineService";

export default function RoutineBuilderScreen() {
    let name: string;
    let exerciseCount: number;
    let timeToGuess: number;
    let exercises: Exercise[];

    // Required
    // Name routine - Input Field
    //
    // Options
    // Number of exercises to play
    // Times to play each exercise
    // Time to guess
    //
    // Button to add exercises


    return (
        <View>
            <TextInput
                style={styles.optionButton}
                placeholder="Name your Routine"
                onChangeText={(text) => {
                    name = text;
                }}
            />

            <TextInput
                style={styles.optionButton}
                placeholder="Number of Exercises"
                keyboardType="numeric"
                onChangeText={(text) => {
                    // TODO Safely cast to int
                    exerciseCount = Number(text);
                }}
            />

            <TextInput
                style={styles.optionButton}
                placeholder="Time to Guess"
                keyboardType="numeric"
                onChangeText={(text) => {
                    // TODO Safely cast to int
                    timeToGuess = Number(text);
                }}
            />

            <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>
                <TouchableOpacity
                    style={styles.optionButton}
                    onPress={() => {
                        // TODO Popup to select exercises from Chords, Scales, or Notes

                    }}
                >
                    <Text>Add Exercises</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.optionButton}
                    onPress={() => {
                        if (!name || !exerciseCount || !timeToGuess) {
                            console.error("Please fill in all fields");
                            return;
                        }
                        const routine = new Routine(name, exerciseCount, timeToGuess);
                        createRoutine(routine)
                            .then(() => {
                                console.log("Yippee!");
                            })
                            .catch((error) => {
                                console.error(":( " + error);
                            });
                    }}
                >
                    <Text style={{textAlign: "center"}}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    optionButton: {
        borderRadius: 20,
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 20,
        minWidth: '20%',
        textAlign: 'center',
        alignContent: 'center'
    }
});