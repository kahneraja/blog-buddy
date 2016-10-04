var http = require('http');

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
