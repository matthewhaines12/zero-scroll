const UserIcon = () => (
  <div className="mt-auto mb-6 flex flex-col items-center gap-2 cursor-pointer">
    <div
      className="relative w-10 h-10 rounded-full bg-surface-2 flex items-center justify-center
      border-2 border-accent-purple shadow-[0_0_10px_rgba(167,139,250,0.3)]
      transition-all"
    >
      <span className="font-bold text-xs text-text-base">LV5</span>
      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-neon-break rounded-full border border-surface-1"></div>
    </div>
    <span className="text-[10px] text-text-muted font-timer">NOVICE</span>
  </div>
);

export default UserIcon;
