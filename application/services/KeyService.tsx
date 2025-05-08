import axios from "axios";
import Key from "@/models/Key";
const apiUrl = "http://10.0.2.2:5028"

export const getAllKeys = async (): Promise<Key[]> => {
    return axios
        .get(`${apiUrl}/v1/Key/GetAllKeys`, {
            headers: { "Content-Type": "application/json" },
            responseType: "json"
        })
        .then(async (response) => {
            let keys: Key[] = [];

            response.data.$values.map((key: any) => (
            keys.push({
                id: key.keyId,
                name: key.keyName,
                quality: key.keyQuality,
                flatsCount: key.flatsCount,
                doubleFlatsCount: key.doubleFlatsCount,
                sharpsCount: key.sharpsCount,
                doubleSharpsCount: key.doubleSharpsCount,
                relativeMinor: key.relativeMinor,
                relativeMajor: key.relativeMajor
            })));
            return keys;
        })
        .catch((error) => {
            console.error(error);
            return [];
        })
}

export const getKeyById = async (id: number):Promise<Key | void> => {
    return axios
        .get(`${apiUrl}/v1/Key/GetKeyById?=${id}`, {
            headers: {"Content-Type": "application/json"}
        })
        .then(async (response) => {
            const key = await response.data;
            return key as Key;
        })
        .catch((error) => {
            console.error(error);
        });
}

export const updateKey = async (key: Key) => {
    axios
        .get(`${apiUrl}/v1/Key/UpdateKey?key=${key}`)
        .then((response) => {
            // TODO ??
        })
        .catch((error) => {
            if(error.response) {
                console.log(error.response.status);
            }
        })
}
