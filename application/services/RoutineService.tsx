import axios from "axios";
import Routine from "@/models/Routine";
import Interval from "@/models/Interval";

const apiUrl = "http://10.0.2.2:5028";

// Used to get the last ID of the routines during routine creation
let routinesCache: Routine[] | null = null;

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
                exerciseCount: routine.routineExerciseCount,
                timeToGuess: routine.routineTimeToGuess,
                description: routine.routineDescription
            }));

            routinesCache = routines;
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

export const getRoutinesByScaleExerciseId = async (id: number): Promise<Routine[] | void> => {
    return axios
        .get(`${apiUrl}/v1/Routine/GetRoutinesByScaleExerciseId?scaleExerciseId=${id}`, {
            headers: {"Content-Type": "application/json"}
        })
        .then(async (response) => {
            let routines: Routine[] = [];

            routines = response.data.$values.map((routine: any) => ({
                id: routine.routineId,
                name: routine.routineName,
                exerciseCount: routine.routineExerciseCount,
                timeToGuess: routine.routineTimeToGuess,
                description: routine.routineDescription
            }));

            return routines;
        })
        .catch((error) => {
            console.error(error)
        })
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

export const createRoutine = async (
    name: string,
    exerciseCount: number,
    timeToGuess: number,
    description: string
) => {
    console.log(routinesCache!.length);
    await axios
        .post(`${apiUrl}/v1/Routine/CreateRoutine`, {
            routineId: routinesCache ? routinesCache.length : 0,
            routineName: name,
            routineExerciseCount: exerciseCount,
            routineTimeToGuess: timeToGuess,
            routineDescription: description
        }, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(async (response) => {
            return response.data as Routine
        })
        .catch((error) => {
            console.log("Error creating Routine: " + error);
        });
}
