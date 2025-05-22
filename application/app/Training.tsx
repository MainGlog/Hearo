import {View, Text, StyleSheet, Animated, Button} from "react-native";
import Routine from "@/models/Routine";
import ScaleExercise from "@/models/ScaleExercise";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "@/app/index";
import ChordExercise from "@/models/ChordExercise";
import NotesExercise from "@/models/NotesExercise";
import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import {StatusBar} from "expo-status-bar";
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

    const [exercisesPlayed, setExercisesPlayed] = useState<number>(0);
    // TODO for each exercise, increment exercisesPlayed by one
    const Progress = ({step, steps, height}: {step: number; steps: number; height: number}) => {
        const [width, setWidth] = useState<number>(0);
        const animatedValue = useRef(new Animated.Value(-1000)).current; // We set it to -1000 so the value is outside the screen before getting the width of the container
        const reactive = useRef(new Animated.Value(-1000)).current; // useRef allows the value to remain the same after re-renders, similar to remember in Kotlin

        useEffect(() => {
            reactive.setValue(-width + (width * step) / steps);

            Animated.timing(animatedValue, {
                toValue: reactive,
                duration: 100,
                useNativeDriver: true,
            }).start();
        }, [step, width]);

        return (
            <>
                <Text style={styles.progressText}>{step} / {steps}</Text>
                <View
                    onLayout={e => {
                        setWidth(e.nativeEvent.layout.width);
                    }}
                    style={{
                        height,
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        borderRadius: height,
                        overflow: 'hidden'
                    }}
                >
                    <Animated.View
                        style={{
                            height,
                            width: '100%',
                            borderRadius: height,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            transform: [{
                                translateX: animatedValue
                            }]
                        }}
                    />
                </View>
            </>
        )
    }

    return (
        <View style={styles.container}>
            <StatusBar hidden/>
            <Progress step={exercisesPlayed} steps={10} height={20}/>

            <Button title={"Increment Step"} onPress={() => setExercisesPlayed(exercisesPlayed + 1)}/>
            <Button title={"Reset Step"} onPress={() => setExercisesPlayed(0)}/>
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
    },
    progressText: {
        fontSize: 12,
        fontWeight: 900,
        marginBottom: 5
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: 20
    }
})