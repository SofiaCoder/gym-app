const deleteProgram = async (id) => {
  const programId = id
  
  const res = await fetch('http://localhost:8080/programs', {
      method: 'DELETE',
      credentials: 'include',
      body: JSON.stringify({programId}),
      headers: {
          'content-type': 'application/json'
      }
  })
  const data = await res.text()
  return data
}

export default deleteProgram