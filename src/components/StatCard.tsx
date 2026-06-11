import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../theme/colors';

interface StatCardProps {
  label: string;
  value: string | number;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, color = Colors.blue }) => (
  <View style={styles.card}>
    <Text style={[styles.value, { color }]}>{value}</Text>
    <Text style={styles.label}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    marginRight: 10,
    minWidth: 100,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'flex-start',
  },
  value: { fontSize: 22, fontWeight: '700', marginBottom: 4 },
  label: { fontSize: 11, color: Colors.sub },
});

export default StatCard;
