import Chord from "@/models/Chord";
import Note from "@/models/Note";
import Scale from "@/models/Scale";

export default class Exercise {
    constructor(type: string, name: string,
                chord: Chord | null = null, notes: Note[] | null = null, scale: Scale | null = null) {
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
    }

    type: string = "";
    name: string = "";

    chord: Chord | null = null;
    notes: Note[] | null = null;
    scale: Scale | null = null;
}