

const createError    = require('http-errors');
const express        = require('express');
const path           = require('path');
const cookieParser   = require('cookie-parser');
const logger         = require('morgan');
const engine         = require('ejs-mate');
const mongoose       = require("mongoose");
const bodyParser     = require('body-parser');
const methodOverride = require('method-override')
const User           = require("./models/user")

const session               = require("express-session");
const passport              = require("passport");
const LocalStrategy         = require("passport-local");


const indexRouter = require('./routes/index');


const app = express();

mongoose.connect( process.env.DATABASE_URL,  { useNewUrlParser: true });
// mongoose.connect('mongodb://localhost/pencil',  { useNewUrlParser: true });

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
// use ejs-locals for all ejs templates:
app.engine('ejs', engine);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Passport config

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())


// middleware
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
})


// Routes
app.use('/', indexRouter);







// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
