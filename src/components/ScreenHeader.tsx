import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Icon from './Icon';
import Colors from '../theme/colors';

interface ScreenHeaderProps {
  title: string;
  /** Welcome subtitle shown under the title (Dashboard style) */
  subtitle?: string;
  /** Small date/hint text shown below subtitle */
  hint?: string;
  /** Whether to show the back arrow on the left */
  showBack?: boolean;
  onBack?: () => void;
  /** Whether to show the bell icon on the right */
  showBell?: boolean;
  onBell?: () => void;
  /** Optional right-side action button */
  actionLabel?: string;
  onAction?: () => void;
  style?: ViewStyle;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  subtitle,
  hint,
  showBack = false,
  onBack,
  showBell = false,
  onBell,
  actionLabel,
  onAction,
  style,
}) => (
  <View style={[styles.header, style]}>
    {/* Left side */}
    <View style={styles.left}>
      {showBack && (
        <TouchableOpacity onPress={onBack} style={styles.iconBtn}>
          <Icon name="back" size={20} color={Colors.text} />
        </TouchableOpacity>
      )}
      <View>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        <Text style={styles.title}>{title}</Text>
        {hint ? <Text style={styles.hint}>{hint}</Text> : null}
      </View>
    </View>

    {/* Right side */}
    <View style={styles.right}>
      {actionLabel ? (
        <TouchableOpacity style={styles.actionBtn} onPress={onAction}>
          <Text style={styles.actionBtnText}>{actionLabel}</Text>
        </TouchableOpacity>
      ) : null}
      {showBell ? (
        <TouchableOpacity style={styles.iconBtn} onPress={onBell}>
          <Icon name="bell" size={20} color={Colors.text} />
        </TouchableOpacity>
      ) : null}
    </View>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  left: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  right: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  subtitle: { fontSize: 12, color: Colors.sub },
  title: { fontSize: 18, fontWeight: '700', color: Colors.text },
  hint: { fontSize: 11, color: Colors.sub },
  iconBtn: { padding: 4 },
  actionBtn: {
    backgroundColor: Colors.green,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  actionBtnText: { color: Colors.white, fontSize: 13, fontWeight: '700' },
});

export default ScreenHeader;
