export default class SERoutine {
    exerciseId!: number;
    routineId!: number;

    constructor(scaleExerciseId: number, routineId: number) {
        this.exerciseId = scaleExerciseId;
        this.routineId = routineId;
    }
}