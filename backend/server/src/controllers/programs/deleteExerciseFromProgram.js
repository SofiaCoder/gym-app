const joi = require("joi");
const main = require('../../database');
const { ObjectId } = require("mongodb");

const schema = joi.object({
  programId: joi.string().required(),
  exerciseIndex: joi.number().required()
})

exports.deleteExerciseFromProgram = async function deleteExerciseFromProgram(req, res) {
  try {
    const { programCollection } = await main();

    const { value, error } = schema.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message)
    }

    const programId = new ObjectId(value.programId)
    const { exerciseIndex } = value;

    const program = await programCollection.find({ _id: programId },
      { projection: { programName: 1, exercises: 1 } })
      .toArray()
    if (program.length === 0) {
      return res.status(404).send('No program found')
    }
    
    program[0].exercises.splice(exerciseIndex, 1)

    const response = await programCollection.updateOne({ _id: programId }, { $set: { exercises: program[0].exercises } })

    if (response.modifiedCount === 0) {
      return res.status(500).send('Internal Server Error - No changes were made')
    }

    res.status(200).send('Exercise deleted from program')
  } catch (err){
  res.status(500).send(`Internal server error - ${err}`);
  }
}

