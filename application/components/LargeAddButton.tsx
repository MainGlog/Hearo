import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import AddToRoutineModal from "@/components/AddToRoutineModal";
import Exercise from "@/models/Exercise";
import {useState} from "react";

type Props = {
    exercise: Exercise
}


export default function LargeAddButton({exercise} : Props){
    const [modalVisible, setModalVisible] = useState(false);
    return(
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    setModalVisible(!modalVisible);
                    console.log(exercise.options.randomOptions.numberOfNotes + " button pressed");
                }}>
                <Text style={styles.label}>Add to Routine</Text>
                {/*/ Add custom icon here /*/}
                <AddToRoutineModal
                    exercise={exercise}
                    isVisible={modalVisible}
                />
                {/*/ isVisible does not pass to AddToRoutineModal /*/}
            </TouchableOpacity>
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