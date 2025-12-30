import { createContext, use, useState, useEffect } from 'react';
import { useAuthContext } from './AuthContext';
import * as tasksApi from '../services/api/tasks.api';

const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const { user, accessToken } = useAuthContext();
  const [tasks, setTasks] = useState([]);
  const [activeTaskID, setActiveTaskID] = useState(null);

  const activeTask = tasks.find((t) => t.id === activeTaskID);

  useEffect(() => {
    if (user) {
      getTasks();
    } else {
      setTasks([]);
      setActiveTaskID(null);
    }
  }, [user]);

  const createTask = async ({ title }) => {
    if (!title.trim()) return;

    const guestTask = {
      id: crypto.randomUUID(),
      title,
      priority: 'MED',
      completed: false,
      createdAt: Date.now(),
    };

    // Logged in -> save to DB
    if (user) {
      const res = await tasksApi.createTask(
        {
          title,
          priority: 'MED',
        },
        accessToken
      );

      const normalizedTask = {
        ...res.task,
        id: res.task._id,
      };

      setTasks((prev) => [normalizedTask, ...prev]);
      return;
    }
    // Guest -> Local save
    setTasks((prev) => [guestTask, ...prev]);
  };

  const getTasks = async () => {
    try {
      if (user) {
        const res = await tasksApi.getTasks(accessToken);
        const normalizedTasks = res.tasks.map((task) => ({
          ...task,
          id: task._id,
        }));

        setTasks(normalizedTasks);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const completeTask = async (taskID) => {
    const task = tasks.find((t) => t.id === taskID);
    if (!task) return;

    const updatedCompleted = !task.completed;

    // Logged in -> save to DB
    if (user) {
      await tasksApi.updateTask(
        taskID,
        { completed: updatedCompleted },
        accessToken
      );
    }
    // Update the local state
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskID ? { ...t, completed: updatedCompleted } : t
      )
    );
  };

  const changePriority = async (taskID, newPriority) => {
    const task = tasks.find((t) => t.id === taskID);
    if (!task) return;

    // Logged in -> save to DB
    if (user) {
      await tasksApi.updateTask(taskID, { priority: newPriority }, accessToken);
    }
    // Update the local state
    setTasks((prev) =>
      prev.map((t) => (t.id === taskID ? { ...t, priority: newPriority } : t))
    );
  };

  const deleteTask = async (taskID) => {
    const task = tasks.find((t) => t.id === taskID);
    if (!task) return;

    if (user) {
      await tasksApi.deleteTask(taskID, accessToken);
    }

    const updatedTasks = tasks.filter((t) => t.id !== taskID);
    setTasks(updatedTasks);
  };

  const updateTask = async (taskID, newTitle) => {
    const task = tasks.find((t) => t.id === taskID);
    if (!task) return;

    if (user) {
      await tasksApi.updateTask(taskID, { title: newTitle }, accessToken);
    }

    setTasks((prev) =>
      prev.map((t) => (t.id === taskID ? { ...t, title: newTitle } : t))
    );
  };

  return (
    <TaskContext
      value={{
        tasks,
        activeTask,
        activeTaskID,
        setActiveTaskID,
        createTask,
        completeTask,
        changePriority,
        deleteTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext>
  );
};

export const useTaskContext = () => {
  const context = use(TaskContext);

  if (!context) {
    throw new Error('useTaskContext must be used within TimerProvider');
  }

  return context;
};
