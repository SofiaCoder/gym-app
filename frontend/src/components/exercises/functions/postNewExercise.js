const postNewExercise = async (exercise, group, description) => {
    const exerciseName = exercise
    const muscleGroup = group
    const exerciseDescription = description
    

    const res = await fetch('http://localhost:8080/exercises', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({exerciseName, muscleGroup, exerciseDescription}),
        headers: {
            'content-type': 'application/json'
        }
    })
    const data = await res.text()
    return data
}

export { postNewExercise }