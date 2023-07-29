const exerciseRouter = require('express').Router();
const { addExercise } = require('../controllers/exercises/addExercises');
const { deleteExercise } = require('../controllers/exercises/deleteExercise');
const { editExercise } = require('../controllers/exercises/editExercise');
const { getAllExercises } = require('../controllers/exercises/getAllExercises');
const { getExerciseById } = require('../controllers/exercises/getExerciseById');
const { checkAuthentication } = require('../middleware/middleware');

exerciseRouter.use(checkAuthentication);

exerciseRouter.get('/', getAllExercises);
exerciseRouter.get('/byId/:exerciseId', getExerciseById);
exerciseRouter.post('/', addExercise);
exerciseRouter.patch('/', editExercise);
exerciseRouter.delete('/', deleteExercise);

exports.exerciseRouter = exerciseRouter;
