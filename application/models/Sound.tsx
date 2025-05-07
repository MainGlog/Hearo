export default class Sound {
    id!: number;
    filePath!: string | null;
    octave!: number;

    constructor(id: number, filePath: string | null, octave: number) {
        this.id = id;
        this.filePath = filePath;
        this.octave = octave;
    }
}