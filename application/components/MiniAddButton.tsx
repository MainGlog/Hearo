import {View, TouchableOpacity, StyleSheet} from "react-native";
import AddToRoutineModal from "@/components/AddToRoutineModal";
import Exercise from "@/models/Exercise";
import {useState} from "react";
import ScaleExercise from "@/models/ScaleExercise";

type Props = {
    scaleExercise: ScaleExercise
}

export default function MiniAddButton({scaleExercise} : Props){
    const [modalVisible, setModalVisible] = useState(false);

    return(
        <View>
            <AddToRoutineModal
                scaleExercise={scaleExercise}
                chord={null}
                buttonSize={'mini'}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "grey",
        width: 20,
        height: 20,
        marginTop: 15,
        marginLeft: 10,
        backgroundColor: 'lightgreen'
    }
})