import { useState } from 'react';
import TaskTable from '../components/tasks/TaskTable';
import TaskSidebar from '../components/tasks/TaskSidebar';

const Tasks = () => {
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
    <div className="m-4">
      <h1 className="font-bold text-3xl p-3">Tasks</h1>

      <div className="flex gap-6">
        {/* LEFT SIDE */}
        <section className="w-2/3">
          <button className="bg-blue-600 text-white text-xl font-semibold px-8 py-3 rounded-lg">
            Create Task
          </button>

          <TaskTable />
        </section>

        {/* RIGHT SIDE */}
        <TaskSidebar />
      </div>
    </div>
  );
};

export default Tasks;
