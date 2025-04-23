import Sound from "@/models/Sound";

export default class Note {
    name: string = ''
    enharmonic: string | null = ''
    sound: Sound | null = null

    constructor(name: string, enharmonic: string | null, sound: Sound | null) {
        this.name = name;
        if (sound) {
            this.sound = sound
        }
        if (enharmonic) {
            this.enharmonic = enharmonic;
        }
    }
}