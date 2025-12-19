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
             ? 'bg-neon-focus/10 text-neon-focus shadow-neon-glow-focus break:text-neon-break break:bg-neon-break/10 break:shadow-neon-glow-break'
             : 'text-text-muted hover:bg-surface-2 hover:text-text-base'
         }`
      }
    >
      <Icon size={24} />

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
