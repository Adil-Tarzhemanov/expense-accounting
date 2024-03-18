import axios from "axios";
import {getTokenFromLocalstorage} from "../helpers/localstorage.helper";

export const axiosAuth = () => {
    const token = getTokenFromLocalstorage() || '';
    return axios.create({
        baseURL: 'http://localhost:5000',
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}