import axios from "axios";

export const axiosInstance = axios.create(
    {
        baseURL: 'http://worldtimeapi.org/api/',
        withCredentials: false,
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