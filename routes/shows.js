const express = require('express');
const router = express.Router();
const { getShowsInfo } = require('../core/TVMaze');

/**
 * Fetching image and name of shows fillted by their name
 * 
 * @returns Shows information
 */
router.get('/', async (req, res) => {
    try {
        const showName = req.query.search;

        // Getting shows data from tvmaze api
        let shows = await getShowsInfo(showName);

        // Check if there is any matching results
        if(shows.data.length === 0) {
            res.status(404).send("No results was found");
            return;
        }
        
        // Running on the shows and save only the their names, id`s and image.
        const showsData = shows.data.map(show => ({name: show.show.name, id: show.show.id, image: show.show.image.medium}));

        res.status(200).send(showsData);
    } catch(err) {
        res.status(500).send(`Failed while trying to get shows information. ${err.message}`);
    }
});

/**
 * Fetching shows names for autocomplete.
 * 
 * @returns Best 5 options, based on their score in tvmaze
 */
router.get('/autocomplete', async (req, res) => {
    try {
        const searchShowName = req.query.search;

        // Getting shows data from tvmaze api
        let shows = await getShowsInfo(searchShowName);

        // Check if there is any matching results
        if(shows.data.length === 0) {
            res.status(404).send("No results was found");
            return;
        }

        // Taking first 5 shows to get 5 best options, cause we can see that tvmaze sort the array by their score
        shows = shows.data.slice(0, 5)
        
        // Running on the shows and save only the their names.
        const showsNames = shows.map(show => ({name: show.show.name}));
        
        res.status(200).send(showsNames);
    } catch(err) {
        res.status(500).send(`Failed while trying to get autocomplete options for shows names. ${err.message}`);
    }
});

module.exports = router;