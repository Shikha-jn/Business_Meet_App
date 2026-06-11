import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Tag from './Tag';
import Badge from './Badge';
import Icon from './Icon';
import Colors from '../theme/colors';
import { Lead } from '../features/leads/types';
import { LeadRequirement } from '../features/leadsReq/types';

// export interface LeadItem {
//   id: string;
//   title: string;
//   description: string;
//   priority: 'HIGH' | 'MEDIUM' | 'LOW';
//   timeline: string;
//   categories: string[];
//   budget: string;
//   location: string;
//   views: number;
//   likes?: number;
//   comments: number;
//   mails?: number;
//   responses?: number;
//   daysLeft: number;
//   status: string;
//   visibility?: string;
// }

interface LeadCardProps {
  item: any; // Lead | LeadRequirement - kept as any to avoid import issues, can be refactored later
  /** Set to true on Requirements screen to hide likes/mails, show responses */
  isRequirement?: boolean;
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onOpen?: () => void;
}

const priorityVariant = (p: string) => {
  if (p === 'HIGH') return 'high' as const;
  if (p === 'MEDIUM') return 'medium' as const;
  return 'blue' as const;
};

const LeadCard: React.FC<LeadCardProps> = ({
  item,
  isRequirement = false,
  onView,
  onEdit,
  onDelete,
  onOpen,
}) => (
  <View style={styles.card}>
    {/* Title & description */}
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.desc}>{item.description}</Text>

    {/* Priority + timeline */}
    <View style={styles.tagRow}>
      <Tag label={item.priority} variant={priorityVariant(item.priority)} />
      <Tag label={`⏱ ${item.timeline}`} variant="blue" />
    </View>

    {/* Category tags */}
    <View style={styles.tagRow}>
        <Tag label={item.category} />
    </View>

    {/* Budget */}
    <Text style={styles.budget}>{item.budget.currency} {item.budget.min} - {item.budget.max}</Text>

    {/* Location */}
    <View style={styles.locationRow}>
      <Icon name="location" size={12} color={Colors.sub} />
      <Text style={styles.locationText}>{item.location.isRemote? 'Remote' : ''}</Text>
    </View>

    {/* Footer: engagement + status */}
    <View style={styles.footer}>
      <View style={styles.engRow}>
        <Text style={styles.engItem}><Icon name="eye" size={12} color={Colors.purple} /> {item.views}</Text>
        {!isRequirement && <Text style={styles.engItem}><Icon name="thumb" size={12} color={Colors.green} /> {item.likeCount ?? 0}</Text>}
        <Text style={styles.engItem}><Icon name="comment" size={12} color={Colors.sub} /> {isRequirement ? item.responseCount ?? 0 : item.commentCount}</Text>
        {!isRequirement && <Text style={styles.engItem}><Icon name="mail" size={12} color={Colors.orange} /> {item.contactInfo.email ?? 0}</Text>}
      </View>
      <View style={styles.statusRow}>
        <Badge label={item.isActive? 'Active' : ''} variant="green" />
        {item.isPublic ? <Badge label={item.isPublic? 'Public' : ''} variant="blue" /> : null}
      </View>
    </View>

    {/* Days left */}
    <Text style={styles.daysLeft}>
      <Icon name="calendar" size={11} color={Colors.sub} /> {item.daysRemaining} days left
    </Text>

    {/* Actions */}
    <View style={styles.actionRow}>
      <TouchableOpacity style={styles.actionBtn} onPress={onView}>
        <Icon name="eye" size={16} color={Colors.blue} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionBtn} onPress={onEdit}>
        <Icon name="edit" size={16} color={Colors.green} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionBtn} onPress={onDelete}>
        <Icon name="trash" size={16} color={Colors.red} />
      </TouchableOpacity>
      {!isRequirement && (
        <TouchableOpacity style={styles.actionBtn} onPress={onOpen}>
          <Icon name="link" size={16} color={Colors.sub} />
        </TouchableOpacity>
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  title: { fontSize: 15, fontWeight: '700', color: Colors.text },
  desc: { fontSize: 13, color: Colors.sub, marginTop: 2 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 6 },
  budget: { fontSize: 13, fontWeight: '600', color: Colors.text, marginTop: 8 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  locationText: { fontSize: 12, color: Colors.sub },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  engRow: { flexDirection: 'row', gap: 12 },
  engItem: { fontSize: 12, color: Colors.sub },
  statusRow: { flexDirection: 'row', gap: 6 },
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
});

export default LeadCard;
