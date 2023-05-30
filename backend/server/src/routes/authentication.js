const authRouter = require('express').Router();
const { login } = require('../controllers/authControllers/login');
const { register } = require('../controllers/authControllers/register');

authRouter.post('/login', login);
authRouter.post('/register', register);

exports.authRouter = authRouter;
