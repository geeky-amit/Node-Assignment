var http = require("http");
const url = require("url");
const httpServer = http.createServer(handleServer);

function handleServer(req, res) {
  const { path } = url.parse(req.url);

  if (path === "/welcome") {
    res.writeHead(200).end("Welcome to Dominos!");
  } else if (path === "/contact") {
    res.writeHead(200, { "content-type": "application/json" }).end(
      JSON.stringify({
        phone: "18602100000",
        email: "guestcaredominos@jublfood.com"
      })
    );
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("route not found");
  }
}

httpServer.listen(8081, () => {
  console.log("server started on port 8081");
});

module.exports = httpServer;
