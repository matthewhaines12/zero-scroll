import { useState } from 'react';
import TaskItem from './TaskItem';
import { Plus } from 'lucide-react';
import { useTaskContext } from '../../context/TaskContext';

const Tasks = () => {
  const { tasks, setTasks, activeTask, setActiveTask } = useTaskContext();

  const [newTask, setNewTask] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();

    if (!newTask.trim()) return; // Empty new task -> return

    const task = {
      id: Date.now(),
      title: newTask,
      completed: false,
      priority: 'MED',
    };

    setTasks([...tasks, task]);
    setNewTask('');
  };

  const handlePriorityChange = (id, newPriority) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, priority: newPriority } : task
      )
    );
  };

  const handleToggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    setActiveTask(null);
  };

  const handleSelectTask = (task) => {
    if (task.completed) return;

    task.id === activeTask?.id ? setActiveTask(null) : setActiveTask(task);
  };

  return (
    <article className="w-full flex flex-col bg-surface-1/50 rounded-2xl p-6 border border-surface-2 overflow-hidden">
      <header className="mb-6">
        <h2 className="font-timer text-neon-focus text-xl uppercase drop-shadow-[0_0_5px_rgba(0,240,255,0.5)]">
          Mission Log
        </h2>
        <p className="text-text-muted text-xs mt-1">
          SELECT AN OBJECTIVE TO FOCUS ON
        </p>
      </header>

      <form onSubmit={handleAddTask} className="flex gap-3 w-full">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="grow bg-surface-2 rounded-xl py-3 px-4 outline-none
              border border-transparent focus:border-neon-focus/50 focus:shadow-[0_0_15px_rgba(0,240,255,0.1)]
              placeholder:text-text-muted transition-all font-sans"
          placeholder="Enter New Objective"
        />
        <button
          type="submit"
          className="flex justify-center items-center w-12 h-12 rounded-xl
              bg-neon-focus/10 text-neon-focus border border-neon-focus/50
              hover:bg-neon-focus hover:text-primary-dark hover:shadow-neon-glow-focus-small
              transition-all duration-300 cursor-pointer"
        >
          <Plus size={28} strokeWidth={2} />
        </button>
      </form>

      {/* Task list */}
      <div className="mt-6 flex flex-col gap-6 overflow-y-auto flex-1 p-2">
        {tasks.length === 0 ? (
          <p>No tasks</p>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              isActive={task.id === activeTask?.id}
              onSelect={handleSelectTask}
              onPriorityChange={handlePriorityChange}
              onToggleComplete={handleToggleComplete}
            />
          ))
        )}
      </div>
    </article>
  );
};

export default Tasks;
