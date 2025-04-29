import Note from "@/models/Note";
import Key from "@/models/Key";
export default class Scale {
    id!: number;
    name!: string;
    imageFilePath!: string;
    notes!: Note[];
    quality!: string;
    key!: Key;
    constructor(id: number, name: string, imageFilePath: string, notes: Note[] = [],
                quality: string, key: Key) {
        this.id = id;
        this.name = name;
        this.imageFilePath = imageFilePath;
        this.notes = notes;
        this.quality = quality;
        this.key = key;
    }
    static returnImageFilePath(imageFilePath: string){
        return `require(${imageFilePath})`;
    }
}
