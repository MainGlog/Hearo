export default class Chord {
    id!: number;
    name!: string;
    quality!: string;
    root!: string;
    notation!: string;

    constructor(id: number, name: string, quality: string,
                root: string, notation: string) {
        this.id = id;
        this.name = name;
        this.quality = quality;
        this.root = root;
        this.notation = notation;
    }
}