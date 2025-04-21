export default class Note {
    name: string = ''
    octave: number = 0
    filePath: string = ''
    enharmonic: string | null = ''

    constructor(name: string, octave: number, filePath: string, enharmonic: string | null) {
        this.name = name;
        this.octave = octave;
        this.filePath = filePath;
        if (enharmonic)
        {
            this.enharmonic = enharmonic;
        }
    }
}