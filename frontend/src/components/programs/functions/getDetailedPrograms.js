const getDetailedPrograms = async (programID) => {
  const res = await fetch(`http://localhost:8080/programs/detailed/${programID}`, {
    credentials: 'include',
  });
  if (res.status === 404) {
    return []
  }

  return await res.json();
};

export { getDetailedPrograms };