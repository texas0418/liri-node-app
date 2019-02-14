require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var fs = require("fs");

var action = process.argv[2];
var userInput = process.argv.slice(3).join("+");

console.log("\x1b[1mType 'help' for LIRI instructions.\n\x1b[0m");

switchFunctions(action);

function switchFunctions(action) {
    switch (action) {

        case "help":
            liriHelp(userInput);
            break;

        case "concert-this":
            concertThis(userInput);
            break;

        case "spotify-this-song":
            spotifyThis(userInput);
            break;

        case "movie-this":
            movieThis(userInput);
            break;

        case "do-what-it-says":
            whatever(userInput);
            break;

        default:
            console.log("\x1b[31mPlease use a valid command or 'help' for instructions. Try using 'node liri' again.\x1b[0m");
    }
}

//Concert This (concert-this)
function concertThis(userInput) {
    var artist = userInput;
    axios
        .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {

            var info = response.data;

            for (var i = 3; i < response.data.length; i++) {
                var lineup = info[i].lineup;
                var venue = info[i].venue.name;
                var location = info[i].venue.city;
                var date = info[i].datetime;
                var formatDate = moment(date).format('MM/DD/YYYY');

                console.log("\x1b[7mArtist: " + lineup);
                console.log("Venue: " + venue);
                console.log("Location: " + location);
                console.log("Date: " + formatDate + "\x1b[0m\n\n");
            }
        }).catch(function (error) {
            return console.log(error);
        });
    logText();
}


//Spotify This Song (spotify-this-song)
function spotifyThis() {
    var song = userInput || "Ace of Base";
    var spotify = new Spotify(keys.spotify);

    spotify
        .search({
            type: "track",
            query: song,
            limit: 1
        })
        .then(function (response) {
            // console.log(response);
            var info = response.tracks.items[0];
            // console.log(info.album.name); //used to find path to variable responses
            var artist = info.album.artists[0].name;
            var song = info.name;
            var preview = info.preview_url;
            var album = info.album.name;

            console.log("\x1b[44m\x1b[37mArtist: " + artist);
            console.log("Song Title: " + song);
            console.log("Song Preview Link: " + preview);
            console.log("Album: " + album + "\x1b[0m");
        })
        .catch(function (error) {
            console.log(error);
        });
    logText();
}

//Movie This (movie-this)
function movieThis() {

    var movie = userInput || "Mr Nobody";
    axios
        .get("http://www.omdbapi.com/?t=" + movie + "&plot=short&apikey=trilogy")
        .then(function (response) {

            var title = response.data.Title;
            var year = response.data.Released;
            var rating = response.data.imdbRating;
            var rtr = response.data.Ratings[0].Value;
            var country = response.data.Country;
            var language = response.data.Language;
            var plot = response.data.Plot;
            var actors = response.data.Actors;

            console.log("\x1b[41m\x1b[37mMovie Title: " + title);
            console.log("Year Released: " + year);
            console.log("IMDB Rating: " + rating);
            console.log("Rotten Tomatoes Rating: " + rtr);
            console.log("Country Produced: " + country);
            console.log("Language: " + language);
            console.log("Plot: " + plot);
            console.log("Starring: " + actors + "\x1b[0m");
        })
        .catch(function (error) {
            console.log(error);
        });
    logText();
}

//Do What it Says (do-what-it-says)
function whatever() {
    fs.readFile('random.txt', 'utf-8', function (error, data) {
        if (error) {
            console.log(error);
        } else {
            var output = data.split(",");
            action = output[0];
            userInput = output[1];

            if (action === "spotify-this-song") {
                spotifyThis(action, userInput);
            }
        }
       
    });
}

//Log This Text
function logText() {
    fs.appendFile('log.txt', 'node liri ' + action + ' ' + userInput + '\n', function (error) {
        if (error) throw error;
        console.log("\x1b[2mThis has been logged to log.txt\n\x1b[0m");
    });
}



//Instructions Using Liri
function liriHelp() {

    console.log("\n\x1b[1m\x1b[31mWelcome! I am LIRI (Language Interpretation and Recognition Interface)\n \nPlease run one of the following commands below:\n\x1b[0m");
    console.log("\n\x1b[32mconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says\n\x1b[0m");
    console.log("\n\x1b\x1b[1m\x1b[31mTo use a command, type 'node liri (command) and either a band name, a song title, or a movie title\x1b[0m");

    logText();
}