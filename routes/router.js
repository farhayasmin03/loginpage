var express = require('express');
var router = express.Router();
var User = require('../models/user');



router.get('/', function (req, res) {
    res.render('index');

});
router.post('/', function (req, res) {
    if (req.body.password != req.body.confirmpassword) {
        var err = new Error('Passwords do not match.');
        err.status = 400;
        res.send("passwords dont match");
        return next(err);

    }
    if(req.body.email&&req.body.username&&req.body.password&&req.body.confirmpassword){
        var userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            passwordConf: req.body.passwordConf,
          }
    }
    User.create(userData, function (error, user) {
        if (error) {
          return next(error);
        } else {
          req.session.userId = user._id;
          
          return res.redirect('/');
        }
      });

});
router.get('/login', function (req, res) {
    res.render('login');

 });
 router.post('/login',function(req,res){
     if (req.body.email && req.body.password) {
        User.authenticate(req.body.email, req.body.password, function (error, user) {
          if (error || !user) {
            var err = new Error('Wrong email or password.');
            err.status = 401;
            return next(err);
          } else {
            req.session.userId = user._id;
            return res.send('login completed');
          }
        });
      } else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
      }
    });
    
 
 // GET for logout logout
router.get('/logout', function (req, res, next) {
    if (req.session) {
      // delete session object
      req.session.destroy(function (err) {
        if (err) {
          return next(err);
        } else {
          return res.send('logout page ');
        }
      });
    }
  });
module.exports = router;