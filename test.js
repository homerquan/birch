var redis = require("redis"),
    client = redis.createClient();
 
// if you'd like to select database 3, instead of 0 (default), call 
// client.select(3, function() { /* ... */ }); 
 
client.on("error", function (err) {
    console.log("Error " + err);
});
 
client.hget("demo", "knowledge", redis.print);
