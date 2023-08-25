const deleteExercises = async (id) => {
    const exerciseId = id
    
    const res = await fetch('http://localhost:8080/exercises', {
        method: 'DELETE',
        credentials: 'include',
        body: JSON.stringify({exerciseId}),
        headers: {
            'content-type': 'application/json'
        }
    })
    const data = await res.text()
    return data
}

export default deleteExercises