var express=require('express'),
kakuen=require('kakuen'),
server=express(),
cors = require('cors'),
proxy = require('express-http-proxy'),
moker = kakuen.createMocker('./mocks');


server.use(cors());
// proxy to graphql mocker, please start it before this
server.use('/graphql', proxy('localhost:8084', {
  proxyReqPathResolver: function(req) {
  	var url = require('url').parse(req.url).path;
    return url+'graphql';
  }
}));
server.use(moker);

server.listen(8003);