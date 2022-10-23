export const save = (data) => {
  const rawData = JSON.stringify(data);
  localStorage.setItem('todos', rawData);
};

export const getData = () => {
  const rawData = localStorage.getItem('todos');
  const data = JSON.parse(rawData);

  return data;
};
