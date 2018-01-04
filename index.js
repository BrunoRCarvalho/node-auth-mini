const express = require('express');
const session = require('express-session');

const passport = require('passport')
const strategy = require('./strategy')

const app = express();

app.use( session({
  secret: 'sup dude',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(strategy);

passport.serializeUser(function(user, done) {
  return done(null, user)
})

passport.deserializeUser(function(user, done) {
  return done(null, user)
})

app.get('/login', passport.authenticate('auth0', {
  successRedirect: '/me',
  failureRedirect: '/login',
  failureFlash: true
}))

app.get('/me', function(req, res) {
  if(req.user) {
    return res.json(req.user)
  } else {
    return res.redirect('/login')
  }
})


const port = 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}`); } );