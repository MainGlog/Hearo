import Chord from "@/models/Chord";
import Note from "@/models/Note";
import Scale from "@/models/Scale";

export default class Exercise {
    constructor(type: string, name: string,
                chord: Chord | null = null,
                notes: Note[] | null = null,
                scale: Scale | null = null,
                options: any = {}) {
        this.type = type;
        this.name = name;

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

    type: string = "";
    name: string = "";

    chord: Chord | null = null;
    notes: Note[] | null = null;
    scale: Scale | null = null;

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
}