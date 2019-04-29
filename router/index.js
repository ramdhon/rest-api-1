const express = require('express');
const router = express.Router();

const register = require('./register');
const login = require('./login');

const todos = require('./todos');

router.get('/', (req, res) => {
  res.json('masuk');
})
router.use('/register', register);
router.use('/login', login);

router.use('/todos', todos);


module.exports = router;