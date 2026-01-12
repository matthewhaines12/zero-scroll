import { createContext, use, useState, useEffect, useMemo } from 'react';
import { useAuthContext } from './AuthContext';
import * as tasksApi from '../services/api/tasks.api';

const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const { status, accessToken } = useAuthContext();
  const [tasks, setTasks] = useState([]);
  const [activeTaskID, setActiveTaskID] = useState(null);
  const [loading, setLoading] = useState(status === 'authenticated'); // only load if we expect a fetch
  const [completedTasksToday, setCompletedTasksToday] = useState(0);

  const activeTask = tasks.find((t) => t.id === activeTaskID);

  useEffect(() => {
    const loadTasks = async () => {
      // Logged in users -> fetch from backend
      if (status === 'authenticated' && accessToken) {
        setLoading(true);

        try {
          const res = await tasksApi.getTasks();
          const normalizedTasks = res.tasks.map((task) => ({
            ...task,
            id: task._id,
          }));

          setTasks(normalizedTasks);
        } catch (err) {
          console.error('Failed to load tasks:', err);
        } finally {
          setLoading(false);
        }
      }
    };

    loadTasks();
  }, [status, accessToken]);

  useEffect(() => {
    const loadCompletedTasksToday = async () => {
      if (status === 'authenticated' && accessToken) {
        try {
          const res = await tasksApi.getCompletedTasksToday();
          setCompletedTasksToday(res.count || 0);
        } catch (err) {
          console.error('Failed to load completed tasks today count:', err);
        }
      } else {
        // For guest users, calculate locally
        const count = tasks.filter((t) => t.completed === true).length;
        setCompletedTasksToday(count);
      }
    };

    loadCompletedTasksToday();
  }, [status, accessToken, tasks]);

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
    if (status === 'authenticated' && accessToken) {
      const res = await tasksApi.createTask({
        title,
        priority: 'MED',
      });

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

  const completeTask = async (taskID) => {
    const task = tasks.find((t) => t.id === taskID);
    if (!task) return;

    const updatedCompleted = !task.completed;

    // Logged in -> save to DB
    if (status === 'authenticated' && accessToken) {
      await tasksApi.updateTask(taskID, { completed: updatedCompleted });
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
    if (status === 'authenticated' && accessToken) {
      await tasksApi.updateTask(taskID, { priority: newPriority });
    }
    // Update the local state
    setTasks((prev) =>
      prev.map((t) => (t.id === taskID ? { ...t, priority: newPriority } : t))
    );
  };

  const deleteTask = async (taskID) => {
    const task = tasks.find((t) => t.id === taskID);
    if (!task) return;

    if (status === 'authenticated' && accessToken) {
      await tasksApi.deleteTask(taskID);
    }

    setTasks((prev) => prev.filter((t) => t.id != taskID));
  };

  const updateTask = async (taskID, newTitle) => {
    const task = tasks.find((t) => t.id === taskID);
    if (!task) return;

    if (status === 'authenticated' && accessToken) {
      await tasksApi.updateTask(taskID, { title: newTitle });
    }

    setTasks((prev) =>
      prev.map((t) => (t.id === taskID ? { ...t, title: newTitle } : t))
    );
  };

  // Avoid resorting on every render
  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => Number(a.completed) - Number(b.completed));
  }, [tasks]);

  return (
    <TaskContext
      value={{
        tasks: sortedTasks,
        activeTask,
        activeTaskID,
        completedTasksToday,
        loading,
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
