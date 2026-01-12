import api from './axios';

export const createTask = async (taskData) => {
  const { data } = await api.post('/tasks', taskData);
  return data;
};

export const getTasks = async () => {
  const { data } = await api.get('/tasks');
  return data;
};

export const updateTask = async (taskID, updates) => {
  const { data } = await api.patch(`/tasks/${taskID}`, updates);
  return data;
};

export const deleteTask = async (taskID) => {
  const { data } = await api.delete(`/tasks/${taskID}`);
  return data;
};

export const getCompletedTasksToday = async () => {
  const { data } = await api.get('/tasks/completed-today');
  return data;
};
