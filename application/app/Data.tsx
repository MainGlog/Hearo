import {getAllNotes} from "@/services/NoteService";
import Note from "@/models/Note";
import {getAllScales, getIntervalsByScaleId} from "@/services/ScaleService";
import Scale from "@/models/Scale";
import {getAllKeys} from "@/services/KeyService";
import Key from "@/models/Key";
import Interval from "@/models/Interval";
import {getAllIntervals} from "@/services/IntervalService";
import {getAllChords} from "@/services/ChordService";
import Chord from "@/models/Chord";
import Routine from "@/models/Routine";
import {getAllRoutines} from "@/services/RoutineService";
export async function getIntervalsById(id: number) {
    let intervals: Interval[] = [];
    await getIntervalsByScaleId(id)
        .then((response) => {
            if (response) intervals = response
        })
        .catch((error) => {
            console.error("Failed to retrieve Intervals array. " + error)
        })
    return intervals;
}

export async function fetchRoutines(): Promise<Routine[]> {
    let routines: Routine[] = [];
    await getAllRoutines()
        .then((response) => {
            routines = response;
        })
        .catch((error) => {
            console.error("Failed to retrieve routines array from API endpoint. " + error);
        });
    return routines;
}

export async function fetchNotes(): Promise<Note[]> {
    let notes: Note[] = [];
    await getAllNotes()
        .then((response) => {
            notes = response;
        })
        .catch((error) => {
            console.error("Failed to retrieve Notes array from API endpoint. " + error);
        });
    return notes;
}

export async function fetchScales(): Promise<Scale[]> {
    let scales: Scale[] = [];
    await getAllScales()
        .then((response) => {
            scales = response
        })
        .catch((error) => {
            console.error("Failed to retrieve Scales array from API endpoint. " + error);
        });
    return scales;
}


export async function fetchKeys(): Promise<Key[]> {
    let keys: Key[] = []
    await getAllKeys()
        .then((response) => {
            keys = response
        })
        .catch((error) => {
            console.error("Failed to retrieve Keys array from API endpoint. " + error);
        });
    return keys;
}

export async function fetchIntervals(): Promise<Interval[]> {
    let intervals: Interval[] = []
    await getAllIntervals()
        .then((response) => {
            intervals = response
        })
        .catch((error) => {
            console.error("Failed to retrieve Intervalss array from API endpoint. " + error);
        });
    return intervals;
}

export async function fetchChords(): Promise<Chord[]> {
    let chords: Chord[] = []
    await getAllChords()
        .then((response) => {
            chords = response
        })
        .catch((error) => {
            console.error("Failed to retrieve Chordss array from API endpoint. " + error);
        });
    return chords;
}

