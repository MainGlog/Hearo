export default class Sound {
    id!: number;
    filePath!: string | null;
    octave!: number;
    noteId!: number;

    constructor(id: number, filePath: string | null, octave: number, noteId: number) {
        this.id = id;
        this.filePath = filePath;
        this.octave = octave;
        this.noteId = noteId;
    }
}

export const Sounds = {
    "A-1": require("@/assets/audio/A-1.wav"),
    "AS-1": require("@/assets/audio/AS-1.wav"),
    "B-1": require("@/assets/audio/B-1.wav"),

    "C0": require("@/assets/audio/C0.wav"),
    "CS0": require("@/assets/audio/CS1.mp3"),
    "D0": require("@/assets/audio/D0.wav"),
    "DS0": require("@/assets/audio/DS0.wav"),
    "E0": require("@/assets/audio/E0.wav"),
    "F0": require("@/assets/audio/F0.wav"),
    "FS0": require("@/assets/audio/FS0.wav"),
    "G0": require("@/assets/audio/G0.wav"),
    "GS0": require("@/assets/audio/GS0.wav"),
    "A0": require("@/assets/audio/A0.wav"),
    "AS0": require("@/assets/audio/AS0.wav"),
    "B0": require("@/assets/audio/B0.wav"),

    "C1": require("@/assets/audio/C1.wav"),
    "CS1": require("@/assets/audio/CS1.wav"),
    "D1": require("@/assets/audio/D1.wav"),
    "DS1": require("@/assets/audio/DS1.wav"),
    "E1": require("@/assets/audio/E1.wav"),
    "F1": require("@/assets/audio/F1.wav"),
    "FS1": require("@/assets/audio/FS1.wav"),
    "G1": require("@/assets/audio/G1.wav"),
    "GS1": require("@/assets/audio/GS1.wav"),
    "A1": require("@/assets/audio/A1.wav"),
    "AS1": require("@/assets/audio/AS1.wav"),
    "B1": require("@/assets/audio/B1.wav"),

    "C2": require("@/assets/audio/C2.wav"),
    "CS2": require("@/assets/audio/CS2.wav"),
    "D2": require("@/assets/audio/D2.wav"),
    "DS2": require("@/assets/audio/DS2.wav"),
    "E2": require("@/assets/audio/E2.wav"),
    "F2": require("@/assets/audio/F2.wav"),
    "FS2": require("@/assets/audio/FS2.wav"),
    "G2": require("@/assets/audio/G2.wav"),
    "GS2": require("@/assets/audio/GS2.wav"),
    "A2": require("@/assets/audio/A2.wav"),
    "AS2": require("@/assets/audio/AS2.wav"),
    "B2": require("@/assets/audio/B2.wav"),

    "C3": require("@/assets/audio/C3.wav"),
    "CS3": require("@/assets/audio/CS3.wav"),
    "D3": require("@/assets/audio/D3.wav"),
    "DS3": require("@/assets/audio/DS3.wav"),
    "E3": require("@/assets/audio/E3.wav"),
    "F3": require("@/assets/audio/F3.wav"),
    "FS3": require("@/assets/audio/FS3.wav"),
    "G3": require("@/assets/audio/G3.wav"),
    "GS3": require("@/assets/audio/GS3.wav"),
    "A3": require("@/assets/audio/A3.wav"),
    "AS3": require("@/assets/audio/AS3.wav"),
    "B3": require("@/assets/audio/B3.wav"),

    "C4": require("@/assets/audio/C4.wav"),
    "CS4": require("@/assets/audio/CS4.wav"),
    "D4": require("@/assets/audio/D4.wav"),
    "DS4": require("@/assets/audio/DS4.wav"),
    "E4": require("@/assets/audio/E4.wav"),
    "F4": require("@/assets/audio/F4.wav"),
    "FS4": require("@/assets/audio/FS4.wav"),
    "G4": require("@/assets/audio/G4.wav"),
    "GS4": require("@/assets/audio/GS4.wav"),
    "A4": require("@/assets/audio/A4.wav"),
    "AS4": require("@/assets/audio/AS4.wav"),
    "B4": require("@/assets/audio/B4.wav"),

    "C5": require("@/assets/audio/C5.wav"),
    "CS5": require("@/assets/audio/CS5.wav"),
    "D5": require("@/assets/audio/D5.wav"),
    "DS5": require("@/assets/audio/DS5.wav"),
    "E5": require("@/assets/audio/E5.wav"),
    "F5": require("@/assets/audio/F5.wav"),
    "FS5": require("@/assets/audio/FS5.wav"),
    "G5": require("@/assets/audio/G5.wav"),
    "GS5": require("@/assets/audio/GS5.wav"),
    "A5": require("@/assets/audio/A5.wav"),
    "AS5": require("@/assets/audio/AS5.wav"),
    "B5": require("@/assets/audio/B5.wav"),

    "C6": require("@/assets/audio/C6.wav"),
    "CS6": require("@/assets/audio/CS6.wav"),
    "D6": require("@/assets/audio/D6.wav"),
    "DS6": require("@/assets/audio/DS6.wav"),
    "E6": require("@/assets/audio/E6.wav"),
    "F6": require("@/assets/audio/F6.wav"),
    "FS6": require("@/assets/audio/FS6.wav"),
    "G6": require("@/assets/audio/G6.wav"),
    "GS6": require("@/assets/audio/GS6.wav"),
    "A6": require("@/assets/audio/A6.wav"),
    "AS6": require("@/assets/audio/AS6.wav"),
    "B6": require("@/assets/audio/B6.wav"),

    "C7": require("@/assets/audio/C7.wav")
}

export function selectSound(soundName: string) {
    const soundArray = {
        'A-1': Sounds["A-1"],
        'AS-1': Sounds["AS-1"],
        'B-1': Sounds["B-1"],

        'C0': Sounds.C0,
        'CS0': Sounds.CS0,
        'D0': Sounds.D0,
        'DS0': Sounds.DS0,
        'E0': Sounds.E0,
        'F0': Sounds.F0,
        'FS0': Sounds.FS0,
        'G0': Sounds.G0,
        'GS0': Sounds.GS0,
        'A0': Sounds.A0,
        'AS0': Sounds.AS0,
        'B0': Sounds.B0,

        'C1': Sounds.C1,
        'CS1': Sounds.CS1,
        'D1': Sounds.D1,
        'DS1': Sounds.DS1,
        'E1': Sounds.E1,
        'F1': Sounds.F1,
        'FS1': Sounds.FS1,
        'G1': Sounds.G1,
        'GS1': Sounds.GS1,
        'A1': Sounds.A1,
        'AS1': Sounds.AS1,
        'B1': Sounds.B1,

        'C2': Sounds.C2,
        'CS2': Sounds.CS2,
        'D2': Sounds.D2,
        'DS2': Sounds.DS2,
        'E2': Sounds.E2,
        'F2': Sounds.F2,
        'FS2': Sounds.FS2,
        'G2': Sounds.G2,
        'GS2': Sounds.GS2,
        'A2': Sounds.A2,
        'AS2': Sounds.AS2,
        'B2': Sounds.B2,

        'C3': Sounds.C3,
        'CS3': Sounds.CS3,
        'D3': Sounds.D3,
        'DS3': Sounds.DS3,
        'E3': Sounds.E3,
        'F3': Sounds.F3,
        'FS3': Sounds.FS3,
        'G3': Sounds.G3,
        'GS3': Sounds.GS3,
        'A3': Sounds.A3,
        'AS3': Sounds.AS3,
        'B3': Sounds.B3,

        'C4': Sounds.C4,
        'CS4': Sounds.CS4,
        'D4': Sounds.D4,
        'DS4': Sounds.DS4,
        'E4': Sounds.E4,
        'F4': Sounds.F4,
        'FS4': Sounds.FS4,
        'G4': Sounds.G4,
        'GS4': Sounds.GS4,
        'A4': Sounds.A4,
        'AS4': Sounds.AS4,
        'B4': Sounds.B4,

        'C5': Sounds.C5,
        'CS5': Sounds.CS5,
        'D5': Sounds.D5,
        'DS5': Sounds.DS5,
        'E5': Sounds.E5,
        'F5': Sounds.F5,
        'FS5': Sounds.FS5,
        'G5': Sounds.G5,
        'GS5': Sounds.GS5,
        'A5': Sounds.A5,
        'AS5': Sounds.AS5,
        'B5': Sounds.B5,

        'C6': Sounds.C6,
        'CS6': Sounds.CS6,
        'D6': Sounds.D6,
        'DS6': Sounds.DS6,
        'E6': Sounds.E6,
        'F6': Sounds.F6,
        'FS6': Sounds.FS6,
        'G6': Sounds.G6,
        'GS6': Sounds.GS6,
        'A6': Sounds.A6,
        'AS6': Sounds.AS6,
        'B6': Sounds.B6,

        'C7': Sounds.C7

    }

    console.log('test');
    // @ts-ignore
    return soundArray[soundName];
}