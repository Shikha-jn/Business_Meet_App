import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../theme/colors';

interface DropdownPillProps {
  label: string;
  onPress?: () => void;
}

const DropdownPill: React.FC<DropdownPillProps> = ({ label, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.pill}>
    <Text style={styles.text}>{label}</Text>
    <Text style={styles.arrow}>▼</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: Colors.bg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  text: { fontSize: 12, color: Colors.text },
  arrow: { color: Colors.sub, fontSize: 10 },
});

export default DropdownPill;
