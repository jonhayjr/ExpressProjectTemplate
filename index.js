//Require express
const express = require('express');

//Express App
const app = express();

//Configure pug
app.set('view engine', 'pug');

//Set path for static files
app.use('/static', express.static('public'));

//Get index route
app.get('/', (req, res, next) => {
  res.render('index');
});

//Get about route
app.get('/about', (req, res, next) => {
  res.render('about');
});

//Get error route
app.get('/error', (req, res, next) => {
  const err = new Error();
  err.status = 500;
  err.message = 'Oops, something went wrong!';
  next(err);
})

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

//Listen on port 3001
app.listen(3001, () => {
  console.log('Server listening on port 3001.')
});