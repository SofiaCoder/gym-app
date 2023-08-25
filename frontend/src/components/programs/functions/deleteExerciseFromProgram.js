const deleteExerciseFromProgram = async (programId, exerciseIndex) => {
  
  const res = await fetch('http://localhost:8080/programs/exercise', {
      method: 'DELETE',
      credentials: 'include',
      body: JSON.stringify({programId, exerciseIndex}),
      headers: {
          'content-type': 'application/json'
      }
  })
  const data = await res.text()
  return data
}

export default deleteExerciseFromProgram