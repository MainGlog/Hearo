import Chord from "@/models/Chord";
import Note from "@/models/Note";
import Scale from "@/models/Scale";

export default class Exercise {
    type!: string;

    chord!: Chord | null;
    notes!: Note[] | null;
    scale!: Scale | null;

    options: any = {
        listeningMode: 'ascending', // ascending & descending, random, custom
        timePerNote: 0, // seconds
        randomOptions: {
            numberOfNotes: 0,
            numberOfOctaves: 0,
        },
        customOptions: {
            notesToInclude: [],
            order: ''
        }
    }

    constructor(type: string,
                chord: Chord | null = null,
                notes: Note[] | null = null,
                scale: Scale | null = null,
                options: any = {}) {
        this.type = type;

        switch(type){
            case "chord":
                this.chord = chord;
                break;
            case "scale":
                this.scale = scale;
                break;
            case "notes":
                this.notes = notes;
                break;
        }
        this.options = options;
    }
}