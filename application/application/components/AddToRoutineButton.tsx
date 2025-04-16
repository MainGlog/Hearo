import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import MiniAddButton from "../components/MiniAddButton";
import AddToRoutineModal from "./AddToRoutineModal"
import Exercise from "@/models/Exercise";
import {useState} from "react";

// const exercise: Exercise | null = null;
const exercise: Exercise = new Exercise("scale", "C Major", null, null, null);

type Props = {
    exercise: Exercise
}

export default function AddToRoutineButton({/*/ {exercise}: Props /*/}){
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => {
                        setModalVisible(!modalVisible);
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


        </>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        borderWidth: 1,
        marginTop: 10,
        paddingHorizontal: 10
    },
    label: {
        textAlign: "center",
    }
})