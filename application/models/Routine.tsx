import Exercise from "@/models/Exercise";

export default class Routine {
    constructor(id: number, name: string, exercises: Exercise[], exerciseCount: number) {
        this.id = id;
        this.name = name;
        this.exercises = exercises;
        this.exerciseCount = exerciseCount;
    }

    exerciseCount!: number;
    id!: number;
    name!: string;
    exercises!: Exercise[];
}