var express = require('express');
var router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', function(req, res) {
  console.log('get /user route');
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('logged in', req.user);
    var userInfo = {
      id: req.user.id,
      username : req.user.username,
      income: req.user.income
    };
    res.send(userInfo);
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
});

// clear all server session information about this user
router.get('/logout', function(req, res) {
  // Use passport's built-in method to log out the user
  console.log('Logged out');
  req.logOut();
  res.sendStatus(200);
});

// POST Route to post income to users db
router.post('/', function (req, res){
  console.log('income in POST route', req.body);
  pool.connect(function(error, db, done) {
    if (error) {
      console.log(error);
      res.sendStatus(500);
      
    } else {
      var queryText = 'INSERT INTO "users" ("income") VALUES ($1);';
      db.query(queryText, [req.body.income], function (error, result){
        done();
        if (error) {
          console.log('Error making query', error);
          res.sendStatus(500);
          
        } else {
          res.sendStatus(201);
        }
      })
    }
  })
  
})

module.exports = router;
