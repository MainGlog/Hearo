import axios from "axios";
import Scale from "@/models/Scale";
export let scales: Scale[];

const apiUrl = "http://10.0.2.2:5028"

export const getAllScales = async (): Promise<Scale[]> => {
    return axios
        .get(`${apiUrl}/v1/Scale/GetAllScales`, {
            headers: { "Content-Type": "application/json" },
            responseType: "json"
        })
        .then(async (response) => {
            const scales = await response.data;
            JSON.parse(scales);
            console.log(scales);
            return scales as Scale[];
        })
        .catch((error) => {
            console.error(error);
            return [];
        })
}

export const getScaleById = async (id: number): Promise<Scale | void> => {
    return axios
        .get(`${apiUrl}/v1/Scale/GetScaleById?=${id}`, {
            headers: {"Content-Type": "application/json"}
        })
        .then(async (response) => {
            const scale = await response.data;
            return scale as Scale;
        })
        .catch((error) => {
            console.error(error);
        });
    }

export const updateScale = async (scale: Scale) => {
        axios
            .get(`${apiUrl}/scale/UpdateScale?scale=${scale}`)
            .then((response) => {
                let existingScale: Scale = scales.find((s) => s.id === scale.id)!;
            })
            .catch((error) => {
                if(error.response) {
                    console.log(error.response.status);
                }
            })
    }
