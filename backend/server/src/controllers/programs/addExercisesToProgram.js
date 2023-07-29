const { ObjectId } = require('mongodb');
const main = require('../../database');
const joi = require('joi');

const schema = joi.object({
  programId: joi.string(),
  exerciseToInsert: joi.object({
    exerciseId: joi.string(),
    repNum: joi.number(),
    setNum: joi.number(),
    weightNum: joi.number(),
    rpeNum: joi.number(),
  }),
});

exports.addExercisesToProgram = async function addExercisesToProgram(req, res) {
  try {
    const { programCollection } = await main();

    const { value, error } = schema.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const { programId, exerciseToInsert } = value;

    const { exerciseId, repNum, setNum, weightNum, rpeNum } = exerciseToInsert;

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
