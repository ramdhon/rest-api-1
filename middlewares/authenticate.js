const jwt = require('../helpers/jwt');
const { User } = require('../models');

module.exports = (req, res, next) => {
  if (req.headers.hasOwnProperty('token')) {
    try {
      let decoded = jwt.verify(req.headers.token);
      User.findOne({
        where: {
          username: decoded.username
        }
      })
        .then(foundUser => {
          if (!foundUser) {
            res.status(400).json({ message: 'not recognized input data' });
          } else {
            req.decoded = decoded;
            next();
          }
        })
    } catch(err) {
      console.log(err);
      res.status(400).json({ message: 'invalid access token', err });
    }
  } else {
    res.status(400).json({ message: 'no token assigned' })
  }
}