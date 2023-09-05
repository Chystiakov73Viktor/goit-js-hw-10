import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_RUkNN0NvPlCPIiuiy2IQkYIXpUW9wlCvi9qmbogKRYu2UpebzmJs94dCYv2mjLZ5";

function fetchBreeds() {
    return axios.get("https://api.thecatapi.com/v1/breeds")
 }

 function fetchCatByBreed(breedId) {
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
 }

 export { fetchBreeds, fetchCatByBreed };

