const PRIORITY_COLORS = {
  LOW: 'text-priority-low shadow-neon-glow-low',
  MED: 'text-priority-medium shadow-neon-glow-medium',
  HIGH: 'text-priority-high shadow-neon-glow-high',
};

const TaskItem = ({ task, onPriorityChange, onToggleComplete }) => {
  return (
    <div
      className="flex justify-between p-3 rounded-xl border border-surface-2 hover:bg-surface-2
     transition"
    >
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          className="w-5 h-5 accent-neon-focus"
        />
        <span className={`${task.completed ? 'line-through opacity-60' : ''}`}>
          {task.title}
        </span>
      </div>

      <select
        value={task.priority}
        onChange={(e) => onPriorityChange(task.id, e.target.value)}
        className={`text-sm px-2 py-1 rounded-lg bg-surface-1 font-timer ${
          PRIORITY_COLORS[task.priority]
        }`}
      >
        <option value="LOW">LOW</option>
        <option value="MED">MED</option>
        <option value="HIGH">HIGH</option>
      </select>
    </div>
  );
};

export default TaskItem;
