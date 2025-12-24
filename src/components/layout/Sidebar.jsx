import SidebarIcon from './SidebarIcon';
import UserIcon from './UserIcon';
import { Target, BarChart2, Trophy, Settings, Hexagon } from 'lucide-react';
import { useModeContext } from '../../context/ModeContext';
import { MODES } from '../../services/utils/constants';
import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { id: 'focus', icon: Target, label: 'Focus Hub', to: '/' },
  { id: 'analytics', icon: BarChart2, label: 'Analytics', to: '/analytics' },
  { id: 'leaderboard', icon: Trophy, label: 'Leaderboard', to: '/leaderboard' },
  { id: 'settings', icon: Settings, label: 'Settings', to: '/settings' },
];

const Sidebar = () => {
  const { mode } = useModeContext();

  return (
    <aside
      className={`${MODES[mode]} fixed h-screen w-20 left-0 flex flex-col items-center py-6 bg-surface-1 border-r border-surface-2 z-50`}
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

      <NavLink
        to={'/login'}
        className="mt-auto bg-white text-black font-bold px-1 py-2 rounded-xl text-xl cursor-pointer hover:opacity-85"
      >
        Login
      </NavLink>

      {/* <UserIcon /> */}
    </aside>
  );
};

export default Sidebar;
