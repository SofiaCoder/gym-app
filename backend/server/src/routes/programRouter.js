const programRouter = require('express').Router();
const { addExercisesToProgram } = require('../controllers/programs/addExercisesToProgram');
const { createPrograms } = require('../controllers/programs/createPrograms');
const { getDetailedPrograms } = require('../controllers/programs/getDetailedProgram');
const { getUsersPrograms } = require('../controllers/programs/getUsersPrograms');
const { checkAuthentication } = require('../middleware/middleware');

programRouter.use(checkAuthentication);

programRouter.get('/', getUsersPrograms);
programRouter.get('/detailed/:programID', getDetailedPrograms);
programRouter.post('/', createPrograms);
programRouter.patch('/', addExercisesToProgram);

exports.programRouter = programRouter;