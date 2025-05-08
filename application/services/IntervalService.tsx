import axios from "axios";
import Interval from "@/models/Interval";


export let intervals: Interval[];
const apiUrl = "http://10.0.2.2:5028"

export const getAllIntervals = async (): Promise<Interval[]> => {
    return axios
        .get(`${apiUrl}/v1/Interval/GetAllIntervals`, {
            headers: { "Content-Type": "application/json" },
            responseType: "json"
        })
        .then(async (response) => {
            intervals = response.data.$values.map((interval: any) => ({
                id: interval.intervalId,
                quality: interval.intervalQuality,
                size: interval.size,
                semitonesFromRoot: interval.semitonesFromRoot,
                rootNoteId: interval.rootNoteId,
                intervalNoteId: interval.intervalNoteId
            }));
            return intervals as Interval[];
        })
        .catch((error) => {
            console.error(error);
            return [];
        })
}

export const getIntervalById = async (id: number):Promise<Interval | void> => {
    return axios
        .get(`${apiUrl}/v1/Interval/GetIntervalById?=${id}`, {
            headers: {"Content-Type": "application/json"}
        })
        .then(async (response) => {
            const interval = await response.data;
            return interval as Interval;
        })
        .catch((error) => {
            console.error(error);
        });
}

export const updateInterval = async (interval: Interval) => {
    axios
        .get(`${apiUrl}/v1/Interval/UpdateInterval?interval=${interval}`)
        .then((response) => {
            let existingInterval: Interval = intervals.find((s) => s.id === interval.id)!;
        })
        .catch((error) => {
            if(error.response) {
                console.log(error.response.status);
            }
        })
}
