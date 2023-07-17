const main = require('../../database');
const { ObjectId } = require('mongodb');
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
  exerciseID: joi.string().required(),
  exerciseName: joi.string().min(1).required(),
  muscleGroup: joi
    .string()
    .valid(...validMuscleGroups)
    .required(),
  exerciseDescription: joi.string().optional().allow(''),
});

exports.editExercise = async function editExercise(req, res) {
  try {
    const { exerciseCollection } = await main();
    const { exerciseID, exerciseName, muscleGroup, exerciseDescription } =
      req.body;

    const exerciseBody = {
      exerciseID: exerciseID,
      exerciseName: exerciseName.toLowerCase(),
      muscleGroup: muscleGroup.toLowerCase(),
      exerciseDescription: exerciseDescription || '',
    };
    const { error } = schema.validate(exerciseBody);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const idToPatch = new ObjectId(exerciseID);

    const result = await exerciseCollection.updateOne(
      { _id: idToPatch },
      {
        $set: {
          exerciseName: exerciseBody.exerciseName,
          muscleGroup: exerciseBody.muscleGroup,
          exerciseDescription,
        },
      }
    );
    if (result.modifiedCount === 0) {
      res.status(404).send(`No changes were made.`);
    } else {
      res.status(200).send(`Post updated`);
    }
  } catch (error) {
    res.status(500).send(`Internal server error - ${error}`);
  }
};
