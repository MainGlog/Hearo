import Exercise from "@/models/Exercise";

export default class ScaleExercise extends Exercise {
    exerciseId!: number;
    scaleId!: number;

    constructor(exerciseId: number, listeningMode: string, timePerNote: number,
                numberOfNotes: number | null, numberOfOctaves: number | null, scaleId: number) {
        super("scale", exerciseId, null, null, scaleId, listeningMode, timePerNote, numberOfNotes, numberOfOctaves);
        this.listeningMode = listeningMode;
        this.timePerNote = timePerNote;
        this.numberOfNotes = numberOfNotes;
        this.numberOfOctaves = numberOfOctaves;
        this.scaleId = scaleId;
    }
}