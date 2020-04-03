// Express requirements
import bodyParser from "body-parser";
import compression from "compression";
import proxy from "http-proxy-middleware";
import express from "express";
import path from "path";
import Loadable from "react-loadable";
import cookieParser from "cookie-parser";

import http from "http";
import https from "https";
import fs from "fs";

// Our loader - this basically acts as the entry point for each page load
import loader from "./loader";

// Create our express app using the port optionally specified
const app = express();
const PORT = process.env.PORT || 443;

app.use("/api/*", proxy({target: "https://www.sitaratas.eu:5000", changeOrigin: true}));

// Compress, parse, log, and raid the cookie jar
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set up homepage, static assets, and capture everything else
app.use(express.Router().get("/", loader));
app.use(express.static(path.resolve(__dirname, "../build")));
app.use(loader);

// We tell React Loadable to load all required assets and start listening - ROCK AND ROLL!
Loadable.preloadAll().then(() => {

  if (process.env.NODE_ENV === "production") {

    const server = https.createServer({
      key: fs.readFileSync("/etc/letsencrypt/live/sitaratas.eu/privkey.pem", "utf8"),
      cert: fs.readFileSync("/etc/letsencrypt/live/sitaratas.eu/cert.pem", "utf8"),
      ca: fs.readFileSync("/etc/letsencrypt/live/sitaratas.eu/chain.pem", "utf8")
    }, app);

    server.listen(PORT, function() {
      console.log("Listening to port:", PORT);
    }); 

    http.createServer(function (req, res) {
      res.writeHead(301, { "Location": "https://" + req.headers["host"] + req.url });
      res.end();
    }).listen(80);

  } else {
    app.listen(3333, function() {
      console.log("Listening to port:", 3333);
    }); 
  }

});

// Handle the bugs somehow
app.on("error", error => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof PORT === "string" ? "Pipe " + PORT : "Port " + PORT;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
});