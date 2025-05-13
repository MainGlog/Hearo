import Exercise from "@/models/Exercise";

export default class Routine {
    id!: number;
    name!: string;
    exerciseCount!: number;
    timeToGuess!: number;

    constructor(id: number, name: string,
        exerciseCount: number, timeToGuess: number) {
        this.id = id;
        this.name = name;
        this.exerciseCount = exerciseCount;
        this.timeToGuess = timeToGuess;
    }
}