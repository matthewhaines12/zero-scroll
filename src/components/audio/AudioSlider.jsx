import { VolumeX, Volume2 } from 'lucide-react';
import { useModeContext } from '../../context/ModeContext';
import { useAudioContext } from '../../context/AudioContext';
import { MODES } from '../../services/utils/constants';
import { SOUND_LIBRARY } from '../../services/utils/constants';

const AudioSlider = () => {
  const { mode } = useModeContext();
  const { volumes, isMuted, setVolume, muteAll, unMute } = useAudioContext();
  const MIN = 0;
  const MAX = 100;

  const handleMuteToggle = () => {
    !isMuted ? muteAll() : unMute();
  };

  return (
    <article
      className={`${MODES[mode]} flex flex-col h-3/5 w-full bg-surface-1/50 rounded-2xl p-6 border border-surface-2`}
    >
      <header className="mb-6">
        <div className="flex justify-between items-center">
          <h2 className="font-timer text-neon-focus text-xl uppercase drop-shadow-neon-focus break:text-neon-break break:drop-shadow-neon-break">
            Focus Audio
          </h2>
          <button
            onClick={() => handleMuteToggle()}
            className="bg-surface-2 rounded-full p-2 hover:opacity-85 cursor-pointer"
          >
            {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
          </button>
        </div>
        <p className="text-text-muted text-xs mt-1">ADJUST AUDIO SLIDER</p>
      </header>

      <div className="flex flex-col gap-2 overflow-y-auto pr-3 custom-scrollbar">
        {SOUND_LIBRARY.map((sound) => {
          const Icon = sound.icon;
          return (
            <div key={sound.id} className="flex flex-col gap-2">
              <div className="flex gap-3 items-center">
                <Icon size={20} className="text-text-base/80" />
                <span className="text-text-base/80">{sound.label}</span>
                <span className="ml-auto text-neon-focus break:text-neon-break">
                  {volumes[sound.id]}%
                </span>
              </div>

              <input
                type="range"
                min={MIN}
                max={MAX}
                step={1}
                value={volumes[sound.id]}
                id="volumeRange"
                onChange={(e) => setVolume(sound.id, e.target.value)}
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
