import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from './Icon';
import Colors from '../theme/colors';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  value,
  onChangeText,
}) => (
  <View style={styles.container}>
    <Icon name="search" size={14} color={Colors.sub} />
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor={Colors.sub}
      value={value}
      onChangeText={onChangeText}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.bg,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 10,
  },
  input: { flex: 1, fontSize: 13, color: Colors.text, padding: 0 },
});

export default SearchBar;
