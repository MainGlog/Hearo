import {View, Text, StyleSheet} from "react-native";
import Routine from "@/models/Routine";
import ScaleExercise from "@/models/ScaleExercise";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "@/app/index";
import ChordExercise from "@/models/ChordExercise";
import NotesExercise from "@/models/NotesExercise";

interface TrainingScreenProps extends NativeStackScreenProps<RootStackParamList, 'Training'> {}

export default function TrainingScreen({route}: TrainingScreenProps){
    let routine = new Routine(route.params.id ?? 0, route.params.name ?? 'My Routine',
        route.params.exerciseCount ?? 10, route.params.timeToGuess ?? 25, route.params.description ?? 'Description');

    routine.exercises = route.params.exercises;

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

    // TODO determine which type of exercise is returned by getRandomExercise
    //  Develop visual components
    //  Make it play the sound!
    const exercise = getRandomExercise(routine);
    switch (exercise) {
        case exercise instanceof ScaleExercise:
            break;
        case exercise instanceof ChordExercise:
            break;
        case exercise instanceof NotesExercise:
            break;
    }

    return (
        <View>
            <View style={styles.topBar}></View>

            <Text></Text>
        </View>
    );

}

function getRandomExercise(routine: Routine): ScaleExercise | ChordExercise | NotesExercise  {
    const exercise = routine.exercises[Math.floor(Math.random() * routine.exercises.length)];

    switch (exercise.type)
    {
        case ("scale"):
            return exercise as ScaleExercise
        case ("chord"):
            return exercise as ChordExercise
        case ("notes"):
            return exercise as NotesExercise
    }
    return exercise;
}

const styles = StyleSheet.create({
    topBar: {
        backgroundColor: '#7f926d',
        height: 50
    }
})