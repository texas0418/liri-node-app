var spotify = require("Node-Spotify-API");
var inquirer = require("inquirer");
var axios = require("axios");
var moment = require("moment");
var dotEnv = requireI("dotenv");

axios
  .get("http://www.omdbapi.com/?t=the+notebook&y=&plot=short&apikey=trilogy")
  .then(function(response) {
    console.log("The movie's rating is: " + response.data.imdbRating);
  });



var concerts =  
axios
  .get("https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp")
  .then(function(response) {

  }