import {View, TouchableOpacity, StyleSheet} from "react-native";
import AddToRoutineModal from "@/components/AddToRoutineModal";
import Exercise from "@/models/Exercise";
import {useState} from "react";

type Props = {
    exercise: Exercise
}

export default function MiniAddButton({exercise} : Props){
    const [modalVisible, setModalVisible] = useState(false);

    return(
        <View>
            <AddToRoutineModal
                exercise={exercise}
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