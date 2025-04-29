import axios from "axios";
import Scale from "@/models/Scale";
export let scales: Scale[];

const apiUrl = "http://localhost:7290"
export default function ScaleService() {
    const getScales = async () => {
        const configObject = {
            method: 'get',
            url: `${apiUrl}/scale/GetAllScales}`
        };
        const response = await axios(configObject);
        return response.data;
    }

    const getScaleById = async (id: number) => {
        const configObject = {
            method: 'get',
            url: `${apiUrl}/scale/GetScaleById?id=${id}`
        };
        const response = await axios(configObject);
        return response.data;
    }

    const updateScale = async (scale: Scale) => {
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
}