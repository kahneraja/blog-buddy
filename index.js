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

getBlogFeed('http://kahneraja.com/feed.json', getLatestTweet)

function getBlogFeed(url, callback){
  console.log("getBlogFeed: " + url);
  http.get(url, function(res){
      var body = '';

      res.on('data', function(chunk){
          body += chunk;
      });

      res.on('end', function(){
          var response = JSON.parse(body);
          var keywords = response[0].keywords.split(",");
          var rand = Math.floor(Math.random() * keywords.length) + 1
          callback(keywords[rand-1], likeLatestTweet);
      });
  }).on('error', function(e){
        console.log("Got an error: ", e);
  });
}

function getLatestTweet(q, callback){
  console.log("getLatestTweet: " + q);
  var client = new Twitter(config);

  var params = {q: q, result_type: 'recent', count: 1};
  client.get('search/tweets.json', params, function(error, tweets, response) {
    if (!error) {
      callback(tweets.statuses[0].id_str);
    } else {
      console.log(error);
    }
  });
};

function likeLatestTweet(id){
  console.log("likeLatestTweet: " + id);
  var client = new Twitter(config);

  var params = {id: id};
  client.post('favorites/create.json', params, function(error, favorite, response) {
    if (!error) {
      console.log(favorite.text);
    } else {
      console.log(error);
    }
  });
};
