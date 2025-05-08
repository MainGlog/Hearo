export default class Sound {
    id!: number;
    filePath!: string | null;
    octave!: number;
    noteId!: number;

    constructor(id: number, filePath: string | null, octave: number, noteId: number) {
        this.id = id;
        this.filePath = filePath;
        this.octave = octave;
        this.noteId = noteId;
    }
}