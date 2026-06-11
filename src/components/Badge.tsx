import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../theme/colors';

interface BadgeProps {
  label: string;
  bg?: string;
  textColor?: string;
  /** Preset variant shortcuts */
  variant?: 'green' | 'blue' | 'orange' | 'purple';
}

const variantMap: Record<string, { bg: string; textColor: string }> = {
  green: { bg: Colors.badgeGreenBg, textColor: Colors.badgeGreenText },
  blue: { bg: Colors.badgeBlueBg, textColor: Colors.badgeBlueText },
  orange: { bg: Colors.badgeOrangeBg, textColor: Colors.badgeOrangeText },
  purple: { bg: Colors.badgePurpleBg, textColor: Colors.badgePurpleText },
};

const Badge: React.FC<BadgeProps> = ({ label, bg, textColor, variant }) => {
  const resolved = variant ? variantMap[variant] : null;
  const bgColor = bg ?? resolved?.bg ?? Colors.badgeGreenBg;
  const fgColor = textColor ?? resolved?.textColor ?? Colors.badgeGreenText;

  return (
    <View style={[styles.badge, { backgroundColor: bgColor }]}>
      <Text style={[styles.text, { color: fgColor }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  text: { fontSize: 11, fontWeight: '600' },
});

export default Badge;
