import MiniAddButton from "../components/MiniAddButton";
import Exercise from "@/models/Exercise";
import {useState} from "react";
import LargeAddButton from "@/components/LargeAddButton";

// const exercise: Exercise | null = null;

type Props = {
    exercise: Exercise
    isMiniButton: boolean
}

export default function AddToRoutineButton({isMiniButton, exercise}: Props) {
    return (
        <>
            {isMiniButton ? <MiniAddButton exercise={exercise}/> : <LargeAddButton exercise={exercise}/>}
        </>
    )
}