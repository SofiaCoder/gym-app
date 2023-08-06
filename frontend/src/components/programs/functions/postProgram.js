const postProgram = async (name) => {
  const programName = name

  

  const res = await fetch('http://localhost:8080/programs', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({programName}),
      headers: {
          'content-type': 'application/json'
      }
  })
  const data = await res.text()
  return data
}

export { postProgram }