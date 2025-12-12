import SidebarIcon from './SidebarIcon';
import UserIcon from './UserIcon';
import { Target, BarChart2, Trophy, Settings, Hexagon } from 'lucide-react';

const navItems = [
  { id: 'focus', icon: Target, label: 'Focus Hub', to: '/' },
  { id: 'analytics', icon: BarChart2, label: 'Analytics', to: '/analytics' },
  { id: 'leaderboard', icon: Trophy, label: 'Leaderboard', to: '/leaderboard' },
  { id: 'settings', icon: Settings, label: 'Settings', to: '/settings' },
];

const Sidebar = () => {
  return (
    <aside className="fixed h-screen w-20 left-0 flex flex-col items-center py-6 bg-surface-1 border-r border-surface-2 z-50">
      {/* Logo */}
      <div className="mb-10 text-neon-focus animate-pulse">
        <Hexagon size={32} strokeWidth={2.5} />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col w-full gap-4 px-3">
        {navItems.map((item) => (
          <SidebarIcon
            key={item.id}
            icon={item.icon}
            label={item.label}
            to={item.to}
          />
        ))}
      </nav>

      {/* Bottom User Icon */}
      <UserIcon />
    </aside>
  );
};

export default Sidebar;
