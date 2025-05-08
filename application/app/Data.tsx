import {getAllNotes} from "@/services/NoteService";
import Note from "@/models/Note";
import {getAllScales} from "@/services/ScaleService";
import Scale from "@/models/Scale";
import {getAllKeys} from "@/services/KeyService";
import Key from "@/models/Key";
import Interval from "@/models/Interval";
import {getAllIntervals} from "@/services/IntervalService";
import {getAllChords} from "@/services/ChordService";
import Chord from "@/models/Chord";
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
// fetchNotes();

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
// fetchScales();

export let keys: Key[] = []
const fetchKeys = async() => {
    await getAllKeys()
        .then((response) => {
            keys = response
        })
        .catch((error) => {
            console.error("Failed to retrieve Keys array from API endpoint. " + error);
        });
    return keys;
}

// fetchKeys();
export let intervals: Interval[] = []
const fetchIntervals = async() => {
    await getAllIntervals()
        .then((response) => {
            intervals = response
        })
        .catch((error) => {
            console.error("Failed to retrieve Intervalss array from API endpoint. " + error);
        });
    return intervals;
}
// fetchIntervals();

export let chords: Chord[] = []
const fetchChords = async() => {
    await getAllChords()
        .then((response) => {
            chords = response
        })
        .catch((error) => {
            console.error("Failed to retrieve Chordss array from API endpoint. " + error);
        });
    return chords;
}
fetchChords()
    .then((data) => console.log("Printing an attribute of Chords[0]: " + data[0].notation));