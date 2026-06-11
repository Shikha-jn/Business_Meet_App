import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import Icon from '../../components/Icon';
import Colors from '../../theme/colors';
import shared from '../../theme/styles';

interface ProfileField {
  label: string;
  value: string;
}

const FieldItem: React.FC<ProfileField> = ({ label, value }) => (
  <View style={styles.field}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <Text style={styles.fieldValue}>{value}</Text>
  </View>
);

const TwoColGrid: React.FC<{ fields: ProfileField[] }> = ({ fields }) => (
  <View style={styles.twoCol}>
    {fields.map(f => <FieldItem key={f.label} {...f} />)}
  </View>
);

const MyProfileScreen: React.FC = () => (
  <SafeAreaView style={shared.screen}>
    <ScreenHeader
      title="My Profile"
      showBack
      showBell
      actionLabel="✏️ Edit Profile"
      onAction={() => { /* navigate to edit profile */ }}
    />

    <ScrollView contentContainerStyle={shared.scrollContent} showsVerticalScrollIndicator={false}>
      {/* Profile Photo */}
      <Card title="Profile Photo">
        <View style={styles.photoRow}>
          <View style={styles.avatar}>
            <Icon name="person" size={32} color={Colors.sub} />
          </View>
          <View style={{ flex: 1, marginLeft: 16 }}>
            <Text style={styles.photoTitle}>Company Profile Photo</Text>
            <Text style={styles.photoDesc}>
              Upload a professional photo of your company logo or office.
              JPG, PNG or GIF. Max size 5MB.
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.uploadBtn}>
          <Icon name="upload" size={14} color={Colors.white} />
          <Text style={styles.uploadBtnText}>Upload Photo</Text>
        </TouchableOpacity>
      </Card>

      {/* Basic Information */}
      <Card title="Basic Information">
        <TwoColGrid
          fields={[
            { label: 'Company Name *', value: 'Test Company' },
            { label: 'Category *',     value: 'Technology' },
            { label: 'Company Type',   value: 'Sole Proprietorship' },
            { label: 'Industry',       value: 'Software Development' },
            { label: 'Year Established', value: '2024' },
            { label: 'Employee Count', value: '1–10' },
          ]}
        />
        <View style={[styles.field, { width: '100%', borderTopWidth: 1, borderTopColor: Colors.border, paddingTop: 10 }]}>
          <Text style={styles.fieldLabel}>Business Description</Text>
          <Text style={styles.fieldValue}>For testing purpose</Text>
        </View>
      </Card>

      {/* Contact Information */}
      <Card title="Contact Information">
        <TwoColGrid
          fields={[
            { label: 'Email',          value: 'testcompany@gmail.com' },
            { label: 'Phone',          value: '9876543210' },
            { label: 'Contact Person', value: 'Test Company' },
            { label: 'Address',        value: 'Gandhi Nagar, Itarsi, MP 461111, India' },
          ]}
        />
      </Card>
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  photoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  photoTitle: { fontSize: 14, fontWeight: '600', color: Colors.text, marginBottom: 4 },
  photoDesc: { fontSize: 11, color: Colors.sub, lineHeight: 16 },
  uploadBtn: {
    backgroundColor: Colors.green,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  uploadBtnText: { color: Colors.white, fontWeight: '700', fontSize: 14 },

  twoCol: { flexDirection: 'row', flexWrap: 'wrap' },
  field: { width: '50%', paddingVertical: 10, paddingRight: 12 },
  fieldLabel: { fontSize: 11, color: Colors.sub, marginBottom: 3 },
  fieldValue: { fontSize: 13, fontWeight: '600', color: Colors.text },
});

export default MyProfileScreen;
