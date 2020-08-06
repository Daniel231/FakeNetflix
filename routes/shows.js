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
        // const showName = req.query.search;
        res.status(200).send([{
            "id": 525,
            "url": "http://www.tvmaze.com/shows/525/gilmore-girls",
            "name": "Gilmore Girls",
            "type": "Scripted",
            "language": "English",
            "genres": [
              "Drama",
              "Comedy",
              "Romance"
            ],
            "status": "Ended",
            "runtime": 60,
            "premiered": "2000-10-05",
            "officialSite": null,
            "schedule": {
              "time": "21:00",
              "days": [
                "Tuesday"
              ]
            },
            "rating": {
              "average": 8.3
            },
            "weight": 83,
            "network": {
              "id": 5,
              "name": "The CW",
              "country": {
                "name": "United States",
                "code": "US",
                "timezone": "America/New_York"
              }
            },
            "webChannel": null,
            "externals": {
              "tvrage": 3683,
              "thetvdb": 76568,
              "imdb": "tt0238784"
            },
            "image": {
              "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/4/11308.jpg",
              "original": "http://static.tvmaze.com/uploads/images/original_untouched/4/11308.jpg"
            },
            "summary": "<p><b>Gilmore Girls</b> is a drama centering around the relationship between a thirtysomething single mother and her teen daughter living in Stars Hollow, Connecticut.</p>",
            "updated": 1591732958,
            "_links": {
              "self": {
                "href": "http://api.tvmaze.com/shows/525"
              },
              "previousepisode": {
                "href": "http://api.tvmaze.com/episodes/47639"
              }
            }
          }]);
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
        shows = shows.slice(0, 5)
        
        // Running on the shows and save only the their names.
        const showsNames = shows.data.map(show => show.show.name);
        
        res.status(200).send(showsNames);
    } catch(err) {
        res.status(500).send(`Failed while trying to get autocomplete options for shows names. ${err.message}`);
    }
});

module.exports = router;