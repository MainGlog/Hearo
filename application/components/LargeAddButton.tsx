import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import AddToRoutineModal from "@/components/AddToRoutineModal";
import Exercise from "@/models/Exercise";
import {useState} from "react";
import ScaleExercise from "@/models/ScaleExercise";

type Props = {
    scaleExercise: ScaleExercise,
    exercise: Exercise
}


export default function LargeAddButton({scaleExercise, exercise} : Props){
    return(
        <View style={styles.container}>
            <Text style={styles.label}>Add to Routine</Text>
            <AddToRoutineModal
                scaleExercise={scaleExercise}
                exercise={exercise}
                chord={null}
                buttonSize={'large'}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        backgroundColor: '#e3e1e7',
        marginTop: 10,
        paddingHorizontal: 10,
        maxWidth: "40%",
    },
    label: {
        textAlign: "center",
    }
})