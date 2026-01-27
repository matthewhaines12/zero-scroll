import { useState } from 'react';
import TaskItem from './TaskItem';
import { Plus } from 'lucide-react';
import { useTaskContext } from '../../context/TaskContext';
import { useModeContext } from '../../context/ModeContext';
import { MODES } from '../../services/utils/constants';

const Tasks = () => {
  const {
    tasks,
    activeTaskID,
    setActiveTaskID,
    createTask,
    completeTask,
    changePriority,
    deleteTask,
    updateTask,
  } = useTaskContext();
  const { mode } = useModeContext();
  const [newTask, setNewTask] = useState('');

  const handleAddTask = async (e) => {
    try {
      e.preventDefault();
      await createTask({ title: newTask });
      setNewTask('');
    } catch (err) {
      // Silently handle error
    }
  };

  const handlePriorityChange = async (id, newPriority) => {
    try {
      await changePriority(id, newPriority);
    } catch (err) {
      // Silently handle error
    }
  };

  const handleToggleComplete = async (id) => {
    try {
      setActiveTaskID(null);
      await completeTask(id);
    } catch (err) {
      // Silently handle error
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
    } catch (err) {
      // Silently handle error
    }
  };

  const handleUpdateTask = async (id, newTitle) => {
    try {
      await updateTask(id, newTitle);
    } catch (err) {
      // Silently handle error
    }
  };

  const handleSelectTask = (task) => {
    if (task.completed) return;

    setActiveTaskID((prevID) => (task.id === prevID ? null : task.id));
  };

  return (
    <article
      className={`${MODES[mode]} lg:min-h-full h-[500px] w-full flex flex-col bg-surface-1/50 rounded-2xl p-6 border border-surface-2`}
    >
      <header className="mb-6">
        <h2 className="font-timer text-neon-focus text-xl uppercase drop-shadow-neon-focus break:text-neon-break break:drop-shadow-neon-break">
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
          maxLength={60}
          onChange={(e) => setNewTask(e.target.value)}
          className="grow bg-surface-2 rounded-xl py-3 px-4 outline-none
              border border-transparent focus:border-neon-focus/50 focus:shadow-neon-glow-focus-small
              placeholder:text-text-muted transition-all break:focus:border-neon-break/50 focus:break:shadow-neon-glow-break-small"
          placeholder="Enter New Objective"
        />
        <button
          type="submit"
          className="flex justify-center items-center w-12 h-12 rounded-xl
              bg-neon-focus/8 text-neon-focus border border-neon-focus/50
              hover:bg-neon-focus hover:text-primary-dark hover:shadow-neon-glow-focus-small
              transition-all duration-300 cursor-pointer break:bg-neon-break/8 break:text-neon-break break:border-neon-break/50 break:hover:bg-neon-break break:hover:shadow-neon-glow-break-small"
        >
          <Plus size={28} strokeWidth={2} />
        </button>
      </form>

      {/* Task list */}
      <div className="mt-6 flex flex-col gap-6 overflow-y-auto min-h-0 flex-1 pr-2 custom-scrollbar">
        {tasks.length === 0 ? (
          <p className="text-text-muted uppercase text-sm">No Tasks</p>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              isActive={task.id === activeTaskID}
              onSelect={handleSelectTask}
              onPriorityChange={handlePriorityChange}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTask}
              onEdit={handleUpdateTask}
            />
          ))
        )}
      </div>
    </article>
  );
};

export default Tasks;
