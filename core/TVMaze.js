/**
 * The module is responsible for all the api requests to tvmaze site.
 * 
 * @author Daniel231
 */

const axios = require("axios");

/**
 * Fetch show data from tvmaze api fillted by their name.
 * 
 * @param {string} searchText - The name of the movie to search.
 * 
 * @returns A promise with the request to tvmaze with the text filter.
 */
const getShowsInfo = (searchText) => {
    return axios.get(`${config.TVmaze.SearchAPI}?q=${searchText}`);
}

module.exports = {
    getShowsInfo,
}