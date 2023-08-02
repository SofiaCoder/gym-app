const main = require('../../database');
const { ObjectId } = require('mongodb');

exports.getUsersPrograms = async function getUsersPrograms(req, res) {
  try {
    const userID = req.userID;

    const { programCollection } = await main();

    const programs = await programCollection
      .find(
        { user_id: userID },
        { projection: { programName: 1, exercises: 1 } }
      )
      .toArray();

    if (programs.length === 0) {
      res.status(404).send('There is no programs');
    } else {
      res.status(200).json(programs);
    }
  } catch (err) {
    res.status(500).send(`Internal server error - ${err}`);
  }
};
