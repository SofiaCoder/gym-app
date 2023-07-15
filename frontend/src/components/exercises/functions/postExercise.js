const postExercise = async (exercise, group) => {
    const exerciseName = exercise
    const muscleGroup = group
    

    const res = await fetch('http://localhost:8080/exercises', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({exerciseName, muscleGroup}),
        headers: {
            'content-type': 'application/json'
        }
    })
    const data = await res.text()
    return data
}

export { postExercise }