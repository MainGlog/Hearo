export default class ScaleExercise {
    id!: number;
    listeningMode!: string;
    timePerNote!: number;
    numberOfNotes!: number | null;
    numberOfOctaves!: number | null;
    scaleId!: number;

    constructor(id: number, listeningMode: string, timePerNote: number,
                numberOfNotes: number | null, numberOfOctaves: number | null, scaleId: number) {
        this.id = id;
        this.listeningMode = listeningMode;
        this.timePerNote = timePerNote;
        this.numberOfNotes = numberOfNotes;
        this.numberOfOctaves = numberOfOctaves;
        this.scaleId = scaleId;
    }
}