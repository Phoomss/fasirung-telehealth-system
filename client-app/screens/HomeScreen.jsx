import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileCard from '../components/ProfileCard';
import { colors } from '../constants/theme';

export default function HomeScreen({ navigation }) {
  const quickActions = [
    {
      title: 'จองคิวเจาะเลือด',
      icon: 'water-outline',
      screen: 'จองคิวเจาะเลือด',
      bg: colors.light.primaryLight,
      color: colors.light.primary,
    },
    {
      title: 'จองคิวเข้าปรึกษา',
      icon: 'chatbubbles-outline',
      screen: 'จองคิวเข้าปรึกษา',
      bg: '#E0F2FE',
      color: '#0369A1',
    },
    {
      title: 'สรุปรายการนัดหมาย',
      icon: 'calendar-outline',
      screen: 'สรุปรายการนัดหมาย',
      bg: '#ECFDF5',
      color: '#047857',
    },
    {
      title: 'แบบประเมินความเสี่ยง',
      icon: 'checkbox-outline',
      screen: 'แบบประเมินความเสี่ยง',
      bg: '#FEF3C7',
      color: '#D97706',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Top Header Card */}
        <View style={styles.header}>
          <ProfileCard />
        </View>

        {/* Dashboard Services Widget */}
        <View style={styles.contentCard}>
          <Text style={styles.sectionTitle}>เลือกรับบริการสุขภาพ</Text>
          <Text style={styles.sectionSubtitle}>เข้าถึงบริการรักษาระดับพรีเมียมจากทีมแพทย์ผู้เชี่ยวชาญ</Text>

          <View style={styles.gridContainer}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.actionCard}
                onPress={() => navigation.navigate(action.screen)}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={action.title}
                activeOpacity={0.7}
              >
                <View style={[styles.iconWrapper, { backgroundColor: action.bg }]}>
                  <Ionicons name={action.icon} size={28} color={action.color} />
                </View>
                <Text style={styles.actionText}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  header: {
    backgroundColor: colors.light.primary,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingTop: Platform.OS === 'android' ? 24 : 12,
    paddingBottom: 48,
    alignItems: 'center',
  },
  contentCard: {
    backgroundColor: '#FFFFFF',
    marginTop: -24,
    marginHorizontal: 16,
    borderRadius: 24,
    padding: 20,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    textAlign: 'center',
  },
});
