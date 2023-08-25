const main = require('../../database');
const { ObjectId } = require('mongodb');
const joi = require('joi');

const schema = joi.object({
  programID: joi.string(),
});

exports.deleteProgram = async function deleteProgram(req, res) {
  try {
    const { programCollection } = await main();

    const { value, error } = schema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const { programID } = value;
    const programIDtoDelete = new ObjectId(programID);

    const result = await programCollection.deleteOne({
      _id: programIDtoDelete,
    });
    if (result.deletedCount === 1) {
      res.status(200).send('Program successfully deleted');
    } else {
      res
        .status(404)
        .send(`Query didn't match any document. 0 document deleted.`);
    }
  } catch (error) {
    return res.status(500).send(`Internal server error - ${error}`);
  }
};
