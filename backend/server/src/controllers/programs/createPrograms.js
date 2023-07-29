const { ObjectId } = require('mongodb');
const main = require('../../database');
const joi = require('joi');

const schema = joi.object({
  programName: joi.string()
});

exports.createPrograms = async function createPrograms(req, res) {
  try {
    const { programCollection } = await main();

    userId = req.userID;
    const { value, error } = schema.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const { programName } = value;

    const programBody = {
      user_id: userId,
      programName: programName.toLowerCase(),
      exercises: []
    };

    await programCollection.insertOne(programBody);
    res.status(201).send(`${programName} added`);
  } catch (err) {
    res.status(500).send(`Internal server error - ${err}`);
  }
};
