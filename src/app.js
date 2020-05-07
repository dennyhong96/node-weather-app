const path = require("path"); // for access to abs path for public folder
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// express is a funciton
const app = express();

// define paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static dir to serve
app.use(express.static(publicDirPath));

// homepage route handler
app.get("/", (req, res) => {
  // handle hbs views, pass in dynamic vars
  res.render("index", {
    title: "Weather App",
    name: "Haiyang Hong",
  });
});

// homepage/about route handler
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Haiyang Hong",
  });
});

// homepage/help route handler
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "Need help? Please call (800) 000-0000",
    name: "Haiyang Hong",
  });
});

// homepage/weather route handler --- JSON HTTP Endpoint
app.get("/weather", (req, res) => {
  // req.query: object parsed from query string key value pairs
  if (!req.query.address) {
    // use return to enforce only response once, can also use else
    return res.send({
      error: "You must provide an address.",
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term.",
    });
  }
  res.send({
    products: [],
  });
});

// help 404 handler
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMsg: "Help article not found.",
    name: "Haiyang Hong",
  });
});

// 404 handler, wildcard * : match route that hasn't been matched so far
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMsg: "Page not found.",
    name: "Haiyang Hong",
  });
});

// spin up the server
app.listen(3000, () => {
  console.log("Server is up and running on port 3000.");
});
