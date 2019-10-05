require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const passport = require('passport')
const session = require('express-session')
const cors = require('cors')
const passportSetup = require('./config/passport')

mongoose
  .connect(process.env.ATLAS_DB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

/////////////////////////
//CORS setup
app.use(cors({
  credentials: true,
  origin: [`http://localhost:${process.env.PORT}`]
}))

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 1000 * 60 * 24 },
  resave: true,
  saveUninitialized: true
}))

// Passport setup
app.use(passport.initialize())

// Passport session setup
app.use(passport.session())

///////////////////////////

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// default value for title local
// app.locals.title = 'Express - Generated with IronGenerator';

const authRoutes = require('./routes/auth-routes')
app.use('/api/auth', authRoutes)

const index = require('./routes/index');
app.use('/api', index);

const mailRoutes = require('./routes/mail-routes')
app.use('/api/mail', mailRoutes)

module.exports = app;
