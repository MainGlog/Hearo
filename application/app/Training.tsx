import {Animated, Button, StyleSheet, Text, TextInput, View} from "react-native";
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

    // Exercises is not in the routine constructor due to the way the data is fetched from the database, so they are set here
    routine.exercises = route.params.exercises;

    const [sounds, setSounds] = useState<SoundModel[]>([]);
    const [scales, setScales] = useState<Scale[]>([]);
    const [notes, setNotes] = useState<Note[]>([]);
    const [activeSounds, setActiveSounds] = useState<SoundModel[]>([]);
    const [timerActive, setTimerActive] = useState<boolean>(false);
    const [resetTimer, setResetTimer] = useState<boolean>(false);

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
    const fetchData = async(scale: Scale, listeningMode: string) => {
        const intervalsData = await getIntervalsByScaleId(scale.id);
        let notesArray: Note[] = [];

        const rootNote = notes.find(n => n.id === scale.rootId)!;

        switch(listeningMode) {
            case ('ascending'):
                // Add Root Note
                notesArray.push(rootNote);

                // Add Other Notes
                intervalsData!.map((interval: Interval) => {
                    notesArray.push(notes.find(n => n.id === interval.intervalNoteId)!);
                });
                break;
            case ('random'):
                break;
            default:
                break;
        }

        const CId = 3; // ID of the note C

        // Starting octave will be 3, that of middle C (C3)
        // unless the root note is closer to the octave below (C2)
        let octave = 0

        const max = Math.max(rootNote.id, CId);
        const min = Math.min(rootNote.id, CId);
        if (max - min > 4 || rootNote.id < 3) octave = 2;
        else octave = 3;

        let soundsArray: SoundModel[] = [];
        let octavesArray: number[] = [];

        // Adds the sound for each note to an array
        for (let i = 0; i < notesArray.length; i++) {
            const note = notesArray[i];
            const nextNote = i < notesArray.length - 1 ? notesArray[i + 1] : notesArray[i];

            soundsArray.push(sounds.find(s => s.noteId === note.id
                && s.octave === octave)!);

            // TODO C minor's top note did not add the correct octave
            //  G minor shifts down an octave at C
            // Stores the octave for the note to be used when the notes are added in descending order
            if (listeningMode === 'ascending') octavesArray.push(octave);

            let distanceToNextNote = 0;

            if (note.id >= 10) {
                distanceToNextNote = (nextNote.id + 12) - note.id;
            } else {
                distanceToNextNote = nextNote.id - note.id;
            }

            if (note.id + distanceToNextNote % 12 >= 3 && note.id < 3) octave++
        }

        if (listeningMode === 'ascending') {
            // Adds root note to the top
            soundsArray.push(sounds.find(s => s.noteId === rootNote.id! && s.octave === octave)!);

            // Adds notes in descending order
            for (let i = notesArray.length - 1; i >= 0; i--) {
                soundsArray.push(sounds.find(s => s.noteId === notesArray[i]!.id!
                    && s.octave === octavesArray[i])!);
            }
        }

        setActiveSounds(soundsArray);
    }

    // What do you need here?
    // A way of handling the options for each exercise
    // Boolean for whether the user answered correctly, this will be used to render the results screen

    const [sound, setSound] = useState<Sound>();

    async function playSound(filePath: string) {
        // console.log('Loading Sound');

        // @ts-ignore - used for the selectSound method.
        // It gets mad but the function returns a require statement for the audio file
        const file = selectSound(filePath);

        const { sound } = await Sound.createAsync(file);
        setSound(sound);

        // console.log('Playing Sound');
        await sound.playAsync();
    }

    // Unload Sound
    useEffect(() => {
        return sound
            ? () => {
                // console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    useEffect(() => {
        getNextExercise();
    }, [sounds, scales, notes]);


    // Selects a random exercise from the routine's list
    const [exercise, setExercise] = useState<ScaleExercise | ChordExercise | NotesExercise>();
    const [correctAnswer, setCorrectAnswer] = useState<string>('');
    const getNextExercise = () => {
        const newExercise = getRandomExercise(routine);
        setExercise(newExercise);

        if (newExercise instanceof ScaleExercise) {
            const scale = scales.find(s => s.id === newExercise.scaleId)!
            setCorrectAnswer(scale?.name);
            fetchData(scale, (newExercise as ScaleExercise).listeningMode!);

        }
        else if (newExercise instanceof ChordExercise) {
            // Chord exercise
        }
        else {
            // Notes exercise
        }
    };

    // Whenever the active sounds updates, which will only happen when an exercise changes
    // This method will play said sounds in their intended sequence with a one-second delay
    useEffect(() => {
        const playExercise = async() => {
            setResetTimer(false);
            
            for (let i = 0; i < activeSounds.length!; i++) {
                // TODO find a way to stop playback when the user guesses
                if (userGuessed) return;

                // Creating a promise with the await keyword ensures that the timeout playing the sound will complete before the next
                await new Promise(resolve => {
                    setTimeout(async () => {
                        await playSound(activeSounds[i].filePath!);
                        if (i === activeSounds.length - 1) {
                            setTimerActive(true); // Activates the timer after all sounds have been played
                        }
                        resolve(null); // Signals that the promise has completed
                    }, 800);
                });
            }
        }
        playExercise();
    }, [activeSounds])

    const [exercisesPlayed, setExercisesPlayed] = useState<number>(0);
    const [guess, setGuess] = useState<string>('');
    const [userGuessed, setUserGuessed] = useState<boolean>(false);
    const [correct, setCorrect] = useState<boolean>(false);
    const [timerDuration, setTimerDuration] = useState<number>(routine.timeToGuess);
    const [correctGuesses, setCorrectGuesses] = useState<number>(0);

    return (
        <View style={styles.container}>
            <StatusBar hidden/>
            <Progress step={exercisesPlayed} steps={routine.exerciseCount} height={20}/>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.topBarText}>{correctGuesses} / {routine.exerciseCount}</Text>
                <Timer duration={timerDuration}
                       active={timerActive}
                       reset={resetTimer}
                       onTimerUpdate={(seconds) => {
                           // console.log(seconds);
                           setTimerDuration(seconds);
                       }}
                />
            </View>

            {!userGuessed && timerDuration > 0 ?
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <TextInput
                    style={styles.guessInput}
                    value={guess}
                    onChangeText={(text) => {
                        setGuess(text);
                    }}
                    placeholder={'Enter your Guess'}
                />
                <Button
                    title='Submit Guess'
                    /* TODO Ensure that the user cannot press this button before the exercise is set */
                    onPress={() => {
                        const answerIsCorrect = checkGuess(guess, correctAnswer);
                        setCorrect(answerIsCorrect);
                        setCorrectGuesses(prev => answerIsCorrect ? prev + 1 : prev);
                        setUserGuessed(true);
                        setTimerActive(false);
                    }}
                />
            </View> : null}

            {userGuessed || timerDuration === 0 ?
            <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                {timerDuration === 0 ?
                    <Text style={{textAlign: 'center'}}>Out of Time! The correct answer was {correctAnswer}</Text> :
                    <Text>{correct ? "Great job!" : `Not quite, the correct answer was ${correctAnswer}. You guessed ${guess}`}</Text>
                }

                {exercisesPlayed <= routine.exerciseCount ?
                    <Button
                        title='Next Exercise'
                        onPress={() => {
                            // Resets state variables to defaults
                            setExercisesPlayed(exercisesPlayed + 1);
                            setTimerDuration(routine.timeToGuess);
                            setResetTimer(true);
                            setTimerActive(false);
                            setUserGuessed(false);
                            setCorrect(false);
                            setGuess('');
                            setActiveSounds([]);
                            getNextExercise();
                        }}
                    />
                : null}
            </View> : null}
        </View>
    );


}

function checkGuess(guess: string, answer: string): boolean {
    return guess.toUpperCase() === answer.toUpperCase();
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
                    backgroundColor: 'rgba(20,90,170,0.8)',
                    transform: [{
                        translateX: animatedValue
                    }]
                }}
            />
        </View>
    )
}

const Timer = ({duration, active, reset, onTimerUpdate}: {
    duration: number,
    active: boolean,
    reset: boolean,
    onTimerUpdate: (seconds: number) => void}
    ) => {
    const [seconds, setSeconds] = useState<number>(duration);
    const [minutes, setMinutes] = useState<number>(Math.floor(duration / 60));

    // Sets a reference for an interval timeout to be used when clearing the interval
    const intervalRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        // When the timer is re-activated after the first exercise, it should be reset to the original duration
        setSeconds(duration);
    }, [reset])

    useEffect(() => {
        if (!active) return;

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
    }, [seconds, active]);

    useEffect(() => {
        onTimerUpdate(seconds);
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