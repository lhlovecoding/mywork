var http = require("http");
var url = require("url");
var util = require("util");

function start(route) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    route(pathname);
    response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    // console.log(url.parse(request.url, true));
    console.log(url.parse(request.url, true).query.name, "****");
    response.end(util.inspect(url.parse(request.url, true)));
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.http://localhost:8888/");
}

exports.start = start;
