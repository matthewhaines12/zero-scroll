import api from './axios';

export const createTask = async (taskData, accessToken) => {
  const { data } = await api.post('/tasks', taskData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

export const getTasks = async (accessToken) => {
  const { data } = await api.get('/tasks', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

export const updateTask = async (taskID, updates, accessToken) => {
  const { data } = await api.patch(`/tasks/${taskID}`, updates, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

export const deleteTask = async (taskID, accessToken) => {
  const { data } = await api.delete(`/tasks/${taskID}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};
