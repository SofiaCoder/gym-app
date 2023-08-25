const programRouter = require('express').Router();
const { addExercisesToProgram } = require('../controllers/programs/addExercisesToProgram');
const { createPrograms } = require('../controllers/programs/createPrograms');
const { deleteExerciseFromProgram } = require('../controllers/programs/deleteExerciseFromProgram');
const { deleteProgram } = require('../controllers/programs/deletePrograms');
const { editProgram } = require('../controllers/programs/editProgram');
const { getDetailedPrograms } = require('../controllers/programs/getDetailedProgram');
const { getUsersPrograms } = require('../controllers/programs/getUsersPrograms');
const { checkAuthentication } = require('../middleware/middleware');

programRouter.use(checkAuthentication);

programRouter.get('/', getUsersPrograms);
programRouter.get('/detailed/:programID', getDetailedPrograms);
programRouter.post('/', createPrograms);
programRouter.patch('/exercises', addExercisesToProgram);
programRouter.patch('/', editProgram);
programRouter.delete('/', deleteProgram);
programRouter.delete('/exercise', deleteExerciseFromProgram);

exports.programRouter = programRouter;