var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./db/db')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/product')
var categoryRouter = require('./routes/category')
var artisantRouter = require('./routes/artisant')
var marqueRouter = require('./routes/marque')
var collectionRouter = require('./routes/collection')
var adminRouter = require('./routes/admin')
const contactRouter = require('./routes/contact')
const articleRouter = require('./routes/article')
var cors = require('cors')
var app = express();

app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product',productRouter);
app.use('/category',categoryRouter);
app.use('/artisant', artisantRouter)
app.use('/marque',marqueRouter)
app.use('/collection',collectionRouter)
app.use('/admin',adminRouter)
app.use('/contact',contactRouter)
app.use('/article',articleRouter)
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
  res.json('error');
});
app.listen(3000)
module.exports = app;
