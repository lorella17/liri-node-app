require("dotenv").config();

var keys = require("./keys.js");

var Twitter = require('twitter');

var client = new Twitter(commands);
    // consumer_key: process.env.4TynDgXQ1xyFlFtv54SRiY2G5,
    // consumer_secret:process.env.sdChnwmaAKeLthabDXO3EDFkWeA7gbDRSaFnM97CDspcV2dLhv,
    // access_token_key:process.env.985274193079128065-haMhpurYBXaGjt1bQkiHB69OSIcildA,
    // access_token_secret:process.env.jm8SllXNikn5zxas4DKCk6OWU8uTMTm0lzfLfwDmaOnY9

var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        console.log(tweets);
    }
});

/* Load the HTTP library */
var http = require("http");

/* Create an HTTP server to handle responses */

http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
}).listen(8888);

// Include the request npm package (Don't forget to run "npm install request" in this folder first!)
var request = require("request");

// Then run a request to the OMDB API with the movie specified
request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function(error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {

        // Parse the body of the site and recover just the imdbRating
        // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
        console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
    }
});