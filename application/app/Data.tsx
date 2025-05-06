import {getAllNotes} from "@/services/NoteService";
import Note from "@/models/Note";
import {getAllScales} from "@/services/ScaleService";
import Scale from "@/models/Scale";
export let notes: Note[] = [];
const fetchNotes = async() => {
    await getAllNotes()
        .then((response) => {
            notes = response
        })
        .catch((error) => {
            console.error("Failed to retrieve Notes array from API endpoint. " + error);
        });
    return notes;
}
fetchNotes()
    .then((data) => { console.log(`Printing out Notes[0]: ` + data[0]) });

export let scales: Scale[] = [];
const fetchScales = async() => {
    await getAllScales()
        .then((response) => {
            scales = response
        })
        .catch((error) => {
            console.error("Failed to retrieve Scales array from API endpoint. " + error);
        });
    return scales;
}
fetchScales()
    .then((data) => { console.log(`Printing out Scales[0]: ` + data[0]) });

