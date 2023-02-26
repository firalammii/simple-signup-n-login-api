const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const mongoose = require('mongoose'); /************************************ */
const cors = require('cors');

const usersRouter = require('./routes/users');
const indexRouter = require('./routes/index');
const personRouter = require('./routes/person');/************************************ */

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors()); /******************************* */

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/api', personRouter); /******************************* */

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const db_CONNECTION_URL = "mongodb+srv://firalammii:firalammii123@cluster0.mjangv8.mongodb.net/?retryWrites=true&w=majority";
// const db_CONNECTION_URL = 'mongodb://localhost/dms_db';
//const PORT = process.env.PORT || 3000
mongoose.connect(db_CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('db is connected....'))
  .catch((err) => console.log(err));



module.exports = app;
