import Exercise from "@/models/Exercise";

export default class Routine {
    constructor(id: number, name: string, exercises: Exercise[]) {
        this.id = id;
        this.name = name;
        this.exercises = exercises;
    }

    id: number = 0;
    name: string = '';
    exercises: Exercise[] = [];
}