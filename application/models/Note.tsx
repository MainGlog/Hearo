import Sound from "@/models/Sound";
import Enharmonic from "@/models/Enharmonic";

export default class Note {
    id!: number;
    name!: string;
    enharmonic!: Enharmonic | null;
    sound!: Sound | null;

    constructor(id: number, name: string, enharmonic: Enharmonic | null, sound: Sound | null) {
        this.id = id;
        this.name = name;
        if (sound) this.sound = sound
        if (enharmonic) this.enharmonic = enharmonic;
    }
}

