const express = require("express");
const path = require("path");
const favicon = require("static-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const env = require("dotenv").load();
const fileUpload = require("express-fileupload");

const api_routes = require("./api_server/routes/api");
const api_cable = require("./api_server/routes/api_cable");
const api_crosver = require("./api_server/routes/api_crosver");
const api_presence = require("./api_server/routes/api_presence");
const api_converter = require("./api_server/routes/equipment/api_converter");
const api_sfp = require("./api_server/routes/equipment/api_sfp");
const api_battery = require("./api_server/routes/equipment/api_battery");
const api_systemPower = require("./api_server/routes/equipment/api_systemPower");

var app = express();

var passport = require("passport");
var session = require("express-session");

var models = require("./api_server/models/sql_index"); // Модели баз данных
var User = models.User;

require("./config/passport/passport.js")(passport, User);

// view engine setup
app.set("views", path.join(__dirname, "app_server", "views"));
app.set("view engine", "ejs");
app.locals.moment = require("moment"); // library to convert date and time to normal form

app.use(favicon());
app.use(logger("dev"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use(express.static(path.join(__dirname, "public"))); // статические файлы
app.use(flash());

app.use(fileUpload()); // загрузка файлов на сервер

// app.get('/logout', function(){
//   req.session.destroy(function(err) {
//       res.redirect('/');
//   });
// });

app.use("/api", api_routes);
app.use("/api/cable", api_cable);
app.use("/api/crosver", api_crosver);
app.use("/api/presence", api_presence);
app.use("/api/equipment/Converter", api_converter);
app.use("/api/equipment/Sfp", api_sfp);
app.use("/api/equipment/Battery", api_battery);
app.use("/api/equipment/SystemPower", api_systemPower);

/// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {},
  });
});

module.exports = app;
