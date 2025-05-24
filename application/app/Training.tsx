import {View, Text, StyleSheet, Animated, Button, TextInput} from "react-native";
import Routine from "@/models/Routine";
import ScaleExercise from "@/models/ScaleExercise";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "@/app/index";
import ChordExercise from "@/models/ChordExercise";
import NotesExercise from "@/models/NotesExercise";
import React, {useEffect, useRef, useState} from "react";
import {StatusBar} from "expo-status-bar";
import {Sound} from "expo-av/build/Audio/Sound";
import SoundModel, {selectSound} from "@/models/Sound";
import {getAllSounds} from "@/services/SoundService";
import {getAllScales} from "@/services/ScaleService";
import Scale from "@/models/Scale";
import {getIntervalsByScaleId} from "@/services/IntervalService";
import Note from "@/models/Note";
import Interval from "@/models/Interval";
import {getAllNotes} from "@/services/NoteService";

interface TrainingScreenProps extends NativeStackScreenProps<RootStackParamList, 'Training'> {}

export default function TrainingScreen({route}: TrainingScreenProps){
    let routine = new Routine(route.params.id ?? 0, route.params.name ?? 'My Routine',
        route.params.exerciseCount ?? 10, route.params.timeToGuess ?? 25, route.params.description ?? 'Description');
    routine.exercises = route.params.exercises;
    const [sounds, setSounds] = useState<SoundModel[]>([]);
    const [scales, setScales] = useState<Scale[]>([]);
    const [notes, setNotes] = useState<Note[]>([]);
    const [activeScale, setActiveScale] = useState<Scale | null>(null);
    const [activeScaleNotes, setActiveScaleNotes] = useState<Note[]>([]);
    const [activeSounds, setActiveSounds] = useState<SoundModel[]>([]);

    useEffect(() => {
        const fetchData = async() => {
            const soundsData = await getAllSounds();
            const scalesData = await getAllScales();
            const notesData = await getAllNotes();

            setSounds(soundsData);
            setScales(scalesData);
            setNotes(notesData);
        }
        fetchData();
    }, [])

    // Once the active scale is set, this will get the necessary information to play it
    const fetchData = async() => {
        const intervalsData = await getIntervalsByScaleId(activeScale!.id);

        let notesArray: Note[] = [];

        // Add Root Note
        notesArray.push(notes.find(n => n.id === activeScale!.rootId)!);

        // Add Other Notes
        intervalsData!.map((interval: Interval) => {
            notesArray.push(notes.find(n => n.id === interval.intervalNoteId)!);
        });

        setActiveScaleNotes(notesArray);


        const rootNoteId = notesArray[0].id;
        const CId = 3; // ID of the note C

        // Starting octave will be 3, that of middle C (C3)
        // unless the root note is closer to the octave below (C2)
        let octave = 0

        const max = Math.max(rootNoteId, CId);
        const min = Math.min(rootNoteId, CId);
        if (max - min > 4 || rootNoteId < 3) octave = 2;
        else octave = 3;

        let soundsArray: SoundModel[] = [];

        // Adds the sound for each note to an array
        for (const note of notesArray) {
            // TODO make every note beyond B increase by one octave
            soundsArray.push(sounds.find(s => s.noteId === note.id
                && s.octave === octave)!);
        }


        // TODO When the page initially loads,

        setActiveSounds(soundsArray);
    }

    // TODO when first running the page, activeScale does not get set quickly enough for the information to be set
    useEffect(() => {
        fetchData();
    }, [activeScale]);

    useEffect(() => {
        fetchData();
    }, []);

    // What do you need here?
    // A way of handling the options for each exercise
    // Boolean for whether the user answered correctly, this will be used to render the results screen

    const [sound, setSound] = useState<Sound>();
    const [soundIndex, setSoundIndex] = useState<number>(0);

    async function playSound() {
        console.log('Loading Sound');

        console.log(activeSounds);
        console.log(soundIndex)

        // @ts-ignore - used for the selectSound method.
        // It gets mad but the function returns a require statement for the audio file
        const file = selectSound(activeSounds[soundIndex].filePath);

        const { sound } = await Sound.createAsync(file);
        setSound(sound);

        console.log('Playing Sound');
        await sound.playAsync();
    }

    useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);


    // TODO determine which type of exercise is returned by getRandomExercise
    //  Develop visual components
    //  Make it play the sound!

    const [exercise, setExercise] = useState<ScaleExercise | ChordExercise | NotesExercise>();

    useEffect(() => {
        getNextExercise();
    }, []);

    const getNextExercise = () => {
        const newExercise = getRandomExercise(routine);
        setExercise(newExercise);

        if (newExercise instanceof ScaleExercise) {
            setActiveScale(scales.find(s => s.id === newExercise.scaleId)!);
        }
        else if (newExercise instanceof ChordExercise) {
            // Chord exercise
        }
        else {
            // Notes exercise
        }
    };

    const [exercisesPlayed, setExercisesPlayed] = useState<number>(0);
    const [guess, setGuess] = useState<string>('');
    // TODO for each exercise, increment exercisesPlayed by one

    return (
        <View style={styles.container}>
            <StatusBar hidden/>
            <Progress step={exercisesPlayed} steps={routine.exerciseCount} height={20}/>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.topBarText}>{exercisesPlayed} / {routine.exerciseCount}</Text>
                <Timer duration={routine.timeToGuess}/>
            </View>

            <Button title={"Increment Step"} onPress={() => setExercisesPlayed(exercisesPlayed + 1)}/>
            <Button title={"Reset Step"} onPress={() => setExercisesPlayed(0)}/>

            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <Button title={"Play Audio"} onPress={() => {playSound()}}></Button>
                <Button title={"Next Note"} onPress={() => {setSoundIndex((prev) => prev + 1)}}></Button>
            </View>
            <TextInput
                style={styles.guessInput}
                value={guess}
                onChangeText={(text) => {
                    setGuess(text);
                }}
                placeholder={'Enter your Guess'}
            />
        </View>
    );
}

function getRandomExercise(routine: Routine): ScaleExercise | ChordExercise | NotesExercise  {
    const exercise = routine.exercises[Math.floor(Math.random() * routine.exercises.length)];

    switch (exercise.type)
    {
        case ("scale"):
            return new ScaleExercise(
                exercise.id, exercise.listeningMode!, exercise.timePerNote!,
                exercise.numberOfNotes, exercise.numberOfOctaves, exercise.scale!.id
            );
        case ("chord"):
            return exercise as ChordExercise;
        case ("notes"):
            return exercise as NotesExercise;
    }
    return exercise;
}


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
        <View
            onLayout={e => {
                setWidth(e.nativeEvent.layout.width);
            }}
            style={{
                height,
                backgroundColor: 'rgba(0,0,0,0.1)',
                borderRadius: height,
                overflow: 'hidden',
                marginBottom: 25
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
    )
}

const Timer = ({duration}: {duration: number}) => {
    const [seconds, setSeconds] = useState<number>(duration);
    const [minutes, setMinutes] = useState<number>(Math.floor(duration / 60));

    // Sets a reference for an interval timeout to be used when clearing the interval
    const intervalRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setSeconds(prev => {
                // Stops the interval when seconds reaches 0
                if (prev <= 1) {
                    clearInterval(intervalRef.current);
                    return 0;
                }
                return prev - 1;
            });
            if (seconds >= 60 && seconds % 60 === 0) {
                setMinutes(prev => prev - 1);
            }
        }, 1000);

        return () => clearInterval(intervalRef.current);
    }, [seconds]);

    return(
        <Text style={styles.topBarText}>{addZero(minutes)}:{addZero(seconds % 60)}</Text>
    )
}

function addZero(time: number): string {
    return time.toString().length < 2 ? `0${time}` : `${time}`;
}

const styles = StyleSheet.create({
    topBar: {
        height: 50
    },
    topBarText: {
        fontSize: 16,
        fontWeight: 900,
        marginBottom: 5,
        marginHorizontal: 10
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        position: 'absolute',
        top: 25,
        left: 20,
        right: 20,
    },
    guessInput: {
        textAlign: 'center',
        fontSize: 16,
    }
})