import React from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet, SafeAreaView, Alert } from 'react-native';
import ProfileCard from '../components/ProfileCard';
import useBookingList from '../hooks/useBookingList';
import { colors } from '../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ListBookingScreen() {
  const { bookingInfo, isLoading, handleDelete, refreshBookingInfo } = useBookingList();

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

  const confirmDelete = (bookingId) => {
    Alert.alert(
      'ยืนยันการยกเลิก',
      'คุณต้องการยกเลิกการนัดหมายนี้ใช่หรือไม่?',
      [
        { text: 'ยกเลิก', style: 'cancel' },
        { text: 'ตกลง', style: 'destructive', onPress: () => handleDelete(bookingId) }
      ]
    );
  };

  const renderBookingItem = ({ item }) => (
    <View style={styles.bookingCard}>
      <View style={styles.cardHeader}>
        <View style={styles.typeBadgeContainer}>
          <View style={[
            styles.typeBadge, 
            { backgroundColor: item.booking_type === 'bloodTest' ? '#E0F2FE' : '#ECFDF5' }
          ]}>
            <Ionicons 
              name={item.booking_type === 'bloodTest' ? 'water-outline' : 'chatbubbles-outline'} 
              size={14} 
              color={item.booking_type === 'bloodTest' ? '#0284C7' : '#059669'} 
              style={{ marginRight: 4 }}
            />
            <Text style={[
              styles.typeBadgeText, 
              { color: item.booking_type === 'bloodTest' ? '#0284C7' : '#059669' }
            ]}>
              {item.booking_type === 'bloodTest' ? 'จองเจาะเลือด' : 'จองเข้าปรึกษา'}
            </Text>
          </View>
        </View>

        <TouchableOpacity 
          onPress={() => confirmDelete(item.id)} 
          style={styles.deleteBtn}
          accessibilityLabel="ยกเลิกนัดหมาย"
          accessibilityRole="button"
        >
          <Ionicons name="trash-outline" size={18} color="#EF4444" />
        </TouchableOpacity>
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.dateTimeText}>
          {formatDateTime(item.appointment)}
        </Text>
        {item.booking_detail ? (
          <Text style={styles.detailText} numberOfLines={2}>
            {item.booking_detail}
          </Text>
        ) : null}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <ProfileCard />
      </View>

      <View style={styles.contentCard}>
        <Text style={styles.sectionTitle}>สรุปรายการนัดหมาย</Text>
        <Text style={styles.sectionSubtitle}>รายการนัดหมายบริการสุขภาพปัจจุบันของคุณ</Text>

        {isLoading && bookingInfo.length === 0 ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={colors.light.primary} />
          </View>
        ) : (
          <FlatList
            data={bookingInfo}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderBookingItem}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
            onRefresh={refreshBookingInfo}
            refreshing={isLoading}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={
              <View style={styles.centerContainer}>
                <Ionicons name="calendar-outline" size={48} color="#94A3B8" />
                <Text style={styles.emptyText}>ไม่พบข้อมูลรายการนัดหมาย</Text>
              </View>
            }
          />
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
  listContainer: {
    paddingBottom: 24,
  },
  bookingCard: {
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
    marginBottom: 12,
  },
  typeBadgeContainer: {
    flexDirection: 'row',
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  typeBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  deleteBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: {
    gap: 4,
  },
  dateTimeText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
  },
  detailText: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 15,
    color: '#64748B',
    marginTop: 12,
  },
});
