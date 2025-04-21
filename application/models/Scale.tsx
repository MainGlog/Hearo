import Note from "@/models/Note";

export default class Scale {
    name: string = "";
    imageFilePath: string = ""
    notes: Note[] = [];
    constructor(name: string, imageFilePath: string, notes: Note[] = []) {
        this.name = name;
        this.imageFilePath = imageFilePath;
        this.notes = notes;
    }
    static returnImageFilePath(imageFilePath: string){
        return `require(${imageFilePath})`;
    }
}
