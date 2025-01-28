import axios from "axios";

const Axios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || ""
})


export default Axios