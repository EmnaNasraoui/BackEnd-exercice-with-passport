const router = require('express').Router()
const passport = require("passport");
const BearerStrategy = require("passport-http-bearer");
const jwt = require('jsonwebtoken')
var User = require('../models/user');


passport.use(new BearerStrategy(
 
  function(token, done) {
    jwt.verify(token,'user', function(err,decoded){
      
    console.log(decoded);
      if(err){
          return done(err);
      }
      if(decoded){
        User.findOne({ _id: decoded.id._id }, function (err, user) {
          if (err) { return done(err); }
          if (!user) { return done(null, false); }
          return done(null, true);
        });
      }
  })

  }
));

router.get('/allUsers', passport.authenticate('bearer', { session: false }), async (req, res) => {
    const result = await User.find().exec().catch(err => err)
    res.send({ msg: 'OK', data: result })
});

module.exports = router