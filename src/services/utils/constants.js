import { CloudRain, Coffee, AudioLines } from 'lucide-react'; // Sound icons

export const PRIORITY_COLORS = {
  LOW: 'text-priority-low shadow-neon-glow-low',
  MED: 'text-priority-medium shadow-neon-glow-medium',
  HIGH: 'text-priority-high shadow-neon-glow-high',
};

export const TIMER_LENGTH = 15;

export const DEFAULT_TIMER_SETTINGS = {
  FOCUS: { value: '25', unit: 'mins' },
  BREAK: { value: '5', unit: 'mins' },
  REPEAT: { value: '3', unit: 'times' },
  RECOVER: { value: '30', unit: 'mins' },
};

export const MODES = {
  FOCUS: 'focus',
  BREAK: 'break',
  RECOVER: 'break',
};

export const SOUND_LIBRARY = [
  { id: 'rain', label: 'RAIN FALL', icon: CloudRain, URL: 'www.example.com' },
  {
    id: 'white-noise',
    label: 'WHITE NOISE',
    icon: AudioLines,
    URL: 'www.example.com',
  },

  {
    id: 'coffee',
    label: 'COFFEE SHOP AMBIANCE',
    icon: Coffee,
    URL: 'www.example.com',
  },
];
