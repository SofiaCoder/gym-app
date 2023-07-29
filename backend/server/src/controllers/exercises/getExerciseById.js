const main = require('../../database');
const { ObjectId } = require('mongodb')

exports.getExerciseById = async function getExerciseById(req, res) {
  try {
    const exerciseId = await req.params.exerciseId;
    const { exerciseCollection } = await main();

    const exercise = await exerciseCollection
      .find({ _id: new ObjectId(exerciseId) }, { projection: { exerciseName: 1, muscleGroup: 1, exerciseDescription: 1 } })
      .toArray();
    if (exercise.length === 0) {
      res.status(404).send('There is no exercise with this id');
    } else {
      res.status(200).json(exercise);
    }
  } catch (err) {
    res.status(500).send(`Internal server error - ${err}`);
  }
};