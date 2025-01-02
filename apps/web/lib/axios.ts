import axios from "axios";

const Axios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
})


export default Axios