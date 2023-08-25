const patchProgram = async (programTitle, id, exercises) => {
    
  const programName = programTitle
  const programId = id
  
  const res = await fetch('http://localhost:8080/programs', {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify({programId, programName, exercises }),
      headers: {
          'content-type': 'application/json'
      }
  })
  const data = await res.text()
  console.log(data)
}
  
export default patchProgram
