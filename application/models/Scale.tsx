import Note from "@/models/Note";
import Key from "@/models/Key";
export default class Scale {
    id!: number;
    name!: string;
    quality!: string;
    rootId!: number;
    keyId!: number;
    imageFilePath!: string;

    constructor(id: number, name: string, quality: string,
                rootId: number, keyId: number, imageFilePath: string) {
        this.id = id;
        this.name = name;
        this.quality = quality;
        this.rootId = rootId;
        this.keyId = keyId;
        this.imageFilePath = imageFilePath;
    }
    static returnImageFilePath(imageFilePath: string){
        return `require(${imageFilePath})`;
    }
}
