import Exercise from "@/models/Exercise";

export default class Routine {
    id!: number;
    name!: string;
    exerciseCount!: number;
    timeToGuess!: number;
    description!: string;
    exercises!: Exercise[];

    constructor(id: number, name: string, exerciseCount: number,
            timeToGuess: number, description: string) {
        this.id = id;
        this.name = name;
        this.exerciseCount = exerciseCount;
        this.timeToGuess = timeToGuess;
        this.description = description;
    }
}