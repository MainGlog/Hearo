import axios from "axios";
import Note from "@/models/Note";
export let notes: Note[];

const apiUrl = "http://localhost:7290"

export const getNotes = async () => {
        const configObject = {
            method: 'get',
            url: `${apiUrl}/note/GetAllNotes}`
        };
        const response = await axios(configObject);
        return response.data;
    }

    export const getNoteById = async (id: number) => {
        const configObject = {
            method: 'get',
            url: `${apiUrl}/note/GetNoteById?id=${id}`
        };
        const response = await axios(configObject);
        return response.data;
    }

    export const updateNote = async (note: Note) => {
        axios
            .get(`${apiUrl}/note/UpdateNote?note=${note}`)
            .then((response) => {
                let existingNote: Note = notes.find((s) => s.id === note.id)!;
            })
            .catch((error) => {
                if(error.response) {
                    console.log(error.response.status);
                }
            })
    }
