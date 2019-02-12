require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var inquirer = require("inquirer");
var fs = require("fs");



// //Concert This
// function concertThis() {
// var userInput = process.argv.slice(2).join("+");
// var artist = userInput;
// axios
//     .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
//     .then(function (response) {

//         var info = response.data;

//         for (var i = 2; i < response.data.length; i++) {
//             var lineup = info[i].lineup;
//             var venue = info[i].venue.name;
//             var location = info[i].venue.city;
//             var date = info[i].datetime;
//             var formatDate = moment(date).format('MM/DD/YYYY');

//             console.log("Artist: " + lineup);
//             console.log("Venue: " + venue);
//             console.log("Location: " + location);
//             console.log("Date: " + formatDate);
//         }
//     });
// }

// //Spotify This Song
// function spotifyThis() {
var userInput = process.argv.slice(2).join("+");
var song = userInput;
var spotify = new Spotify(keys.spotify);

spotify
    .search({
        type: "track",
        query: song,
        limit: 1
    })
    .then(function (response) {
        // console.log(response);
            var artist = response.tracks.href.items[0].album.artists[0].external_urls.name;
            // var song = response.name;
            // var preview = response.data.preview_url;
            // var album = response.data.album.name;

            console.log("Artist: " + artist);
            // console.log("Song Title: " + song);
            // console.log("Song Preview Link: " + preview);
            // console.log("Album: " + album);
        })
    .catch(function (err) {
        console.log(err);
    });

// }

// //Movie This
// function movieThis () {
// var userInput = process.argv.slice(2).join("+");
// var movie = userInput;
// axios
//     .get("http://www.omdbapi.com/?t=" + movie + "&plot=short&apikey=trilogy")
//     .then(function (response) {

//         var title = response.data.Title;
//         var year = response.data.Released;
//         var rating = response.data.imdbRating;
//         var rtr = response.data.Ratings[0].Value;
//         var country = response.data.Country;
//         var language = response.data.Language;
//         var plot = response.data.Plot;
//         var actors =  response.data.Actors;

//         console.log("Movie Title: " + title);
//         console.log("Year Released: " + year);
//         console.log("IMDB Rating: " + rating);
//         console.log("Rotten Tomatoes Rating: " + rtr);
//         console.log("Country Produced: " + country);
//         console.log("Language: " + language);
//         console.log("Plot: " + plot);
//         console.log("Starring: " + actors);
//     });