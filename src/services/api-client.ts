import axios from "axios";

export const axiosInstance = axios.create(
    {
        baseURL: 'https://wft-geo-db.p.rapidapi.com/v1/',
        headers: {
            'X-RapidAPI-Key': '86124587fdmsh1b504d18fccc3dfp1134c3jsne0958a931e39',
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
    }
)

class ApiClient<T> {
    endpoint: string

    constructor(endpoint: string) {
        this.endpoint = endpoint
    }

    get = async () => {
        const res = await axiosInstance.get<T>(this.endpoint);
        return res.data;
    }
}

export default ApiClient