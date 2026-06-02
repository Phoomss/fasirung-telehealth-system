import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import { useAuth } from '../context/AuthProvider';
import { colors } from '../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SettingScreen({ navigation }) {
  const { logout } = useAuth();

  const settingOptions = [
    {
      title: 'ข้อมูลส่วนตัว',
      subtitle: 'ดูและแก้ไขข้อมูลส่วนตัวของคุณ',
      icon: 'person-outline',
      onPress: () => navigation.navigate('Profile'),
      color: colors.light.primary,
      bg: colors.light.primaryLight,
    },
    {
      title: 'ประวัติการเข้าปรึกษา',
      subtitle: 'ดูรายการประวัติและรายงานการพบแพทย์',
      icon: 'time-outline',
      onPress: () => navigation.navigate('ประวัติการเข้าปรึกษา'),
      color: '#0D9488',
      bg: '#CCFBF1',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>ตั้งค่า</Text>
          <Text style={styles.headerSubtitle}>จัดการข้อมูลบัญชีผู้ใช้และประวัติการรักษาของคุณ</Text>
        </View>

        <View style={styles.optionsList}>
          {settingOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionItem}
              onPress={option.onPress}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel={option.title}
            >
              <View style={[styles.iconWrapper, { backgroundColor: option.bg }]}>
                <Ionicons name={option.icon} size={22} color={option.color} />
              </View>
              <View style={styles.textWrapper}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward-outline" size={18} color="#94A3B8" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.logoutBtn} 
          onPress={logout}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="ออกจากระบบ"
        >
          <Ionicons name="log-out-outline" size={20} color="#EF4444" style={{ marginRight: 8 }} />
          <Text style={styles.logoutBtnText}>ออกจากระบบ</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#64748B',
  },
  optionsList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 2,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  textWrapper: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 2,
  },
  optionSubtitle: {
    fontSize: 12,
    color: '#64748B',
  },
  logoutBtn: {
    backgroundColor: '#FEE2E2',
    height: 52,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto', // Push to the bottom of the container
  },
  logoutBtnText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '700',
  },
});
