var http = require('http');
var Twitter = require('twitter');
var config = require('./config');

console.log("Hello World");

var url = 'http://kahneraja.com/feed.json';

http.get(url, function(res){
    var body = '';

    res.on('data', function(chunk){
        body += chunk;
    });

    res.on('end', function(){
        var response = JSON.parse(body);
        console.log("Got a response: ", response);
    });
}).on('error', function(e){
      console.log("Got an error: ", e);
});

var client = new Twitter(config);

var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  } else {
    console.log("error");
  }
});
