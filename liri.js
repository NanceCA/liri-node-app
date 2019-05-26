//-----DOCUMENT SET UP-----//

require("dotenv").config();

//code required to import the keys.js information
var keys = require("./keys.js")
var axios = require("axios");
var Spotify = require("node-spotify-api");
var fs = require("fs");

//access my key information for Spotify API 
var spotify = new Spotify(keys.spotify);


//-----READING USER INPUT-----//
//options concert-this; spotify-this-song; movie-this; do-what-it-says

var action = process.argv[2];
var dataPoint = "";
console.log("Loading the following action " + action);

//controlling for multiple words in a movie title
for (var i = 3; i < process.argv.length; i++) {
    dataPoint += process.argv[i] + " ";
}
console.log("Searching for ... " + dataPoint);
userChecks();


function userChecks() {
    if (action == "concert-this") {
        getConcert(dataPoint);

    } else if (action == "spotify-this-song") {
        getSpotify(dataPoint);

    } else if (action == "movie-this") {
        getMovie(dataPoint);

    } else if (action == "do-what-it-says") {
        getOther();

    } else {
        console.log("Looks like you didn't enter a valid command");

    }
};

//-----FUNCTION DECLARATIONS-----//
function getMovie(data) {

    if (data == "") {
        data = "Mr. Nobody"
        console.log("No movie input was received. We've picked one for you!")
    }

    var queryURL = "http://www.omdbapi.com/?t=" + data + "&y=&plot=short&apikey=trilogy";

    //-----AXIOS CALL-----//
    axios.get(queryURL).then(
        function (response) {
            console.log("-----------MOVIE INFO-------------")
            console.log("Title: " + response.data.Title);
            console.log("Year Released: " + response.data.Year);
            console.log("IMDB rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country were produced: " + response.data.Country);
            console.log("Language(s) of the movie: " + response.data.Language);
            console.log("Plot of " + data + "is: " + response.data.Plot);
            console.log("Actors in the movie include: " + response.data.Actors);
            console.log("-----------END MOVIE INFO-------------")
        }
    ).catch(function (error) {
        if (error.response) {
            console.log("-------Data-------");
            console.log(error.response.data);
            console.log("-------Status-------");
            console.log(error.response.status);
            console.log("-------Headers-------");
            console.log(error.response.headers);
        } else if (error.request) {
            //the request was made but no response was received
            console.log(error.request)
        } else {
            console.log("Error", error.message);
        }
        console.log(error.config);
    });
};

function getSpotify(song) {

    if (song == "") {
        song = "The Sign"
        console.log("No song was received. We've picked one for you!")
    }

    spotify.search({ type: 'track', query: song },
        function (err, data) {
            if (err) {
                return console.log("Error occurred: " + err);
            }

            console.log("Song name: " + data.tracks.items[0].name);
            artistArr = data.tracks.items[0].album.artists;

            console.log("Artists include:")
            for (i = 0; i < artistArr.length; i++) {
                console.log(artistArr[i].name);
            }
            console.log("Album name is the following: " + data.tracks.items[0].album.name)
            console.log("Here's a preview link: " + data.tracks.items[0].external_urls.spotify);

        });
};

function getConcert(artist) {

    var movieurl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(movieurl).then(
        function (response) {
            console.log(response);
        }
    ).catch(function (error) {
        if (error.response) {
            console.log("-------Data-------");
            console.log(error.response.data);
            console.log("-------Status-------");
            console.log(error.response.status);
            console.log("-------Headers-------");
            console.log(error.response.headers);
        } else if (error.request) {
            //the request was made but no response was received
            console.log(error.request)
        } else {
            console.log("Error", error.message);
        }
        console.log(error.config);
    });


};

function getOther() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        var dataArr = data.split(",");
        console.log(dataArr);
        action = dataArr[0];
        dataPoint = dataArr[1];
        console.log(dataPoint);

        userChecks();

    }
    )
};
