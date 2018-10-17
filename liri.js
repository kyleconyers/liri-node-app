require("dotenv").config();
var keys = require("./keys.js")
var Spotify = require('node-spotify-api');
// var doWhatItSaysRandom = require("./random.txt")
// var artist = process.argv.slice(3).join('');
// var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";


// console.log(keys)

/**
 * takes command
 * execute command
   * `concert-this`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`
   * 
   * 
 * 
 * 
 */

 var command = process.argv[2]
//  console.log(command)

 switch(command){

     case `concert-this`:
        concertThis()
        // call concert function
     break;

     case `spotify-this-song`:
        var song = process.argv[3];
        
        if(process.argv.length > 2){
            spotify(song)
        }
        else{
            spotify()
        }
     console.log("spofity")
        //call spotify function
     break;

     case `movie-this`:
        movieThis()
        //call movie function
     break;

     case `do-what-it-says`:
        doWhatItSays()
        //does something
     break;
     default:
    //  console.log("invalidCommand")




 }

 function concertThis(){
    require("dotenv").config();
    var moment = require('moment');
    moment().format();
    
    //Bandsintown
    var request = require("request");
    if (process.argv[2] = 'concert-this')
    
    {
      var artist = process.argv.slice(3).join('');
      //console.log(artist);
    
      var queryURL = 'https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp';
      console.log(queryURL);
    
      request(queryURL, function (error, response, body) {
        if (error) {
          console.log(error);
          //console.log(response)
        }
    
        var result = JSON.parse(body);
        //console.log(result)
    
        for (i = 0; i < result.length; i++) {
          //console.log(i);
          console.log('Venue name: ', result[i].venue.name);
          console.log('Venue city, state: ', result[i].venue.city, result[i].venue.region);
          console.log('Date of event', moment(result[i].datetime).format('MM / DD / YYYY'));
        }
      });
    }
    //  console.log("concertThis")
 }

function spotify(song = "The Sign"){

    //instantiate spotify object
    //grab song name from process.argv
    //pass song name to spotify object, run query
    //parse through results, pass targeted pieces
    //display pieces/data
    var Spotify = require('node-spotify-api');
 
    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });
    
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       var track = data.tracks.items[0];
    //    console.log(track.artists)
       var artists = track.artists;
       artists.forEach(function(artist){
           console.log(artist.name) 
       })
       console.log(track.name);
       console.log(track.preview_url);
       console.log(track.album.name)
      });
};




 function movieThis(){
    var request = require("request");

    var movieName = process.argv[2];
    
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    
    console.log(queryUrl);
    
    request(queryUrl, function(error, response, body) {
    
      if (!error && response.statusCode === 200) {
    
        console.log("Release Year: " + JSON.parse(body).Year);
      }
    });
 }

 function doWhatItSays(){

    // fs is a core Node package for reading and writing files
var fs = require("fs");

// This block of code will read from the "movies.txt" file.
// It's important to include the "utf8" parameter or the code will provide stream data (garbage)
// The code will store the contents of the reading inside the variable "data"
fs.readFile("random.txt", "utf8", function(error, data) {

  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }

  // We will then print the contents of data
  
  
 
  // Then split it by commas (to make it more readable)
  var dataArr = data.split(",");
//   console.log(dataArr);
  
   

  if (data) {
    //   console.log("dataworks");
     
    var Spotify = require('node-spotify-api');
 
    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });
    
    var song = dataArr[1];
    // console.log(song)
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
            console.log("anything__________________________")
          return console.log('Error occurred: ' + err);
        }
       var track = data.tracks.items[0];
    //    console.log(track.artists)
       var artists = track.artists;
       artists.forEach(function(artist){
           console.log(artist.name) 
       })
       console.log(track.name);
       console.log(track.preview_url);
       console.log(track.album.name)
      });
    
};

  // We will then re-display the content as an array for later use.
//   console.log(dataArr);

});
};

 