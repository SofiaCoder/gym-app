const getDetailedPrograms = async (programID) => {
  const res = await fetch(`http://localhost:8080/programs/detailed/${programID}`, {
    credentials: 'include',
  });
  if (res.status === 401) {
    return res.status;
  }
  const data = await res.json();
  return data;
};

export { getDetailedPrograms };