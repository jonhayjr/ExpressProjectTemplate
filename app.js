const express = require('express');
const path = require('path');
const logger = require('morgan');
const app = express();
const routes = require('./routes/index');
const port = process.env.PORT || 3000;

//View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Set path for static files
app.use('/static', express.static('public'));

//Logs request to console
//app.use(logger('dev'));

//Use routes
app.use('/', routes);

//Handle 404 error
app.use((req,res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  err.message = 'Page Not Found';
  res.render('404', {err});
});

//Global error handler
app.use((err, req, res, next) => {
  err.status = err.status || 500;
  err.message = err.message || 'Oops, something went wrong!';
  
  console.log(`${err.status} - ${err.message}`);
  
  if (err.status === 404) {
    res.render('404', {err});
  } else {
    res.render('error', {err});
  }

});

//Listen on port 3000 by default
app.listen(port, () => {
  console.log(`Server listening on port ${port}!`)
});