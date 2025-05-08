import axios from "axios";
import Chord from "@/models/Chord";

const apiUrl = "http://10.0.2.2:5028"

export const getAllChords = async (): Promise<Chord[]> => {
    return axios
        .get(`${apiUrl}/v1/Chord/GetAllChords`, {
            headers: { "Content-Type": "application/json" },
            responseType: "json"
        })
        .then(async (response) => {
            let chords: Chord[] = [];

            chords = response.data.$values.map((chord: any) => ({
                id: chord.chordId,
                name: chord.chordName,
                quality: chord.chordQuality,
                root: chord.chordRoot,
                notation: chord.chordNotation
            }));
            return chords as Chord[];
        })
        .catch((error) => {
            console.error(error);
            return [];
        })
}

export const getChordById = async (id: number): Promise<Chord | void> => {
    return axios
        .get(`${apiUrl}/v1/Chord/GetChordById?=${id}`, {
            headers: {"Content-Type": "application/json"}
        })
        .then(async (response) => {
            const chord = await response.data;
            return chord as Chord;
        })
        .catch((error) => {
            console.error(error);
        });
}

export const updateChord = async (chord: Chord) => {
    axios
        .get(`${apiUrl}/chord/UpdateChord?chord=${chord}`)
        .then((response) => {
            // TODO
        })
        .catch((error) => {
            if(error.response) {
                console.log(error.response.status);
            }
        })
}
