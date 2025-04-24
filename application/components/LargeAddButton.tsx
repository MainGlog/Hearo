import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import AddToRoutineModal from "@/components/AddToRoutineModal";
import Exercise from "@/models/Exercise";
import {useState} from "react";

type Props = {
    exercise: Exercise
}


export default function LargeAddButton({exercise} : Props){
    return(
        <View style={styles.container}>
            <Text style={styles.label}>Add to Routine</Text>
            <AddToRoutineModal
                exercise={exercise}
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