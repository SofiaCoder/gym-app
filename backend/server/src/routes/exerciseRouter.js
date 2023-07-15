const exerciseRouter = require('express').Router();
const { addExercise } = require('../controllers/exercises/addExercises');
const { getAllExercises } = require('../controllers/exercises/getAllExercises');

exerciseRouter.get('/', getAllExercises);
exerciseRouter.post('/', addExercise);

exports.exerciseRouter = exerciseRouter;
