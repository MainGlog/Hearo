import Exercise from "@/models/Exercise";

export default class ScaleExercise extends Exercise {
    id!: number;
    listeningMode!: string;
    timePerNote!: number;
    numberOfNotes!: number | null;
    numberOfOctaves!: number | null;
    scaleId!: number;

    constructor(id: number, listeningMode: string, timePerNote: number,
                numberOfNotes: number | null, numberOfOctaves: number | null, scaleId: number) {
        super("scale"); // Setting the Exercise type to scale
        this.id = id;
        this.listeningMode = listeningMode;
        this.timePerNote = timePerNote;
        this.numberOfNotes = numberOfNotes;
        this.numberOfOctaves = numberOfOctaves;
        this.scaleId = scaleId;
    }
}