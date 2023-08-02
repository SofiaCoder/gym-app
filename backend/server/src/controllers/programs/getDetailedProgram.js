const main = require('../../database');
const { ObjectId } = require('mongodb');

exports.getDetailedPrograms = async function getDetailedPrograms(req, res) {
  try {
    const userID = req.userID;

    const { programCollection, exerciseCollection } = await main();

    const programs = await programCollection
      .find(
        { user_id: userID },
        { projection: { programName: 1, exercises: 1 } }
      )
      .toArray();

    if (programs.length === 0) {
      return res.status(404).send('There is no programs');
    }

    let exerciseInfo = [];
    const exercisesInProgram = programs.map((program) => program.exercises);
    const exerciseIds = exercisesInProgram
      .flat()
      .map((exercise) => exercise.exercise_id);
    for (const exercise of exerciseIds) {
      const fetchedExercise = await exerciseCollection
        .find(
          { _id: exercise },
          {
            projection: {
              exerciseName: 1,
              muscleGroup: 1,
              exerciseDescription: 1,
            },
          }
        )
        .toArray();
      exerciseInfo.push(fetchedExercise);
    }

    exerciseInfo = exerciseInfo.flat();
    const flattenedExerciseInProgram = exercisesInProgram.flat();

    const detailedPrograms = flattenedExerciseInProgram.map((exercise1) => {
      const matchingExercises = exerciseInfo.find(
        (exercise2) => exercise1.exercise_id.toString() === exercise2._id.toString()
      );
      if (matchingExercises) {
        return { ...exercise1, ...matchingExercises };
      }
      return exercise1;
    });

    if (detailedPrograms.length === 0) {
      res.status(404).send('There is no programs');
    } else {
      res.status(200).json(detailedPrograms);
    }
  } catch (err) {
    res.status(500).send(`Internal server error - ${err}`);
  }
};
