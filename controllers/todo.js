const { User, Todo } = require('../models'); 

class Controller {
  static findAll(req, res) {
    Todo
      .findAll({
        include: [User],
        where: {
          UserId: req.decoded.id
        }
      })
      .then(todos => {
        if (todos.length === 0) {
          res.status(200).json({ message: 'data empty', todos })
        } else {
          res.status(200).json({ message: 'data found', todos })         
        }
      })
  }

  static create(req, res) {
    const { title, description } = req.body;
    Todo
      .create({
        title,
        description,
        UserId: req.decoded.id
      })
      .then(newTodo => {
        res.status(201).json({ message: 'data created', newTodo })
      })
      .catch(err => {
        console.log(err);
      })
  }

  static findOne(req, res) {
    Todo
      .findByPk(req.params.id, {
        include: [User],
      })
      .then(todo => {
        if (!todo) {
          res.status(404).json({ message: 'data not found', todo})
        } else {
          res.status(200).json({ message: 'data found', todo})
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  static update(req, res) {
    Todo
      .findByPk(req.params.id, {
        include: [User],
      })
      .then(todo => {
        if (!todo) {
          res.status(404).json({ message: 'data not found', todo})
        } else {
          res.status(200).json({ message: 'data found', todo})
        }
      })
      .catch(err => {
        console.log(err);
      })
  }
  static delete(req, res) {
    
  }
}


module.exports = Controller;
