const exerciseRouter = require('express').Router();
const { addExercise } = require('../controllers/exercises/addExercises');
const { deleteExercise } = require('../controllers/exercises/deleteExercise');
const { editExercise } = require('../controllers/exercises/editExercise');
const { getAllExercises } = require('../controllers/exercises/getAllExercises');

exerciseRouter.get('/', getAllExercises);
exerciseRouter.post('/', addExercise);
exerciseRouter.patch('/', editExercise);
exerciseRouter.delete('/', deleteExercise);

exports.exerciseRouter = exerciseRouter;
