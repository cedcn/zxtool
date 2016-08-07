const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const debug = require('debug')('zxtool:db');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const bodyParser = require('body-parser');
const morgan = require('morgan');
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' });

const { authUser } = require('./middlewares/auth');
// connect db
const mongoose = require('mongoose');
global.db = mongoose.connect('mongodb://localhost/zxtool');
db.connection.on('open', () => {
  debug('---Connect mongodb success！----');
});
db.connection.on('error', error => {
  debug(`Connect mongodb failure：${error}`);
});

// routers
const routes = require('./routers/index');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// logger
app.use(morgan('dev', { stream: accessLogStream }));

// parse application/json
app.use(bodyParser.json());

// static directory
app.use(express.static(path.join(__dirname, 'public')));

// parse cookie
app.use(cookieParser());

app.use(session({
  secret: 'cedcn zxtool',
  resave: false,
  store: new RedisStore({
    port: 6379,
    host: '127.0.0.1',
    db: 0,
    pass: '',
    logErrors: true,
  }),
  saveUninitialized: false,
  cookise: { maxAge: 60000 },
}));

app.use(authUser());

app.use('/', routes);

module.exports = app;