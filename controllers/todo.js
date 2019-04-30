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
          res.status(200).json({ message: 'data empty', todos });
        } else {
          res.status(200).json({ message: 'data found', todos });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'internal server error', err });
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
        res.status(201).json({ message: 'data created', newTodo });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'internal server error', err });
      })
  }

  static findOne(req, res) {
    res.status(200).json({ message: 'data found', todo: req.todo});
  }

  static update(req, res) {
    const { title, description } = req.body;
    let updatedTodo = req.todo;
    updatedTodo.title = title || updatedTodo.title;
    updatedTodo.description = description || updatedTodo.description;
    req.todo.update({
        title: title || updatedTodo.title,
        description: description || updatedTodo.description
      })
      .then(info => {
        res.status(200).json({ message: 'data updated', updatedTodo, info });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'internal server error', err });
      })
  }
  
  static delete(req, res) {
    let deletedTodo = req.todo;
    req.todo.destroy()
      .then(info => {
        res.status(200).json({ message: 'data deleted', deletedTodo, info });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'internal server error', err });
      })
  }
}


module.exports = Controller;
