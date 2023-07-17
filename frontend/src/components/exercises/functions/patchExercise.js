const patchExercises = async (exerciseTitle, group ,exerciseBody, id) => {
    
    const exerciseName = exerciseTitle
    const muscleGroup = group
    const exerciseDescription = exerciseBody
    const exerciseID = id
    
    const res = await fetch('http://localhost:8080/exercises', {
        method: 'PATCH',
        credentials: 'include',
        body: JSON.stringify({exerciseName, muscleGroup, exerciseDescription, exerciseID}),
        headers: {
            'content-type': 'application/json'
        }
    })
    const data = await res.text()
    console.log(data)
}
    
export default patchExercises
