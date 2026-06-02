import { View, Text, ScrollView, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import caseService from './../services/caseService';
import { colors } from '../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function HistoryConsultScreeen() {
  const [caseInfo, setCaseInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCaseInfo = async () => {
      try {
        const data = await caseService.caseuserInfo();
        setCaseInfo(data.data.data);
      } catch (error) {
        console.error("Failed to fetch caseItem information", error);
        setError("ไม่สามารถดึงข้อมูลได้ในขณะนี้");
      } finally {
        setLoading(false);
      }
    };

    fetchCaseInfo();
  }, []);

  const formatDateTime = (isoDate) => {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(date);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Header */}
      <View style={styles.header}>
        <ProfileCard />
      </View>

      <View style={styles.contentCard}>
        <Text style={styles.sectionTitle}>ประวัติการเข้าปรึกษา</Text>
        <Text style={styles.sectionSubtitle}>สรุปรายการประวัติการพบแพทย์และปรึกษาสุขภาพ</Text>

        {loading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={colors.light.primary} />
          </View>
        ) : error ? (
          <View style={styles.centerContainer}>
            <Ionicons name="alert-circle-outline" size={48} color={colors.light.error} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : caseInfo.length > 0 ? (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollList}>
            {caseInfo.map((caseItem, index) => (
              <View key={index} style={styles.caseCard}>
                <View style={styles.cardHeader}>
                  <Text style={styles.dateText}>
                    {formatDateTime(caseItem.createdAt)}
                  </Text>
                  <View style={[
                    styles.statusBadge, 
                    { backgroundColor: caseItem.case_status === 'completed' ? '#ECFDF5' : '#FEF3C7' }
                  ]}>
                    <Text style={[
                      styles.statusText, 
                      { color: caseItem.case_status === 'completed' ? '#059669' : '#D97706' }
                    ]}>
                      {caseItem.case_status === 'completed' ? 'สำเร็จแล้ว' : 'อยู่ระหว่างดำเนินการ'}
                    </Text>
                  </View>
                </View>

                <View style={styles.cardBody}>
                  <View style={styles.infoRow}>
                    <Ionicons name="medical-outline" size={16} color="#64748B" style={styles.rowIcon} />
                    <Text style={styles.infoText}>
                      แพทย์: <Text style={styles.boldText}>{caseItem.physician.title}{caseItem.physician.full_name}</Text>
                    </Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Ionicons name="person-outline" size={16} color="#64748B" style={styles.rowIcon} />
                    <Text style={styles.infoText}>
                      เจ้าหน้าที่: <Text style={styles.boldText}>{caseItem.officer.title}{caseItem.officer.full_name}</Text>
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.centerContainer}>
            <Ionicons name="document-text-outline" size={48} color="#94A3B8" />
            <Text style={styles.emptyText}>ไม่พบประวัติการเข้าปรึกษา</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: colors.light.primary,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingTop: 16,
    paddingBottom: 48,
    alignItems: 'center',
  },
  contentCard: {
    flex: 1,
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
    marginBottom: 16,
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
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  scrollList: {
    paddingBottom: 20,
  },
  caseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 10,
    marginBottom: 10,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  cardBody: {
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowIcon: {
    marginRight: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#475569',
  },
  boldText: {
    fontWeight: '600',
    color: '#0F172A',
  },
  errorText: {
    fontSize: 15,
    color: colors.light.error,
    marginTop: 12,
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 15,
    color: '#64748B',
    marginTop: 12,
  },
});
