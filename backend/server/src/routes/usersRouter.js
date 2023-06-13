const { getAllUsers } = require('../controllers/users/getAllUsers');
const { checkAuthentication } = require('../middleware/middleware');
const usersRouter = require('express').Router();

usersRouter.use(checkAuthentication);

usersRouter.get('/', getAllUsers);

exports.usersRouter = usersRouter;