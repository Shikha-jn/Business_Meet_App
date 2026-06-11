import React from 'react';
import { Text } from 'react-native';
import Colors from '../theme/colors';

const iconMap: Record<string, string> = {
  home: '⊞',
  leads: '◎',
  requirements: '✎',
  communities: '⊙',
  profile: '◯',
  bell: '🔔',
  back: '←',
  menu: '≡',
  search: '🔍',
  filter: '⊟',
  eye: '👁',
  thumb: '👍',
  comment: '💬',
  mail: '✉',
  clock: '🕐',
  location: '📍',
  calendar: '📅',
  shield: '🛡',
  chart: '📈',
  building: '🏢',
  users: '👥',
  edit: '✏️',
  trash: '🗑',
  link: '↗',
  check: '✓',
  plus: '+',
  camera: '📷',
  logout: '↩',
  settings: '⚙',
  help: '?',
  message: '✉',
  phone: '📞',
  person: '👤',
  upload: '⬆',
};

interface IconProps {
  name: string;
  size?: number;
  color?: string;
}

const Icon: React.FC<IconProps> = ({ name, size = 18, color = Colors.sub }) => (
  <Text style={{ fontSize: size, color }}>{iconMap[name] ?? '•'}</Text>
);

export default Icon;
