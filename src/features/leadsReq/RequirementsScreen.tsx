import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import ScreenHeader from '../../components/ScreenHeader';
import StatCard from '../../components/StatCard';
import SearchBar from '../../components/SearchBar';
import DropdownPill from '../../components/DropdownPill';
import LeadCard, { LeadItem } from '../../components/LeadCard';
import Card from '../../components/Card';
import Colors from '../../theme/colors';
import shared from '../../theme/styles';

const REQUIREMENTS: LeadItem[] = [
  {
    id: '1',
    title: 'Testing',
    description: 'testing',
    priority: 'MEDIUM',
    timeline: 'flexible',
    categories: ['Healthcare', 'Partnership'],
    budget: 'INR 500 – 1,000',
    location: 'Itarsi, Madhya Pradesh',
    views: 0,
    comments: 0,
    responses: 0,
    daysLeft: 90,
    status: 'Active',
  },
];

const LeadRequirementsScreen: React.FC = () => {
  const [search, setSearch] = useState('');

  const filtered = REQUIREMENTS.filter(r =>
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
          <StatCard label="Total Req."  value={REQUIREMENTS.length}                                    color={Colors.blue} />
          <StatCard label="Active"      value={REQUIREMENTS.filter(r => r.status === 'Active').length} color={Colors.green} />
          <StatCard label="Total Views" value={REQUIREMENTS.reduce((s, r) => s + r.views, 0)}         color={Colors.purple} />
          <StatCard label="Responses"   value={REQUIREMENTS.reduce((s, r) => s + (r.responses ?? 0), 0)} color={Colors.orange} />
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
            key={req.id}
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
