import { useState } from 'react';

const TaskTable = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Task 1',
      scheduledFor: '2025-11-23',
      category: 'Deep-work',
      tags: ['urgent'],
      completed: false,
    },
    {
      id: 2,
      title: 'Task 2',
      scheduledFor: '2025-11-23',
      category: 'Deep-work',
      tags: ['home'],
      completed: false,
    },
  ]);
  return (
    <table className="table-auto w-full m-2 border-separate border-spacing-y-3">
      <thead className="text-center">
        <tr>
          <th className="px-4 py-2">Completed</th>
          <th className="px-4 py-2">Title</th>
          <th className="px-4 py-2">Scheduled For</th>
          <th className="px-4 py-2">Category</th>
          <th className="px-4 py-2">Tags</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {tasks.map((task) => (
          <tr key={task.id} className="bg-white border-b border-gray-300">
            <td className="px-4 py-2">
              <input type="checkbox" />
            </td>
            <td className="px-4 py-2">{task.title}</td>
            <td className="px-4 py-2">{task.scheduledFor}</td>
            <td className="px-4 py-2">{task.category}</td>
            <td className="px-4 py-2 bg-gray-200 rounded-2xl">
              {task.tags.join(', ')}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskTable;
