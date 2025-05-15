import MiniAddButton from "../components/MiniAddButton";
import Exercise from "@/models/Exercise";
import {useState} from "react";
import LargeAddButton from "@/components/LargeAddButton";
import ScaleExercise from "@/models/ScaleExercise";

// const exercise: Exercise | null = null;

type Props = {
    scaleExercise: ScaleExercise
    isMiniButton: boolean
}

export default function AddToRoutineButton({isMiniButton, scaleExercise}: Props) {
    return (
        <>
            {isMiniButton ? <MiniAddButton scaleExercise={scaleExercise}/>
                : <LargeAddButton scaleExercise={scaleExercise}/>}
        </>
    )
}