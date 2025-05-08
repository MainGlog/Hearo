import Exercise from "@/models/Exercise";

export default class Routine {
    id!: number;
    name!: string;
    exercises!: Exercise[] | null;
    exerciseCount!: number;
    timeToGuess!: number;

    constructor(id: number, name: string,
                exercises: Exercise[] | null, exerciseCount: number, timeToGuess: number) {
        this.id = id;
        this.name = name;
        this.exercises = exercises;
        this.exerciseCount = exerciseCount;
        this.timeToGuess = timeToGuess;
    }
}