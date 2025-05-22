import Chord from "@/models/Chord";
import Note from "@/models/Note";
import Scale from "@/models/Scale";
import {getScaleById} from "@/services/ScaleService";

export default class Exercise {
    type!: string;
    id!: number;

    chord!: Chord | null;
    notes!: Note[] | null;
    scale!: Scale | null;

    listeningMode!: string | null; // ascending & descending, random, custom
    timePerNote!: number | null; // seconds
    numberOfNotes!: number | null;
    numberOfOctaves!: number | null;

    // TODO customNotes, order

    constructor(type: string,
                id: number,
                chord: Chord | null = null,
                notes: Note[] | null = null,
                scaleId: number | null = null,
                listeningMode: string | null = null,
                timePerNote: number | null = null,
                numberOfNotes: number | null = null,
                numberOfOctaves: number | null = null
    ) {
        this.type = type;
        this.id = id;

        switch(type) {
            case "chord":
                this.chord = chord;
                break;
            case "scale":
                const fetchScale = async() => {
                    const scaleData = await getScaleById(scaleId!);
                    this.scale = scaleData!;
                }
                if (scaleId) fetchScale();
                this.listeningMode = listeningMode;
                this.timePerNote = timePerNote;
                this.numberOfNotes = numberOfNotes;
                this.numberOfOctaves = numberOfOctaves;
                break;
            case "notes":
                this.notes = notes;
                break;
        }
    }
}