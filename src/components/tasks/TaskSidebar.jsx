const TaskSidebar = () => {
  return (
    <aside className="w-1/3 bg-gray-100 p-4 rounded-lg h-max sticky top-4">
      {/* Search */}
      <input
        type="text"
        placeholder="Search tasks..."
        // value
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      {/* Quick Add */}
      <form className="mb-4">
        <input
          name="quickTask"
          type="text"
          placeholder="Quick add task..."
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button className="mt-2 w-full bg-blue-600 text-white py-2 rounded">
          Add
        </button>
      </form>

      {/* Today’s Tasks */}
      <h2 className="font-semibold text-xl mb-2">Today's Tasks</h2>
      <ul className="space-y-2 max-h-80 overflow-y-auto">
        <li className="p-3 bg-white rounded shadow"></li>
        <p className="text-gray-500 text-sm">No tasks for today</p>
      </ul>
    </aside>
  );
};

export default TaskSidebar;
