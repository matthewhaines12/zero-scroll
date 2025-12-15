import React from 'react';

const AudioSlider = () => {
  return (
    <section className="flex flex-col h-3/5 w-full bg-surface-1/50 rounded-2xl p-6 border border-surface-2">
      <header className="mb-6">
        <h2 className="font-timer text-neon-focus text-xl uppercase drop-shadow-[0_0_5px_rgba(0,240,255,0.5)]">
          Audio slider
        </h2>
        {/* <p className="text-text-muted text-xs mt-1">CURRENT SESSION</p> */}
      </header>
    </section>
  );
};

export default AudioSlider;
