import { NavLink } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="text-xl font-semibold">FocusApp</div>
        <div className="space-x-6 hidden sm:flex">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              'hover:text-blue-500 ' +
              (isActive ? 'text-blue-600 font-semibold' : '')
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              'hover:text-blue-500 ' +
              (isActive ? 'text-blue-600 font-semibold' : '')
            }
          >
            Tasks
          </NavLink>
          <NavLink
            to="/sessions"
            className={({ isActive }) =>
              'hover:text-blue-500 ' +
              (isActive ? 'text-blue-600 font-semibold' : '')
            }
          >
            Sessions
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
