//const express = require('express');
const passport = require('passport');


// middleware/auth.js
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.status(401).send('Unauthorized');
    }
  }
  
  module.exports = { ensureAuthenticated };