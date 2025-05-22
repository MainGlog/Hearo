import Routine from "@/models/Routine";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "@/app/index";
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from "react-native";
import {useNavigation} from "@react-navigation/native";
import Exercise from "@/models/Exercise";
import ScaleExercise from "@/models/ScaleExercise";
import {useEffect, useState} from "react";
import Scale from "@/models/Scale";
import {getAllScales} from "@/services/ScaleService";

interface RoutineDetailsScreenProps extends NativeStackScreenProps<RootStackParamList, 'RoutineDetails'> {}

export default function RoutineDetailsScreen({route} : RoutineDetailsScreenProps) {
    const navigation = useNavigation<NativeStackScreenProps<RootStackParamList, 'RoutineDetails'>['navigation']>();

    let routine = new Routine(route.params.id ?? 0, route.params.name ?? 'My Routine',
        route.params.exerciseCount ?? 10, route.params.timeToGuess ?? 25, route.params.description ?? 'Description');

    routine.exercises = route.params.exercises;

    return (
        <View>
            <Text style={styles.header}>{routine.name}</Text>
            <Text style={styles.subheader}>{routine.description}</Text>

            <View style={styles.settings}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        // TODO popup to update the setting
                    }}
                >
                    <Text style={styles.buttonText}> Exercise Count: {routine.exerciseCount}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        // TODO popup to update the setting
                    }}
                >
                    <Text style={styles.buttonText}>Time to Guess: {routine.timeToGuess}</Text>
                </TouchableOpacity>
            </View>

            {routine.exercises ?
                <>
                    <View>
                       <Text style={{textAlign: 'center', fontSize: 16}}>Exercises</Text>
                    </View>
                    <FlatList
                        data={routine.exercises}
                        renderItem={({item}: { item: Exercise}) => (
                            <View style={{marginHorizontal: 10}}>
                                {item.type === "scale" ?
                                    <ScaleExerciseDetails
                                        {...item as ScaleExercise}
                                    />
                                    : null
                                }
                            </View>)
                        }
                    />
                </> : null
            }


            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate("Training", routine);
                    }}
                >
                    <Text style={styles.buttonText}>Train</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

function ScaleExerciseDetails(exercise: ScaleExercise) {

    let scale: Scale;

    if (exercise.scale) {
        scale = new Scale(exercise.scale!.id, exercise.scale!.name,
            exercise.scale!.quality, exercise.scale!.rootId, exercise.scale!.keyId, exercise.scale!.imageFilePath);
    }

    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <View>
                <Text>Scale</Text>
                <Text>{scale! ? scale!.name : ''}</Text>
            </View>
            <View>
                <Text>Listening Mode</Text>
                <Text>{exercise.listeningMode}</Text>
            </View>
            <View>
                <Text>Time per Note</Text>
                <Text>{exercise.timePerNote}</Text>
            </View>
            {exercise.listeningMode === 'random' ?
                <>
                    <View>
                        <Text>Number of Notes</Text>
                        <Text>{exercise.numberOfNotes}</Text>
                    </View>
                    <View>
                        <Text>Number of Octaves</Text>
                        <Text>{exercise.numberOfOctaves}</Text>
                    </View>
                </>
                : null
            }
            {/* TODO custom selection */}

        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#747474',
        textAlign: 'center',
        fontSize: 30,
        color: 'black',
        borderBottomWidth: 3,
        borderColor: 'black'
    },
    subheader: {
        textAlign: 'center',
        fontSize: 20,
        color: 'black',
        marginVertical: 10
    },
    settings: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16
    },
    button: {
        borderRadius: 20,
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 20,
        minWidth: '20%',
        maxWidth: '40%',
        alignContent: 'center'
    }
})