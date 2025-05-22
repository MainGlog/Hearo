import axios from "axios";
import Scale from "@/models/Scale";

const apiUrl = "http://10.0.2.2:5028"

export const getAllScales = async (): Promise<Scale[]> => {
    return axios
        .get(`${apiUrl}/v1/Scale/GetAllScales`, {
            headers: { "Content-Type": "application/json" },
            responseType: "json"
        })
        .then(async (response) => {
            let scales: Scale[] = [];

            scales = response.data.$values.map((scale: any) => ({
                id: scale.scaleId,
                name: scale.scaleName,
                quality: scale.scaleQuality,
                rootId: scale.scaleRoot,
                keyId: scale.keyId
            }));
            return scales as Scale[];
        })
        .catch((error) => {
            console.error(error);
            return [];
        })
}

export const getScaleById = async (id: number): Promise<Scale | void> => {
    return axios
        .get(`${apiUrl}/v1/Scale/GetScaleById?id=${id}`, {
            headers: {"Content-Type": "application/json"}
        })
        .then(async (response) => {
            const scale = await response.data;
            return new Scale(
                scale.scaleId, scale.scaleName, scale.scaleQuality,
                scale.scaleRoot, scale.keyId, '');
        })
        .catch((error) => {
            console.error(error);
        });
    }

export const updateScale = async (scale: Scale) => {
        axios
            .get(`${apiUrl}/scale/UpdateScale?scale=${scale}`)
            .then((response) => {
                // TODO
            })
            .catch((error) => {
                if(error.response) {
                    console.log(error.response.status);
                }
            })
    }
