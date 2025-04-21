import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import MiniAddButton from "../components/MiniAddButton";
import AddToRoutineModal from "./AddToRoutineModal"
import Exercise from "@/models/Exercise";
import {useState} from "react";
import LargeAddButton from "@/components/LargeAddButton";

// const exercise: Exercise | null = null;

type Props = {
    exercise: Exercise
    isMiniButton: boolean
}

export default function AddToRoutineButton({isMiniButton, exercise}: Props) {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            {isMiniButton ? <MiniAddButton exercise={exercise}/> : <LargeAddButton exercise={exercise}/>}
        </>
    )
}