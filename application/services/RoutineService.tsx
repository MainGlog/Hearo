import axios from "axios";
import Routine from "@/models/Routine";

const apiUrl = "http://10.0.2.2:5028"

export const getAllRoutines = async (): Promise<Routine[]> => {
    return axios
        .get(`${apiUrl}/v1/Routine/GetAllRoutines`, {
            headers: { "Content-Type": "application/json" },
            responseType: "json"
        })
        .then(async (response) => {
            let routines: Routine[] = [];

            routines = response.data.$values.map((routine: any) => ({
                id: routine.routineId,
                name: routine.routineName,
                exerciseCount: routine.exerciseCount,
                timeToGuess: routine.timeToGuess
            }));
            return routines as Routine[];
        })
        .catch((error) => {
            console.error(error);
            return [];
        })
}

export const getRoutineById = async (id: number): Promise<Routine | void> => {
    return axios
        .get(`${apiUrl}/v1/Routine/GetRoutineById?=${id}`, {
            headers: {"Content-Type": "application/json"}
        })
        .then(async (response) => {
            const routine = await response.data;
            return routine as Routine;
        })
        .catch((error) => {
            console.error(error);
        });
}

export const updateRoutine = async (routine: Routine) => {
    axios
        .get(`${apiUrl}/routine/UpdateRoutine?routine=${routine}`)
        .then((response) => {
            // TODO
        })
        .catch((error) => {
            if(error.response) {
                console.log(error.response.status);
            }
        })
}
/*

export const createRoutine = async (routine: Routine) => {
    axios
        .post(`${apiUrl}/routine/CreateRoutine?`)
}*/
