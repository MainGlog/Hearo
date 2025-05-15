import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import AddToRoutineModal from "@/components/AddToRoutineModal";
import Exercise from "@/models/Exercise";
import {useState} from "react";
import ScaleExercise from "@/models/ScaleExercise";

type Props = {
    scaleExercise: ScaleExercise
}


export default function LargeAddButton({scaleExercise} : Props){
    return(
        <View style={styles.container}>
            <Text style={styles.label}>Add to Routine</Text>
            <AddToRoutineModal
                scaleExercise={scaleExercise}
                chord={null}
                buttonSize={'large'}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        borderWidth: 1,
        marginTop: 10,
        paddingHorizontal: 10,
        maxWidth: "40%",
    },
    label: {
        textAlign: "center",
    }
})