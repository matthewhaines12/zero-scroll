import { useModeContext } from '../../context/ModeContext';
import { MODES } from '../../services/utils/constants';
import { SOUND_LIBRARY } from '../../services/utils/constants';
import { useState } from 'react';

const AudioSlider = () => {
  const { mode } = useModeContext();
  const [rainVolume, setRainVolume] = useState(0);
  const min = 0;
  const max = 100;

  return (
    <article
      className={`${MODES[mode]} flex flex-col h-3/5 w-full bg-surface-1/50 rounded-2xl p-6 border border-surface-2`}
    >
      <header className="mb-6">
        <h2 className="font-timer text-neon-focus text-xl uppercase drop-shadow-neon-focus break:text-neon-break break:drop-shadow-neon-break">
          Focus Audio
        </h2>
        <p className="text-text-muted text-xs mt-1">ADJUST AUDIO SLIDER</p>
      </header>

      <div className="flex flex-col gap-2">
        {SOUND_LIBRARY.map((sound) => {
          const Icon = sound.icon;
          return (
            <div key={sound.id} className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <Icon size={20} className="text-text-base/80" />
                <span className="text-text-base/80">{sound.label}</span>
                <span className="ml-auto text-neon-focus break:text-neon-break">
                  {rainVolume}%
                </span>
              </div>
              <input
                type="range"
                min={min}
                max={max}
                step={1}
                value={rainVolume}
                id="volumeRange"
                onChange={(e) => setRainVolume(e.target.value)}
                className="slider w-full appearance-none bg-transparent mb-4"
              />
            </div>
          );
        })}
      </div>
    </article>
  );
};

export default AudioSlider;
