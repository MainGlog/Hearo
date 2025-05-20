import axios from "axios";
import ScaleExercise from "@/models/ScaleExercise";

const apiUrl = "http://10.0.2.2:5028";

// Used to get the last ID of the scaleExercises during scaleExercise creation
let scaleExercisesCache: ScaleExercise[] | null = null;

export const getAllScaleExercises = async (): Promise<ScaleExercise[]> => {
    return axios
        .get(`${apiUrl}/v1/ScaleExercise/GetAllScaleExercises`, {
            headers: { "Content-Type": "application/json" },
            responseType: "json"
        })
        .then(async (response) => {
            let scaleExercises: ScaleExercise[] = [];

            scaleExercises = response.data.$values.map((scaleExercise: any) => ({
                id: scaleExercise.scaleExerciseId,
                listeningMode: scaleExercise.scaleExerciselisteningMode,
                timePerNote: scaleExercise.scaleExerciseTimePerNote,
                numberOfNotes: scaleExercise.scaleExerciseNumberOfNotes,
                numberOfOctaves: scaleExercise.scaleExerciseNumberOfOctaves,
                scaleId: scaleExercise.scaleId
            }));

            scaleExercisesCache = scaleExercises;
            return scaleExercises as ScaleExercise[];
        })
        .catch((error) => {
            console.error(error);
            return [];
        })
}

export const getScaleExerciseById = async (id: number): Promise<ScaleExercise | void> => {
    return axios
        .get(`${apiUrl}/v1/ScaleExercise/GetScaleExerciseById?=${id}`, {
            headers: {"Content-Type": "application/json"}
        })
        .then(async (response) => {
            const scaleExercise = await response.data;
            return scaleExercise as ScaleExercise;
        })
        .catch((error) => {
            console.error(error);
        });
}

export const getScaleExercisesByRoutineId = async (id: number): Promise<ScaleExercise[] | void> => {
    return axios
        .get(`${apiUrl}/v1/ScaleExercise/GetScaleExercisesByRoutineId?routineId=${id}`, {
            headers: {"Content-Type": "application/json"}
        })
        .then(async (response) => {
            let scaleExercises: ScaleExercise[] = [];

            scaleExercises = response.data.$values.map((scaleExercise: any) => ({
                id: scaleExercise.scaleExerciseId,
                listeningMode: scaleExercise.scaleExerciselisteningMode,
                timePerNote: scaleExercise.scaleExerciseTimePerNote,
                numberOfNotes: scaleExercise.scaleExerciseNumberOfNotes,
                numberOfOctaves: scaleExercise.scaleExerciseNumberOfOctaves,
                scaleId: scaleExercise.scaleId
            }));

            return scaleExercises;
        })
        .catch((error) => {
            console.error(error)
        })
}

export const updateScaleExercise = async (scaleExercise: ScaleExercise) => {
    axios
        .get(`${apiUrl}/scaleExercise/UpdateScaleExercise?scaleExercise=${scaleExercise}`)
        .then((response) => {
            // TODO
        })
        .catch((error) => {
            if(error.response) {
                console.log(error.response.status);
            }
        })
}

export const createScaleExercise = async (
    name: string,
    listeningMode: string,
    timePerNote: number,
    numberOfNotes: number | null,
    numberOfOctaves: number | null,
    scaleId: number
) => {
    await axios
        .post(`${apiUrl}/v1/ScaleExercise/CreateScaleExercise`, {
            scaleExerciseId: scaleExercisesCache ? scaleExercisesCache.length : 0,
            scaleExerciseName: name,
            scaleExerciseListeningMode: listeningMode,
            scaleExerciseTimePerNote: timePerNote,
            scaleExerciseNumberOfNotes: numberOfNotes,
            scaleExerciseNumberOfOctaves: numberOfOctaves,
            scaleId: scaleId
        }, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(async (response) => {
            return response.data as ScaleExercise
        })
        .catch((error) => {
            console.log("Error creating ScaleExercise: " + error);
        });
}
