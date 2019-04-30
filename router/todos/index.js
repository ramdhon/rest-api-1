const express = require('express');
const router = express.Router();
const TodoController = require('../../controllers/todo');

const Authenticate = require('../../middlewares/authenticate');
const AuthorizeAuthUser = require('../../middlewares/authorizeAuthUser');

router.use(Authenticate)

router.get('/', TodoController.findAll);
router.post('/', TodoController.create);
router.get('/:id', AuthorizeAuthUser, TodoController.findOne);
router.put('/:id', AuthorizeAuthUser, TodoController.update);
router.patch('/:id', AuthorizeAuthUser, TodoController.update);
router.delete('/:id', AuthorizeAuthUser, TodoController.delete);


module.exports = router;