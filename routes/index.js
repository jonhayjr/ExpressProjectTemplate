//Require express
const express = require('express');

const router = express.Router();

//Get index route
router.get('/', (req, res, next) => {
  res.render('index');
});

//Get about route
router.get('/about', (req, res, next) => {
  res.render('about');
});

//Get error route
router.get('/error', (req, res, next) => {
  const err = new Error();
  err.status = 500;
  err.message = 'Oops, something went wrong!';
  next(err);
})

module.exports = router;