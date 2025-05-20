import axios from "axios";
import Note from "@/models/Note";
const apiUrl = "http://10.0.2.2:5028"

export const getAllNotes = async (): Promise<Note[]> => {
    return axios
        .get(`${apiUrl}/v1/Note/GetAllNotes`, {
            headers: { "Content-Type": "application/json" },
            responseType: "json"
        })
        .then(async (response) => {
            let notes: Note[] = [];
            notes = response.data.$values.map((note: any) => ({
                id: note.noteId,
                name: note.noteName,
            }));
            return notes as Note[]
        })
        .catch((error) => {
            console.error(error);0
            return [];
        })
    }

export const getNoteById = async (id: number):Promise<Note | void> => {
    return axios
        .get(`${apiUrl}/v1/Note/GetNoteById?=${id}`, {
            headers: {"Content-Type": "application/json"}
        })
        .then(async (response) => {
            const note = await response.data;
            return note as Note;
        })
        .catch((error) => {
            console.error(error);
        });
}

export const updateNote = async (note: Note) => {
    axios
        .get(`${apiUrl}/v1/Note/UpdateNote?note=${note}`)
        .then((response) => {
            // TODO
        })
        .catch((error) => {
            if(error.response) {
                console.log(error.response.status);
            }
        })
}
