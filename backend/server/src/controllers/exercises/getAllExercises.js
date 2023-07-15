const main = require('../../database');

exports.getAllExercises = async function getAllExercises(req, res) {
  try {
    const { exerciseCollection } = await main();

    const exercises = await exerciseCollection
      .find({}, { projection: { _id: 0, exerciseName: 1, muscleGroup: 1, exerciseDescription: 1 } })
      .toArray();
    if (exercises.length === 0) {
      res.status(404).send('There is no exercises');
    } else {
      res.status(200).json(exercises);
    }
  } catch (err) {
    res.status(500).send(`Internal server error - ${err}`);
  }
};
