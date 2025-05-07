import axios from "axios";
import Note from "@/models/Note";
import fs from "react-native-fs";



export let notes: Note[];
const apiUrl = "http://10.0.2.2:5028"

export const getAllNotes = async (): Promise<Note[]> => {

    /*let cert: string = 'MIIDDDCCAfSgAwIBAgIIZ1z2YJdcuEswDQYJKoZIhvcNAQELBQAwFDESMBAGA1UEAxMJbG9jYWxob3N0MB4XDTI1MDEzMDE3MTE1MloXDTI2MDEzMDE3MTE1MlowFDESMBAGA1UEAxMJbG9jYWxob3N0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsXt5ULY0ICNf9kor4ugxHVa5T/L2zjBLgD9ThymjLS7Q6hD8+sg1SHAjKXIg /kUrc9el7HY80v1i7cgsAWbE0cQqw4DS8mhTc0iOynTCdF/JqiW57NzP5/6k5alfbRSkU3AIhaSYtSHKi97EJBlzeIBxbDjhYCbKybbRAmebC+BWJuj9uqYIvyI1ihUSJOilr81frXb03iYd8AXJEOB2WgErKkTVpNj9OXf5HsU5dfEYuzW3Aa4CTLoaKhG6EcldN9f0uE1nbTugGrgpjUp6lgRZX9/qzMPJ6u3SZAuc1GyfjhhtS62tutBJeqbibMsj3dUqzbCkMzfjR87H22r9qQIDAQABo2IwYDAMBgNVHRMBAf8EAjAAMA4GA1UdDwEB/wQEAwIFoDAWBgNVHSUBAf8EDDAKBggrBgEFBQcDATAXBgNVHREBAf8EDTALgglsb2NhbGhvc3QwDwYKKwYBBAGCN1QBAQQBAjANBgkqhkiG9w0BAQsFAAOCAQEAgDgtoqX53zNKaiiGZX9Q7SW4RgG0UUft3kLabYsmBDHRP2HeDP4zsVis7aGUJA8XuWj2Wj1o9uW5MIekf56coX3oW92JK7wiKbVbCFbXzZ9+MekhTqE1Z6Nk4hFmUdxjzza7e85Q95FyBwDEVWtH6z714jTKLUO9Z1HydZZ1LM8LWknIrD3nK9SCDEQmzBfzt8s1p350l1EVL7sw6e9lWS1kJbuhUNRR7CChLfzRWXtvD5AG1/a3i63bxhhVm+rJVy/AiSs44hzUQcRuFZ+sfGb23eb3vVr/i1ebYtPWafLmsDVbgDKbsRQ/uSGKDC29Cqu1wodFmeXSZ30UgEVvg==';
    fs.readFileAssets("@/assets/cert.crt")
        .then((response) => {
            cert = response.toString()
        })

    const agent = {
        httpsAgent: {
            cert: cert,
            rejectUnauthorized: false
        }
    }*/

    return axios
        .get(`${apiUrl}/v1/Note/GetAllNotes`, {
            headers: { "Content-Type": "application/json" },
            responseType: "json"
        })
        .then(async (response) => {
            const notes: Note[] = [];
            console.log(response.data);
            for (const key in response.data)
            {
                console.log("Key: " + key);
                if(response.data.hasOwnProperty(key)) {
                    const note = response.data[key];
                    notes.push({
                        id: note.id,
                        name: note.name,
                        sound: note.sound,
                        enharmonic: note.enharmonic
                    } as Note)
                }
            }


            console.log('Printing notes array:');
            console.log(notes);
            return notes as Note[];
        })
        .catch((error) => {
            console.error(error);
            return [];
        })
    }

export const getNoteById = async (id: number):Promise<Note | void> => {
    return axios
        .get(`${apiUrl}/v1/Note/GetNoteById?=${id}`, {
            headers: {"Content-Type": "application/json"}
        })
        .then(async (response) => {
            const note = await response.data;
            return note as Note;
        })
        .catch((error) => {
            console.error(error);
        });
}

export const updateNote = async (note: Note) => {
    axios
        .get(`${apiUrl}/v1/Note/UpdateNote?note=${note}`)
        .then((response) => {
            let existingNote: Note = notes.find((s) => s.id === note.id)!;
        })
        .catch((error) => {
            if(error.response) {
                console.log(error.response.status);
            }
        })
}
