const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const env = require("node-env-file");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo")(session);
const moment = require('moment');
const cors = require('cors')
module.exports = function (mongoose) {
  env("./.env");

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(bodyParser.json());

  app.use('/public', express.static('public'));
  app.get("/layouts/", function (req, res) {
    res.render("view", { extractScripts: true });
  });

  var expressLayouts = require("express-ejs-layouts");
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "ejs");
  app.use(expressLayouts);

  var main_config = require('./config/main')(process.env.PORT);
  app.locals = main_config;
  global.base_url = process.env.BASE_URL;
  global.auth_base_url = process.env.BASE_URL+'';
  global.admin_base_url = process.env.BASE_URL+'admin/';
  global.locals = main_config;
  global.moment = moment;
  global.__dirname = __dirname;
  global.__lang_path = __dirname + "/" + 'language/';
  global.trans = require('./helpers/LanguageHelper');

  var dd = (new Date());
  var cookieTime = dd.getTime() + (60 * 10e8);
  var session_obj = {
    secret: "Lantau",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { expires: new Date(cookieTime), maxAge: cookieTime },
  };
  app.use(session(session_obj));

  app.use(function (req, res, next) {
    global.currentLang = (req.headers.lang == undefined || req.headers.lang == '') ? 'en' : req.headers.lang;
   if (typeof req.session.user != "undefined" && req.session.user._id) {
      res.locals.user = req.session.user;
    }
    next();
  });

  app.use(cors());
  app.use(function (req, res, next) {
    const allowedOrigins = ['*'];
    req.headers.lng_code = (req.headers.lang == undefined || req.headers.lang == '') ? 'en' : req.headers.lang;
    if (typeof req.session.user != "undefined" && req.session.user._id) {
      res.locals.user = req.session.user;
    }
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    // Website you wish to allow to connect
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

  return app;
};
