import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../components/ScreenHeader';
import StatCard from '../../components/StatCard';
import SearchBar from '../../components/SearchBar';
import DropdownPill from '../../components/DropdownPill';
import LeadCard from '../../components/LeadCard';
import Card from '../../components/Card';
import Colors from '../../theme/colors';
import shared from '../../theme/styles';
import { LeadRequirement } from './types';
import { getLeadRequirements } from './service';

// const REQUIREMENTS: LeadItem[] = [
//   {
//     id: '1',
//     title: 'Testing',
//     description: 'testing',
//     priority: 'MEDIUM',
//     timeline: 'flexible',
//     categories: ['Healthcare', 'Partnership'],
//     budget: 'INR 500 – 1,000',
//     location: 'Itarsi, Madhya Pradesh',
//     views: 0,
//     comments: 0,
//     responses: 0,
//     daysLeft: 90,
//     status: 'Active',
//   },
// ];

const LeadRequirementsScreen: React.FC = () => {
  const [search, setSearch] = useState('');
  const [requirements, setRequirements] = useState<LeadRequirement[]>([]);

  const fetchRequirements = async () => {
    try {
      const data = await getLeadRequirements();

      setRequirements(data.requirements);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequirements();
  }, []);

  const filtered = requirements.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <SafeAreaView style={shared.screen}>
      <ScreenHeader
        title="Lead Requirements"
        actionLabel="+ Post Requirement"
        onAction={() => { /* navigate to post requirement */ }}
      />

      <ScrollView contentContainerStyle={shared.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Stats */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsRow}>
          <StatCard label="Total Req." value={requirements.length} color={Colors.blue} />
          <StatCard label="Active" value={requirements.filter(r => r.isActive === true).length} color={Colors.green} />
          <StatCard label="Total Views" value={requirements.reduce((s, r) => s + r.views, 0)} color={Colors.purple} />
          <StatCard label="Responses" value={requirements.reduce((s, r) => s + (r.responseCount ?? 0), 0)} color={Colors.orange} />
        </ScrollView>

        {/* Search + Filters */}
        <Card>
          <SearchBar placeholder="Search requirements..." value={search} onChangeText={setSearch} />
          <View style={styles.dropdownRow}>
            <DropdownPill label="All Categories" />
            <DropdownPill label="All Types" />
            <DropdownPill label="All Status" />
          </View>
        </Card>

        {/* Requirements list */}
        {filtered.map(req => (
          <LeadCard
            key={req._id}
            item={req}
            isRequirement
            onView={() => { /* navigate to detail */ }}
            onEdit={() => { /* navigate to edit */ }}
            onDelete={() => { /* confirm delete */ }}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  statsRow: { marginBottom: 14 },
  dropdownRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
});

export default LeadRequirementsScreen;
