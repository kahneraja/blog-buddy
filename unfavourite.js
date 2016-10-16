var http = require('http');
var Twitter = require('twitter');
var dotenv = require('dotenv');
dotenv.load();

var config = {
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token_key,
  access_token_secret: process.env.access_token_secret
};

getOldFavorites(destroyOldFavorites)

function getOldFavorites(callback){
  var client = new Twitter(config);
  var params = {count: 200};
  client.get('/favorites/list.json?count=110', params, function(error, result, response) {
    if (!error) {
      const oldFavorites = result.splice(100);
      callback(oldFavorites);
    } else {
      console.log(error);
    }
  });
};

function destroyOldFavorites(favorites){
  var client = new Twitter(config);
  for(let favorite of favorites)
  {
    var params = {id: favorite.id_str};
    console.log("unfavorite: " + favorite.id_str);
    client.post('favorites/destroy.json', params, function(error, result, response) {
      if (!error) {
        // console.log(result.text);
      } else {
        console.log(error);
      }
    });
  }

};
