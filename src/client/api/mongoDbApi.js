import axios from "axios";
import { mongoDBApiUrl } from "./config";


export function findPostById(id) {
    return axios
        .get(`${mongoDBApiUrl}/${id}`)
        .then(response => response.data);
};