const getExerciseById = async (exerciseId) => {
  const res = await fetch(`http://localhost:8080/exercises/byId/${exerciseId}`, {
    credentials: 'include',
  });
  if (res.status === 401) {
    return res.status;
  }
  const data = await res.json();
  return data;
};

export { getExerciseById };
