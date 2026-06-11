import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from './Icon';
import Colors from '../theme/colors';

interface InfoRowProps {
  icon: string;
  label: string;
  value: string;
  isLast?: boolean;
}

const InfoRow: React.FC<InfoRowProps> = ({ icon, label, value, isLast = false }) => (
  <View style={[styles.row, isLast && styles.rowLast]}>
    <Icon name={icon} size={14} color={Colors.sub} />
    <View style={styles.col}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: 10,
  },
  rowLast: { borderBottomWidth: 0 },
  col: { flex: 1 },
  label: { fontSize: 11, color: Colors.sub, marginBottom: 2 },
  value: { fontSize: 14, fontWeight: '600', color: Colors.text },
});

export default InfoRow;
