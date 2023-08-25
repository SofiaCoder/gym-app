const main = require('../../database');
const { ObjectId } = require('mongodb');
const joi = require('joi');

const schema = joi.object({
  exerciseId: joi.string(),
});

exports.deleteExercise = async function deleteExercise(req, res) {
  try {
    const { exerciseCollection } = await main();

    const { value, error } = schema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const { exerciseId } = value;
    const exerciseIdToDelete = new ObjectId(exerciseId);

    const result = await exerciseCollection.deleteOne({
      _id: exerciseIdToDelete,
    });
    if (result.deletedCount === 1) {
      res.status(200).send('Exercise successfully deleted');
    } else {
      res
        .status(404)
        .send(`Query didn't match any document. 0 document deleted.`);
    }
  } catch (error) {
    return res.status(500).send(`Internal server error - ${error}`);
  }
};
