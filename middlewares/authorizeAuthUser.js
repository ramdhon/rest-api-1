const { Todo } = require('../models');

module.exports = (req, res, next) => {
  Todo.findByPk(req.params.id)
    .then(todo => {
      if (!todo) {
        res.status(404).json({ message: 'not found to authorize', todo });
      } else {
        if (todo.UserId != req.decoded.id) {
          res.status(401).json({ message: 'unauthorized to access'});
        } else {
          req.todo = todo;
          next();
        }
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'internal server error', err });
    })
}