import Exercise from "@/models/Exercise";

export default class Routine {
    id!: number;
    name!: string;
    exerciseCount!: number;
    timeToGuess!: number;

    constructor(name: string,
        exerciseCount: number, timeToGuess: number) {
        this.name = name;
        this.exerciseCount = exerciseCount;
        this.timeToGuess = timeToGuess;
    }
}