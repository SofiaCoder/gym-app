const main = require('../../database');
const joi = require('joi');

const validMuscleGroups = [
  'shoulders',
  'chest',
  'arms',
  'abs',
  'back',
  'legs',
  'cardio',
];

const schema = joi.object({
  exerciseName: joi.string().min(1).required(),
  muscleGroup: joi
    .string()
    .valid(...validMuscleGroups)
    .required(),
  exerciseDescription: joi.string().optional().allow('')
});

exports.addExercise = async function addExercise(req, res) {
  try {
    const { exerciseCollection } = await main();
    const { exerciseName, muscleGroup, exerciseDescription } = req.body;

    const exerciseBody = {
      exerciseName: exerciseName.toLowerCase(),
      muscleGroup: muscleGroup.toLowerCase(),
      exerciseDescription: exerciseDescription || '',
    };

    const { error } = schema.validate(exerciseBody);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const existingExercise = await exerciseCollection.findOne({
      exerciseName: exerciseBody.exerciseName,
    });
    if (existingExercise) {
      return res.status(400).send('Exercise already exists in the database');
    }

    await exerciseCollection.insertOne(exerciseBody);
    res.status(201).send(`${exerciseName} added`);
  } catch (err) {
    res.status(500).send(`Internal server error - ${err}`);
  }
};
