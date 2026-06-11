import { StyleSheet } from 'react-native';
import Colors from './colors';

const shared = StyleSheet.create({
  // Layout
  screen: { flex: 1, backgroundColor: Colors.bg },
  scrollContent: { padding: 16, paddingBottom: 24 },

  // Header
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
  pageTitle: { fontSize: 20, fontWeight: '700', color: Colors.text },

  // Card
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardTitle: { fontSize: 16, fontWeight: '700', color: Colors.text, marginBottom: 14 },

  // Info row (label + value with icon)
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: 10,
  },
  infoRowLast: { borderBottomWidth: 0 },
  infoCol: { flex: 1 },
  infoLabel: { fontSize: 11, color: Colors.sub, marginBottom: 2 },
  infoValue: { fontSize: 14, fontWeight: '600', color: Colors.text },

  // Stats
  statsRow: { marginBottom: 14 },

  // Tags / Badges
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 6 },

  // Search bar
  searchBar: {
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
  searchInput: { flex: 1, fontSize: 13, color: Colors.text, padding: 0 },

  dropdownRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },

  // Buttons
  primaryBtn: {
    backgroundColor: Colors.green,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  primaryBtnText: { color: Colors.white, fontSize: 13, fontWeight: '700' },

  // Lead/Requirement card
  itemCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  itemTitle: { fontSize: 15, fontWeight: '700', color: Colors.text },
  itemDesc: { fontSize: 13, color: Colors.sub, marginTop: 2 },
  itemBudget: { fontSize: 13, fontWeight: '600', color: Colors.text, marginTop: 8 },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  engRow: { flexDirection: 'row', gap: 12 },
  engItem: { fontSize: 12, color: Colors.sub },
  daysLeft: { fontSize: 12, color: Colors.sub, marginTop: 6 },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 12,
  },
  actionBtn: { padding: 6 },
  statusRow: { flexDirection: 'row', gap: 6 },

  // Empty state
  emptyState: { alignItems: 'center', paddingVertical: 48 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 16, fontWeight: '600', color: Colors.text, marginBottom: 6 },
  emptyDesc: { fontSize: 13, color: Colors.sub },
});

export default shared;