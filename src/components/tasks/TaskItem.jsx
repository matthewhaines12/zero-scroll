import { PRIORITY_COLORS } from '../../services/utils/constants';

const TaskItem = ({
  task,
  isActive,
  onSelect,
  onPriorityChange,
  onToggleComplete,
}) => {
  return (
    <div
      onClick={() => onSelect(task)}
      className={`flex justify-between p-3 rounded-xl border-2 transition-all duration-300 cursor-pointer
        ${
          isActive
            ? 'border-neon-focus shadow-neon-glow-focus-small break:border-neon-break break:shadow-neon-glow-break-small'
            : 'border-surface-2 hover:bg-surface-2'
        }
        ${task.completed ? 'opacity-60 cursor-not-allowed' : ''}
      `}
    >
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={(e) => {
            e.stopPropagation();
            onToggleComplete(task.id);
          }}
          className="w-5 h-5 accent-neon-focus break:accent-neon-break"
        />
        <span className={`${task.completed ? 'line-through opacity-60' : ''}`}>
          {task.title}
        </span>
      </div>

      <select
        value={task.priority}
        onChange={(e) => {
          e.stopPropagation();
          onPriorityChange(task.id, e.target.value);
        }}
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
