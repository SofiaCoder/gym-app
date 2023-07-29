const getPrograms = async () => {
  const res = await fetch('http://localhost:8080/programs', {
    credentials: 'include',
  });
  if (res.status === 401) {
    return res.status;
  }
  const data = await res.json();
  return data;
};

export { getPrograms };
