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
      className={`flex justify-between p-3 rounded-xl gap-2 border-2 transition-all duration-300
    ${
      isActive
        ? 'border-neon-focus break:border-neon-break'
        : 'border-surface-2 hover:bg-surface-2'
    }
    ${task.completed ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
  `}
    >
      <div
        className="flex items-center gap-4 flex-1 min-w-0"
        onClick={() => !task.completed && onSelect(task)}
      >
        <input
          type="checkbox"
          checked={task.completed}
          onChange={(e) => {
            e.stopPropagation();
            onToggleComplete(task.id);
          }}
          className="w-5 h-5 shrink-0 accent-neon-focus break:accent-neon-break"
        />
        <span
          className={`flex wrap-break-word ${
            task.completed ? 'line-through opacity-60' : ''
          }`}
        >
          {task.title}
        </span>
      </div>

      <select
        value={task.priority}
        onChange={(e) => {
          e.stopPropagation();
          onPriorityChange(task.id, e.target.value);
        }}
        className={`text-sm px-2 py-1 rounded-lg bg-surface-1 font-timer shrink-0 self-center ${
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
