import Sound from "@/models/Sound";

export default class Note {
    id!: number;
    name!: string;
    enharmonic!: string | null;
    sound!: Sound | null;

    constructor(id: number, name: string, enharmonic: string | null, sound: Sound | null) {
        this.id = id;
        this.name = name;
        if (sound) this.sound = sound
        if (enharmonic) this.enharmonic = enharmonic;
    }
}

