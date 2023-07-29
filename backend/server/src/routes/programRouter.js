const programRouter = require('express').Router();
const { addExercisesToProgram } = require('../controllers/programs/addExercisesToProgram');
const { createPrograms } = require('../controllers/programs/createPrograms');
const { getUsersPrograms } = require('../controllers/programs/getUsersPrograms');
const { checkAuthentication } = require('../middleware/middleware');

programRouter.use(checkAuthentication);

programRouter.get('/', getUsersPrograms);
programRouter.post('/', createPrograms);
programRouter.patch('/', addExercisesToProgram);

exports.programRouter = programRouter;