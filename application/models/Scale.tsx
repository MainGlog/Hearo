export default class Scale {
    name: string = "";
    imageFilePath: string = ""
    constructor(name: string, imageFilePath: string) {
        this.name = name;
        this.imageFilePath = imageFilePath;
    }
    static returnImageFilePath(imageFilePath: string){
        return `require(${imageFilePath})`;
    }
}
