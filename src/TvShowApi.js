import axios from 'axios';

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/tv/"
});

const apiKey = "64f10120eebaa55c3f4145a9ae736317";
const language = "en-US";
const pages = 10;

async function getShows() {
    let data = [];
    let responses = [];
    let statusCodes = [];
    try {
        for (let i = 0; i < pages; i++) {
            const response = await api.get("top_rated?api_key=" + apiKey + "&language=" + language + "&page=" + (i + 1) + "");
            responses.push(response.data.results);
            statusCodes.push("Page " + (i + 1) + " status code: " + response.status);
        }
        console.log(responses);
        console.log(statusCodes);
        for (let i = 0; i < responses.length; i++) {
            let record = responses[i];
            for (let j = 0; j < record.length; j++) {
                data.push(record[j]);
            }
        }
    } catch (error) {
        console.error(error);
    }
    return data.sort((a, b) => a.name.localeCompare(b.name));
}

export { getShows };