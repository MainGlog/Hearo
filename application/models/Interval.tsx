export default class Interval {
    id!: number;
    quality!: string;
    size!: number;
    semitonesFromRoot!: number;
    rootNoteId!: number;
    intervalNoteId!: number;

    constructor(id: number, quality: string, size: number,
                semitonesFromRoot: number, rootNoteId: number, intervalNoteId: number) {
        this.id = id;
        this.quality = quality;
        this.size = size;
        this.semitonesFromRoot = semitonesFromRoot;
        this.rootNoteId = rootNoteId;
        this.intervalNoteId = intervalNoteId;
    }
}