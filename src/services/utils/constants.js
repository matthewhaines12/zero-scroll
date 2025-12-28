import {
  Target,
  BarChart2,
  Trophy,
  Settings,
  CloudRain,
  Coffee,
  AudioLines,
  Flame,
  CloudLightning,
} from 'lucide-react';

export const NAV_ITEMS = [
  { id: 'focus', icon: Target, label: 'Focus Hub', to: '/' },
  { id: 'analytics', icon: BarChart2, label: 'Analytics', to: '/analytics' },
  { id: 'leaderboard', icon: Trophy, label: 'Leaderboard', to: '/leaderboard' },
  { id: 'settings', icon: Settings, label: 'Settings', to: '/settings' },
];

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
  {
    id: 'rain',
    label: 'RAIN FALL',
    icon: CloudRain,
    src: '/sounds/rain.mp3',
  },
  {
    id: 'white-noise',
    label: 'WHITE NOISE',
    icon: AudioLines,
    src: '/sounds/white-noise.mp3',
  },
  {
    id: 'coffee',
    label: 'COFFEE SHOP AMBIANCE',
    icon: Coffee,
    src: '/sounds/coffee-ambiance.mp3',
  },
  {
    id: 'fireplace',
    label: 'FIREPLACE',
    icon: Flame,
    src: '/sounds/fireplace.mp3',
  },
  {
    id: 'thunder',
    label: 'THUNDERSTORM',
    icon: CloudLightning,
    src: '/sounds/thunderstorm.mp3',
  },
];
