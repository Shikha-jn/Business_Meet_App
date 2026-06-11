import React from 'react';
import {ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import InfoRow from '../../components/InfoRow';
import Badge from '../../components/Badge';
import Icon from '../../components/Icon';
import Colors from '../../theme/colors';
import shared from '../../theme/styles';

const QuickCard = ({
  iconBg,
  iconName,
  iconColor,
  label,
  children,
}: {
  iconBg: string;
  iconName: string;
  iconColor: string;
  label: string;
  children: React.ReactNode;
}) => (
  <TouchableOpacity style={styles.quickCard}>
    <View style={[styles.quickIcon, { backgroundColor: iconBg }]}>
      <Icon name={iconName} size={18} color={iconColor} />
    </View>
    <Text style={styles.quickLabel}>{label}</Text>
    {children}
  </TouchableOpacity>
);

const DashboardScreen: React.FC = () => (
  <SafeAreaView style={shared.screen}>
    <ScreenHeader
      title="Test Company"
      subtitle="Welcome back,"
      hint="6/10/2026"
      showBell
    />

    <ScrollView contentContainerStyle={shared.scrollContent} showsVerticalScrollIndicator={false}>
      {/* Quick stat tiles */}
      <View style={styles.quickGrid}>
        <QuickCard iconBg={Colors.greenLight} iconName="shield" iconColor={Colors.green} label="Verification">
          <Badge label="✓ Verified" variant="green" />
        </QuickCard>

        <QuickCard iconBg="#EEF2FF" iconName="chart" iconColor={Colors.purple} label="Profile">
          <Text style={[styles.quickValue, { color: Colors.green }]}>68%</Text>
        </QuickCard>

        <QuickCard iconBg="#FDF4FF" iconName="users" iconColor={Colors.purple} label="Subscription Plan">
          <Text style={[styles.quickValue, { color: Colors.text }]}>Free</Text>
        </QuickCard>

        <QuickCard iconBg="#FFF7ED" iconName="building" iconColor={Colors.orange} label="All Companies">
          <Text style={[styles.quickValue, { color: Colors.orange, fontSize: 12 }]}>View & Rate</Text>
        </QuickCard>
      </View>

      {/* Company Information */}
      <Card title="Company Information">
        <InfoRow icon="building" label="Company Type"       value="Sole Proprietorship" />
        <InfoRow icon="users"   label="Industry"            value="Software Development" />
        <InfoRow icon="calendar"label="Year Established"    value="2024" />
        <InfoRow icon="users"   label="Employee Count"      value="1–10" />
        <InfoRow icon="message" label="Business Description" value="For testing purpose" isLast />
      </Card>

      {/* Contact Information */}
      <Card title="Contact Information">
        <InfoRow icon="mail"     label="Email"          value="testcompany@gmail.com" />
        <InfoRow icon="phone"    label="Phone"          value="9876543210" />
        <InfoRow icon="person"   label="Contact Person" value="Test Company" />
        <InfoRow icon="location" label="Address"        value="Gandhi Nagar, Itarsi, Madhya Pradesh 461111, India" isLast />
      </Card>
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 14 },
  quickCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  quickIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickLabel: { fontSize: 11, color: Colors.sub, marginBottom: 4 },
  quickValue: { fontSize: 16, fontWeight: '700' },
});

export default DashboardScreen;
