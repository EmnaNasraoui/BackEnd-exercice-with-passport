const router = require('express').Router()
var bcrypt = require('bcrypt-nodejs');
var User = require('./../models/user')

var jwt = require('jsonwebtoken');

//Register

router.post('/register', async (req, res) => {
  let lvl = 0;
  const number = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
  const majus = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const min = "abcdefghijklmnopqrstuvwxyz";
  let password = req.body.Password

  if (password.length >= 8 && password.length <= 20) {
    for (let i = 0; i < password.length; i++) {
      const element = password[i];
      if (number.includes(element)) {
        lvl++;
        break;
      }
    }
    for (let i = 0; i < password.length; i++) {
      const element = password[i];
      if (majus.includes(element)) {
        lvl++;
        break;
      }
    }
    for (let i = 0; i < password.length; i++) {
      const element = password[i];
      if (min.includes(element)) {
        lvl++;
        break;
      }
    }
    level = (lvl == 1) ? "easy" : (lvl == 2) ? "Soft" : (lvl == 3) ? "Hard" : "";
    console.log(level)
    
      let user = new User(req.body);
      const result2 = await User.create(user).catch(err => err)
      res.send({ result2 })
  }

  else {
    level = "Your password must contain at least 8 characters and less then 20";
    res.send(level)

  }
})
router.post('/login', async (req, res) => {

  let Email = req.body.Email;
  let password = req.body.Password
  console.log(Email, password)
  const result = await User.findOne({ Email: Email })
  console.log(result);
  if (result && bcrypt.compareSync(password, result.Password)) {
    const token = jwt.sign({ id: result }, 'user');
    res.send({ lvl: 'Your connexion is valide', token: token });
  }
  else {
    res.send({ lvl: ' Please verify your Email or Password ' });
  };

})

module.exports = router