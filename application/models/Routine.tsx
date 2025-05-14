import Exercise from "@/models/Exercise";

export default class Routine {
    id!: number;
    name!: string;
    description!: string;
    exerciseCount!: number;
    timeToGuess!: number;

    constructor(name: string, description: string,
        exerciseCount: number, timeToGuess: number) {
        this.name = name;
        this.description = description;
        this.exerciseCount = exerciseCount;
        this.timeToGuess = timeToGuess;
    }
}