const { ObjectId } = require('mongodb');
const main = require('../../database');
const joi = require('joi');

const schema = joi.object({
  programId: joi.string().required(),
  exerciseId: joi.string().required(),
  repNum: joi.number().required(),
  setNum: joi.number().required(),
  weightNum: joi.number(),
  rpeNum: joi.number().required()
});

exports.addExercisesToProgram = async function addExercisesToProgram(req, res) {
  try {
    const { programCollection } = await main();

    const { value, error } = schema.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const { programId, exerciseId, repNum, setNum, weightNum, rpeNum} = value;

    const exerciseBody = {
      exercise_id: new ObjectId(exerciseId),
      reps: repNum,
      sets: setNum,
      weight: weightNum,
      RPE: rpeNum,
      E1RM: Math.round(((10 - rpeNum + repNum) * weightNum) / 30 + weightNum),
      totalWeight: repNum * setNum * weightNum
    };

    const programIdToInsert = new ObjectId(programId);

    await programCollection.updateOne(
      { _id: programIdToInsert },
      { $push: { exercises: exerciseBody } }
    );
    res.status(201).send(`Exercise added`);
  } catch (err) {
    res.status(500).send(`Internal server error - ${err}`);
  }
};
