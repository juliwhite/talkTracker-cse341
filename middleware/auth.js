//const express = require('express');
const passport = require('passport');


// middleware/auth.js
function ensureAuthenticated(req, res, next) {
    if (req.user) {
      return next();
    }
    res.status(401).json({ message: 'Unauthorized access. Please log in.' });
  }
  
  module.exports = { ensureAuthenticated };