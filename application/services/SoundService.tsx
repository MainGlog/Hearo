import axios from "axios";
import Sound from "@/models/Sound";

const apiUrl = "http://10.0.2.2:5028"

export const getAllSounds = async (): Promise<Sound[]> => {
    return axios
        .get(`${apiUrl}/v1/Sound/GetAllSounds`, {
            headers: { "Content-Type": "application/json" },
            responseType: "json"
        })
        .then(async (response) => {
            let sounds: Sound[];

            sounds = response.data.$values.map((sound: any) => ({
                id: sound.soundId,
                filePath: sound.soundFilePath,
                octave: sound.soundOctave,
                noteId: sound.noteId
            }));
            return sounds;
        })
        .catch((error) => {
            console.error(error);
            return [];
        })
}

export const getSoundsByNoteId = async (id: number): Promise<Sound[]| void> => {
    return axios
        .get(`${apiUrl}/v1/Sound/GetSoundsByNoteId?id=${id}`, {
            headers: {"Content-Type": "application/json"}
        })
        .then(async (response) => {
            let sounds: Sound[];

            sounds = response.data.$values.map((sound: any) => ({
                id: sound.soundId,
                filePath: sound.soundFilePath,
                octave: sound.soundOctave,
                noteId: sound.noteId
            }));
            return sounds;
        })
        .catch((error) => {
            console.error(error);
            return [];
        })
}

export const getSoundById = async (id: number): Promise<Sound | void> => {
    return axios
        .get(`${apiUrl}/v1/Sound/GetSoundById?id=${id}`, {
            headers: {"Content-Type": "application/json"}
        })
        .then(async (response) => {
            const sound = await response.data;
            return new Sound(
                sound.soundId, sound.soundFilePath,
                sound.soundOctave, sound.noteId);
        })
        .catch((error) => {
            console.error(error);
        });
}

export const updateSound = async (sound: Sound) => {
    axios
        .get(`${apiUrl}/sound/UpdateSound?sound=${sound}`)
        .then((response) => {
            // TODO
        })
        .catch((error) => {
            if(error.response) {
                console.log(error.response.status);
            }
        })
}
