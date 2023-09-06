import axios from "axios";

const BASE_URL = "https://api.thecatapi.com/v1/";
const KEY = "live_RUkNN0NvPlCPIiuiy2IQkYIXpUW9wlCvi9qmbogKRYu2UpebzmJs94dCYv2mjLZ5";

axios.defaults.headers.common["x-api-key"] = `${KEY}`;

export const fetchBreeds = function() {
    return axios.get(`${BASE_URL}breeds`)
 }

 export const fetchCatByBreed = function(breedId) {
    return axios.get(`${BASE_URL}images/search?breed_ids=${breedId}`)
 }


