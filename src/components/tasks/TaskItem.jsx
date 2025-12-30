import { useState, useEffect } from 'react';
import { PRIORITY_COLORS } from '../../services/utils/constants';
import { Trash2, Pencil, Check, X } from 'lucide-react';

const TaskItem = ({
  task,
  isActive,
  onSelect,
  onPriorityChange,
  onToggleComplete,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  // Reset editing state when task becomes inactive
  useEffect(() => {
    if (!isActive) {
      setIsEditing(false);
      setNewTitle(task.title);
    }
  }, [isActive, task.title]);

  const handleSaveEdit = () => {
    if (newTitle.trim() && newTitle !== task.title) {
      onEdit(task.id, newTitle.trim());
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setNewTitle(task.title);
    setIsEditing(false);
  };

  return (
    <div
      className={`flex w-full items-center px-3 py-4 rounded-xl gap-3 border-2 transition-colors duration-200
        ${
          isActive
            ? 'border-neon-focus break:border-neon-break'
            : 'border-surface-2 hover:bg-surface-2/50'
        }
        ${task.completed ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <div
        className="flex items-center gap-3 flex-1 min-w-0"
        onClick={() => !task.completed && !isEditing && onSelect(task)}
      >
        <input
          type="checkbox"
          checked={task.completed}
          onChange={(e) => {
            e.stopPropagation();
            onToggleComplete(task.id);
          }}
          className="w-5 h-5 shrink-0 cursor-pointer accent-neon-focus break:accent-neon-break"
        />

        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            maxLength={60}
            onChange={(e) => setNewTitle(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSaveEdit();
              if (e.key === 'Escape') handleCancelEdit();
            }}
            autoFocus
            // ADDED: w-full to force input to respect flex bounds
            className="flex-1 min-w-0 w-full bg-surface-2 rounded px-2 py-1 outline-none border border-neon-focus/50 focus:shadow-neon-glow-focus-small break:border-neon-break/50 break:focus:shadow-neon-glow-break-small"
          />
        ) : (
          <span
            // ADDED: border border-transparent rounded to match Input box model exactly
            className={`flex-1 min-w-0 px-2 py-1 border border-transparent rounded wrap-break-word select-none ${
              task.completed ? 'line-through opacity-60' : ''
            }`}
          >
            {task.title}
          </span>
        )}
      </div>

      {isActive && (
        <div className="flex items-center justify-end gap-2 shrink-0">
          {isEditing ? (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSaveEdit();
                }}
                className="text-text-muted hover:text-green-400 cursor-pointer shrink-0"
              >
                <Check size={16} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCancelEdit();
                }}
                className="text-text-muted hover:text-red-400 cursor-pointer shrink-0"
              >
                <X size={16} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
                className="text-text-muted hover:text-neon-focus break:hover:text-neon-break cursor-pointer shrink-0"
              >
                <Pencil size={16} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(task.id);
                }}
                className="text-text-muted hover:text-red-400 cursor-pointer shrink-0"
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>
      )}

      <select
        value={task.priority}
        onChange={(e) => {
          e.stopPropagation();
          onPriorityChange(task.id, e.target.value);
        }}
        disabled={task.completed}
        className={`text-sm px-2 py-1 rounded-lg bg-surface-1 font-timer shrink-0 self-center ${
          PRIORITY_COLORS[task.priority]
        } ${task.completed ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <option value="LOW">LOW</option>
        <option value="MED">MED</option>
        <option value="HIGH">HIGH</option>
      </select>
    </div>
  );
};

export default TaskItem;
