import { NavLink } from 'react-router-dom';

const SidebarIcon = ({ icon: Icon, label, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative group flex items-center justify-center h-12 rounded-xl 
         transition-all duration-300 cursor-pointer
         ${
           isActive
             ? 'bg-neon-focus/10 text-neon-focus shadow-neon-glow-focus'
             : 'text-text-muted hover:bg-surface-2 hover:text-text-base'
         }`
      }
    >
      <Icon size={24} />

      {/* Active indicator */}
      <div
        className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full
          ${({ isActive }) => (isActive ? 'bg-neon-focus' : 'hidden')}`}
      />

      {/* Icon text */}
      <span
        className="absolute left-full ml-4 px-2 py-1 bg-surface-2 text-text-base text-xs rounded 
        opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap 
        border border-surface-2 pointer-events-none z-50"
      >
        {label}
      </span>
    </NavLink>
  );
};

export default SidebarIcon;
