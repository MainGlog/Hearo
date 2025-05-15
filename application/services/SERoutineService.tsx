import axios from "axios";
import SERoutine from "@/models/SERoutine";

const apiUrl = "http://10.0.2.2:5028"

export const createSERoutine = async(
    routineId: number,
    scaleExerciseId: number
) => {
    await axios
        .post(`${apiUrl}/v1/SERoutine/CreateSERoutine`, {
            routineId: routineId,
            scaleExerciseId: scaleExerciseId
        }, {
            headers: { 'Content-Type': 'application/json'}
        })
        .then(async (response) => {
            return response.data as SERoutine;
        })
        .catch((error) => {
            console.log("Error creating SERoutine: ", error);
        })
}