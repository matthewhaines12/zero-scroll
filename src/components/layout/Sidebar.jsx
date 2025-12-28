import SidebarIcon from './SidebarIcon';
import UserIcon from './UserIcon';
import { Hexagon, LogIn } from 'lucide-react';
import { useModeContext } from '../../context/ModeContext';
import { MODES } from '../../services/utils/constants';
import { NAV_ITEMS } from '../../services/utils/constants';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

const Sidebar = () => {
  const { mode } = useModeContext();
  const { user } = useAuthContext();

  return (
    <aside
      className={`${MODES[mode]} fixed h-screen w-20 left-0 flex flex-col items-center py-8 bg-surface-1 border-r border-surface-2 z-50`}
    >
      {/* Logo */}
      <div className="mb-10 text-neon-focus animate-pulse break:text-neon-break">
        <Hexagon size={32} strokeWidth={2.5} />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col w-full gap-4 px-3">
        {NAV_ITEMS.map((item) => (
          <SidebarIcon
            key={item.id}
            icon={item.icon}
            label={item.label}
            to={item.to}
          />
        ))}
      </nav>

      {/* Bottom User Icon */}
      <div className="mt-auto mb-2 w-full px-3">
        {!user ? (
          <NavLink
            to={'/login'}
            className="group relative flex items-center justify-center h-12 rounded-xl text-neon-focus hover:bg-surface-2 transition-colors cursor-pointer break:text-neon-break"
          >
            <LogIn size={24} strokeWidth={2} />
            <span
              className="absolute left-full ml-4 px-2 py-1 bg-surface-2 text-text-base text-xs rounded 
            opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap 
            border border-surface-2 pointer-events-none z-50"
            >
              Login
            </span>
          </NavLink>
        ) : (
          <UserIcon />
        )}
      </div>

      {/* <UserIcon /> */}
    </aside>
  );
};

export default Sidebar;
