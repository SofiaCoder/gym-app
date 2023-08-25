const { ObjectId } = require('mongodb');
const main = require('../../database');
const joi = require('joi');

const schema = joi.object({
  programId: joi.string().required(),
  programName: joi.string().required(),
  exercises: joi.array().required()
});

exports.editProgram = async function editProgram(req, res) {
  try {
    const { programCollection } = await main();

    userId = req.userID;
    const { value, error } = schema.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const { programId, programName, exercises } = value;

    const exerciseBody = exercises.map((exercise) => {
      return (
        {
          exercise_id: new ObjectId(exercise.exerciseId),
          reps: exercise.reps,
          sets: exercise.sets,
          weight: exercise.weight,
          RPE: exercise.RPE,
          E1RM: Math.round(((10 - exercise.RPE + exercise.reps) * exercise.weight) / 30 + exercise.weight),
          totalWeight: exercise.reps * exercise.sets * exercise.weight,
          exerciseName: exercise.exerciseName,
          muscleGroup: exercise.muscleGroup
        }
      )
    })

    const newName = programName.toLowerCase()
    const programIdToEdit = new ObjectId(programId)

    await programCollection.updateOne({ _id: programIdToEdit }, { $set: { programName: newName, exercises: exerciseBody } });
    res.status(201).send(`${programName} edited successfully`);
  } catch (err) {
    res.status(500).send(`Internal server error - ${err}`);
  }
};
