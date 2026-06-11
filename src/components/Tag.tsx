import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../theme/colors';

type TagVariant = 'media' | 'service' | 'health' | 'partner' | 'high' | 'medium' | 'blue';

const variantMap: Record<TagVariant, { bg: string; textColor: string }> = {
  media:   { bg: Colors.tagMediaBg,   textColor: Colors.tagMediaText },
  service: { bg: Colors.tagServiceBg, textColor: Colors.tagServiceText },
  health:  { bg: Colors.tagHealthBg,  textColor: Colors.tagHealthText },
  partner: { bg: Colors.tagPartnerBg, textColor: Colors.tagPartnerText },
  high:    { bg: Colors.highBg,       textColor: Colors.highText },
  medium:  { bg: Colors.medBg,        textColor: Colors.medText },
  blue:    { bg: Colors.badgeBlueBg,  textColor: Colors.badgeBlueText },
};

interface TagProps {
  label: string;
  variant?: TagVariant;
  bg?: string;
  textColor?: string;
}

const Tag: React.FC<TagProps> = ({ label, variant, bg, textColor }) => {
  const resolved = variant ? variantMap[variant] : null;
  const bgColor = bg ?? resolved?.bg ?? Colors.badgeBlueBg;
  const fgColor = textColor ?? resolved?.textColor ?? Colors.badgeBlueText;

  return (
    <View style={[styles.tag, { backgroundColor: bgColor }]}>
      <Text style={[styles.text, { color: fgColor }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  text: { fontSize: 11, fontWeight: '500' },
});

export default Tag;
