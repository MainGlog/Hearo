import Note from "@/models/Note";
import Key from "@/models/Key";
export default class Scale {
    id!: number;
    name!: string;
    quality!: string;
    root!: Note;
    imageFilePath!: string;
    notes!: Note[];

    key!: Key | undefined;
    constructor(id: number, name: string, quality: string, root: Note,
                imageFilePath: string, notes: Note[] = [], key: Key) {
        this.id = id;
        this.name = name;
        this.quality = quality;
        this.root = root;
        this.imageFilePath = imageFilePath;
        this.notes = notes;
        this.key = key;
    }
    static returnImageFilePath(imageFilePath: string){
        return `require(${imageFilePath})`;
    }
}
