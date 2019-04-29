const { User } = require('../models');
const bcrypt = require('../helpers/bcrypt');
const jwt = require('../helpers/jwt');

class Controller {
  static register(req, res) {
    const { name, username, password } = req.body;
    User
      .create({
        name,
        username,
        password
      })
      .then(newUser => {
        res.status(201).json({ message: 'data created', newUser });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'internal server error', err });
      })
  }

  static login(req, res) {
    const { username, password } = req.body;
    User
      .findOne({
        where: {
          username: username
        }
      })
      .then(foundUser => {
        if (!foundUser) {
          res.status(400).json({ message: 'incorrect username / password' })
        } else {
          let valid = bcrypt.compare(password, foundUser.password);
          if (!valid) {
            res.status(400).json({ message: 'incorrect username / password' })
          } else {
            let token = jwt.sign({
              id: foundUser.id,
              name: foundUser.name,
              username: foundUser.username
            })
            res.status(200).json({ message: 'login success', token });
          }
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'internal server error', err });
      })
  }
}


module.exports = Controller;