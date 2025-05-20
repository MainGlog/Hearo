import axios from "axios";
import SERoutine from "@/models/SERoutine";
import ScaleExercise from "@/models/ScaleExercise";

const apiUrl = "http://10.0.2.2:5028"


export const getAllSERoutines = async(): Promise<SERoutine[]> => {
    return axios
        .get(`${apiUrl}/v1/SERoutine/GetAllSERoutines`, {
            headers: { "Content-Type": "application/json" },
            responseType: "json"
        })
        .then(async (response) => {
            let SERoutines: SERoutine[] = [];

            SERoutines = response.data.$values.map((SERoutine: any) => ({
                exerciseId: SERoutine.exerciseId,
                routineId: SERoutine.routineId
            }));

            return SERoutines as SERoutine[];
        })
        .catch((error) => {
            console.error(error);
            return [];
        })
}
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