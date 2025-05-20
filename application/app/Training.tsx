import Exercise from "@/models/Exercise";
import {View, Text, StyleSheet} from "react-native";
import Routine from "@/models/Routine";
import ScaleExercise from "@/models/ScaleExercise";

type Props = {
    routine: Routine
}

export default function TrainingScreen({routine}: Props){
    // What do you need here?
    // Routine
    // Score tracker - use routine.exerciseCount
    // A way of handling the options for each exercise
    // Boolean for whether the user answered correctly, this will be used to render the results screen

    // Visual Components
    // Progress bar
    // Score tracker
    // Timer
    // Guess entry



    return (
        <View>
            <View> {/*Progress Bar*/} </View>
            <View> {/*Score Tracker*/} </View>
            <View> {/*Timer*/} </View>
            <View> {/*Guess Entry*/} </View>
            <View>
                <Text>{getRandomExercise(routine).type}</Text>
            </View>
        </View>
    );

}

function getRandomExercise(routine: Routine): Exercise {
    const exercise = routine.exercises[Math.random() * routine.exerciseCount];

    switch (exercise.type)
    {
        case ("scale"):
            return exercise as ScaleExercise
        case ("chord"):
            // return exercise as ChordExercise
            break;
        case ("notes"):
            // return exercise as NotesExercise
            break;
    }
    return exercise;
}

const styles = StyleSheet.create({

})