import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import ScreenHeader from '../../components/ScreenHeader';
import SearchBar from '../../components/SearchBar';
import EmptyState from '../../components/EmptyState';
import Colors from '../../theme/colors';
import shared from '../../theme/styles';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Community {
  id: string;
  name: string;
  members: string;
  online: number;
  icon: string;
}

const ALL_COMMUNITIES: Community[] = [
  { id: '1', name: 'Technology Innovators', members: '1.2K', online: 56, icon: '💻' },
  { id: '2', name: 'Business Growth',       members: '890',  online: 34, icon: '📈' },
  { id: '3', name: 'Healthcare Partners',   members: '567',  online: 23, icon: '🏥' },
  { id: '4', name: 'Startup Network',       members: '2.1K', online: 78, icon: '🚀' },
  { id: '5', name: 'Marketing Profs',       members: '743',  online: 29, icon: '📣' },
];

type TabKey = 'my' | 'all';

const CommunitiesScreen: React.FC = () => {
  const [tab, setTab] = useState<TabKey>('my');
  const [search, setSearch] = useState('');

  const filteredAll = ALL_COMMUNITIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <SafeAreaView style={shared.screen}>
      <ScreenHeader title="Communities" />

      <ScrollView contentContainerStyle={shared.scrollContent} showsVerticalScrollIndicator={false}>
        <SearchBar
          placeholder="Search communities..."
          value={search}
          onChangeText={setSearch}
        />

        {/* Tab toggle */}
        <View style={styles.tabRow}>
          {(['my', 'all'] as TabKey[]).map(key => (
            <TouchableOpacity
              key={key}
              style={[styles.tabBtn, tab === key && styles.tabBtnActive]}
              onPress={() => setTab(key)}
            >
              <Text style={[styles.tabBtnText, tab === key && styles.tabBtnTextActive]}>
                {key === 'my' ? 'My Communities' : 'All Communities'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {tab === 'my' ? (
          <EmptyState
            icon="👥"
            title="No communities joined"
            description="Browse all communities to join"
          />
        ) : (
          <FlatList
            data={filteredAll}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.communityRow}>
                <View style={styles.communityIcon}>
                  <Text style={{ fontSize: 22 }}>{item.icon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.communityName}>{item.name}</Text>
                  <Text style={styles.communitySub}>
                    {item.members} members • {item.online} online
                  </Text>
                </View>
                <TouchableOpacity style={styles.joinBtn}>
                  <Text style={styles.joinBtnText}>Join</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabRow: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: Colors.border,
    borderRadius: 10,
    padding: 3,
  },
  tabBtn: { flex: 1, paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
  tabBtnActive: { backgroundColor: Colors.green },
  tabBtnText: { fontSize: 13, color: Colors.sub, fontWeight: '500' },
  tabBtnTextActive: { color: Colors.white, fontWeight: '700' },

  communityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: 12,
  },
  communityIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.greenLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  communityName: { fontSize: 14, fontWeight: '600', color: Colors.text },
  communitySub: { fontSize: 12, color: Colors.sub, marginTop: 2 },
  joinBtn: {
    backgroundColor: Colors.green,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  joinBtnText: { color: Colors.white, fontSize: 13, fontWeight: '600' },
});

export default CommunitiesScreen;
