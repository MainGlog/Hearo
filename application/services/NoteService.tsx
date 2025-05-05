import axios from "axios";
import Note from "@/models/Note";

export let notes: Note[];

const apiUrl = "http://10.0.2.2:7290"

export const getNotes = (): Promise<Note[]> => {
    return axios
        .get(`${apiUrl}/v1/Note/GetAllNotes`)
        .then(async (response) => {
            return (await response.data) as Note[];
        })
        .catch((error) => {
            console.error(error);
            return [];
        })

    /*const configObject = {
            method: 'get',
            url: `${apiUrl}/v1/Note/GetAllNotes}`
        };
        const response = await axios(configObject);
        return response.data;*/
    }

export const getNoteById = async (id: number):Promise<Note> => {
    const configObject = {
        method: 'get',
        url: `${apiUrl}/v1/Note/GetNoteById?id=${id}`
    };
    const response = await axios(configObject);
    return response.data;
}

export const updateNote = async (note: Note) => {
    axios
        .get(`${apiUrl}/v1/Note/UpdateNote?note=${note}`)
        .then((response) => {
            let existingNote: Note = notes.find((s) => s.id === note.id)!;
        })
        .catch((error) => {
            if(error.response) {
                console.log(error.response.status);
            }
        })
}
