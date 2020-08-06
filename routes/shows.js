const express = require('express');
const router = express.Router();

/**
 * Fetching image and name of shows from tvmaze api fillted by their name
 * 
 * @returns Shows information
 */
router.get('/', async (req, res) => {
    try {
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
 * Fetching shows names from tvmaze api for autocomplete.
 * 
 * @returns Best 5 options, based on their score in tvmaze
 */
router.get('/autocomplete', async (req, res) => {
    try {
        res.status(200).send([{"name": "Gilmore Girls","image":"http://static.tvmaze.com/uploads/images/medium_portrait/4/11308.jpg"}])
    } catch(err) {
        res.status(500).send(`Failed while trying to get autocomplete options for shows names. ${err.message}`);
    }
});

module.exports = router;