require("dotenv").config();

//global variable
var commands = process.argv[2];
var userInput = process.argv[3];

//get file system
var fs = require('fs');

// declaring my variables
var keys = require("./keys.js");

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");

var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);


function runCommands(commands, userInput) {

        switch (commands) {

            case 'my-tweets':
                console.log("my-tweets");
                myTweets(userInput);
                break;

            case 'spotify-this-song':
                console.log("spotify-this-song");
                song(userInput);
                break;

            case 'movie-this':
                console.log("movie-this");
                getMovie(userInput);
                break;

            case 'do-what-it-says':
                console.log("do-what-it-says");
                justDoit();
                break;


        }
    };


    var myTweets = function (userInput) {

        if (!userInput){
            var params = {screen_name: "orellanaleo8", count: 10};
            client.get('statuses/user_timeline', params, function (error, tweets, response) {
                if (error) {
                    console.log(error);
                }

                var myTweets = tweets.user;
                for (var i = 0; i < tweets.length; i++) {
                    console.log(tweets[i].text, '\n', tweets[i].created_at);
                }

            });

        } else
        var params = {screen_name: userInput, count: 10};
        client.get('statuses/user_timeline', params, function (error, tweets, response) {
            if (error) {
                console.log(error);
            }

            var myTweets = tweets.user;
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text, '\n', tweets[i].created_at);
            }

        });

    };


    var song = function (userInput) {

        if (!userInput) {
            spotify.search({ type: 'track', query: "Rakata", limit: 1 }, function (err, data) {
                if (err) {
                    return console.log(+ err);
                }

                var artist = data.tracks.items[0].artists[0].name;
                var albumName = data.tracks.items[0].album.name;
                var songName = data.tracks.items[0].name;
                var previewLink = data.tracks.items[0].external_urls.spotify;
                console.log(`\nArtist Name: ${artist}\nSong: ${songName}\nPreview Link: ${previewLink}\nAlbum: ${albumName}\n`);
                fs.appendFile(
                    "liri-log.txt", `\nArtist: ${artist}\nSong: ${songName}\nPreview Link: ${previewLink}\nAlbum: ${albumName}\n`, function (err) {
                        if (err) {
                            return console.log(err);
                        }
                    });

            });
        } else {
            spotify.search({ type: 'track', query: userInput, limit: 1 }, function (err, data) {
                if (err) {
                    return console.log(err);
                }

                var artist = data.tracks.items[0].artists[0].name;
                var albumName = data.tracks.items[0].album.name;
                var songName = data.tracks.items[0].name;
                var previewLink = data.tracks.items[0].external_urls.spotify;
                console.log(`\nArtist: ${artist}\nSong: ${songName}\nPreview Link: ${previewLink}\nAlbum: ${albumName}\n`);
                fs.appendFile(
                    "liri-log.txt", `\nArtist: ${artist}\nSong: ${songName}\nPreview Link: ${previewLink}\nAlbum: ${albumName}\n`, function (err) {
                        if (err) {
                            return console.log(err);
                        }
                    });

            });
        }
    };


var getMovie = function(userInput) {
    if (!userInput) {
        request(`http://www.omdbapi.com/?t=mr.nobody&apikey=trilogy`, function (error, response, body) {
            // If the request is successful (i.e. if the response status code is 200)
            if (!error && response.statusCode === 200) {

                //printing movie info
                console.log(
                    "The movie's title is:" + JSON.parse(body).Title,
                    "\nThe movie was released in:" + JSON.parse(body).Title,
                    "\nThe movie was produced in:" + JSON.parse(body).Title,
                    "\nThe movie's rating is: " + JSON.parse(body).imdbRating,
                    "\nThe movie is about:" + JSON.parse(body).Plot,
                    "\nThe movie stars:" + JSON.parse(body).Actors);
            }
        });

    } else {
        request("http://www.omdbapi.com/?t=" + userInput + "&apikey=trilogy", function (error, response, body) {

            // If the request is successful (i.e. if the response status code is 200)
            if (!error && response.statusCode === 200) {

                //printing movie info
                console.log(
                    "The movie's title is:" + JSON.parse(body).Title,
                    "\nThe movie was released in:" + JSON.parse(body).Title,
                    "\nThe movie was produced in:" + JSON.parse(body).Title,
                    "\nThe movie's rating is: " + JSON.parse(body).imdbRating,
                    "\nThe movie is about:" + JSON.parse(body).Plot,
                    "\nThe movie stars:" + JSON.parse(body).Actors);
            }
        });

    }
};

runCommands(commands, userInput);
