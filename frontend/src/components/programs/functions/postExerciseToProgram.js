const postExerciseToProgram = async (programId, exerciseId, reps, sets, weight, rpe) => {
  programId = programId.toString()
  const repNum = reps;
  const setNum = sets;
  const weightNum = weight;
  const rpeNum = rpe;

  const res = await fetch('http://localhost:8080/programs/exercises', {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify({programId, exerciseId, repNum, setNum, weightNum, rpeNum}),
      headers: {
          'content-type': 'application/json'
      }
  })
  const data = await res.text()
  return data
}

export { postExerciseToProgram }
