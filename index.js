const express = require('express');
const app = express();

app.set('view engine', 'pug');

app.use('/static', express.static('public'));

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/about', (req, res, next) => {
  res.render('about');
});

app.get('/error', (req, res, next) => {
  const err = new Error();
  err.status = 500;
  err.message = 'Oops, something went wrong!';
  //res.render('error', {err});
  next({err});
})

app.use((req,res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  err.message = 'Page Not Found';
  //res.render('404', {err});
  next({err});
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  err.status = err.status || 500;
  err.message = err.message || 'Oops, something went wrong!';
  
  console.log(`${err.status} - ${err.message}`);
  
  if (err.status === 404) {
    res.render('404', {err});
  } else {
    res.render('error', {err});
  }

});


app.listen(3001, () => {
  console.log('Server listening on port 3001.')
});