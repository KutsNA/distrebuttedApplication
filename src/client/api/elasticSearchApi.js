import axios from "axios";
import { elasticApiUrl } from "./config";


export function findPostByBody(body) {
    // return axios
    //     .get(`${apiUrl}/${body}`)
    //     .then(response => response.data);
    return axios
        .get(`${elasticApiUrl}/${body}`)
        .then(response => response.data);
}