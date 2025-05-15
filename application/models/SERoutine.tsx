export default class SERoutine {
    scaleExerciseId!: number;
    routineId!: number;

    constructor(scaleExerciseId: number, routineId: number) {
        this.scaleExerciseId = scaleExerciseId;
        this.routineId = routineId;
    }
}