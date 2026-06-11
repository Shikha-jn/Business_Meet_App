import React, { useState, useEffect } from 'react';
import {ScrollView, View, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../components/ScreenHeader';
import StatCard from '../../components/StatCard';
import SearchBar from '../../components/SearchBar';
import DropdownPill from '../../components/DropdownPill';
import LeadCard from '../../components/LeadCard';
import Card from '../../components/Card';
import Colors from '../../theme/colors';
import shared from '../../theme/styles';
import { getMyLeads } from './service';
import {Lead} from './types';

// const LEADS: LeadItem[] = [
//   {
//     id: '1',
//     title: 'testing',
//     description: 'testing',
//     priority: 'HIGH',
//     timeline: 'within week',
//     categories: ['Media & Entertainment', 'Service Required'],
//     budget: 'INR 200 – 2,199',
//     location: 'Remote',
//     views: 5,
//     likes: 0,
//     comments: 0,
//     mails: 0,
//     daysLeft: 90,
//     status: 'Active',
//     visibility: 'Public',
//   },
// ];

const MyLeadsScreen: React.FC = () => {
  const [search, setSearch] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLeads = async () => {
    try {
      setLoading(true);

      const data = await getMyLeads();

      setLeads(data.leads);
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  const filtered = leads.filter(l =>
    l.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <SafeAreaView style={shared.screen}>
      <ScreenHeader
        title="My Leads"
        actionLabel="+ Create Lead"
        onAction={() => { /* navigate to create lead */ }}
      />

      <ScrollView contentContainerStyle={shared.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Stats */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsRow}>
          <StatCard label="Total Leads"  value={leads.length}                                  color={Colors.blue} />
          <StatCard label="Active Leads" value={leads.filter(l => l.isActive === true).length} color={Colors.green} />
          <StatCard label="Total Views"  value={leads.reduce((s, l) => s + l.views, 0)}         color={Colors.purple} />
          <StatCard label="Total Likes"  value={leads.reduce((s, l) => s + (l.likeCount ?? 0), 0)}  color={Colors.blue} />
          <StatCard label="Comments"     value={leads.reduce((s, l) => s + l.commentCount, 0)}      color={Colors.blue} />
          <StatCard label="Inquiries"    value={leads.reduce((s, l) => s + (l.inquiryCount ?? 0), 0)}  color={Colors.orange} />
        </ScrollView>

        {/* Search + Filters */}
        <Card>
          <SearchBar placeholder="Search leads..." value={search} onChangeText={setSearch} />
          <View style={styles.dropdownRow}>
            <DropdownPill label="All Categories" />
            <DropdownPill label="All Types" />
            <DropdownPill label="All Status" />
          </View>
        </Card>

        {/* Lead list */}
        {filtered.map(lead => (
          <LeadCard
            key={lead._id}
            item={lead}
            onView={() => { /* navigate to lead detail */ }}
            onEdit={() => { /* navigate to edit */ }}
            onDelete={() => { /* confirm delete */ }}
            onOpen={() => { /* open external */ }}
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

export default MyLeadsScreen;
