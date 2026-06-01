import React from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Consult, styles } from '../constants/styles';
import ProfileCard from '../components/ProfileCard';
import useBookingList from '../hooks/useBookingList';

export default function ListBookingScreen() {
  const { bookingInfo, isLoading, handleDelete, refreshBookingInfo } = useBookingList();

  // Function to format date and time
  const formatDateTime = (isoDate) => {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat('th-TH', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(date);
  };

  const renderBookingItem = ({ item }) => (
    <View style={[Consult.card, { marginVertical: 6 }]}>
      <Text style={{ fontSize: 18, fontWeight: '600', color: '#333' }}>
        {formatDateTime(item.appointment)}
      </Text>
      <Text style={{ fontSize: 16, marginTop: 6, color: '#005B94', fontWeight: '500' }}>
        {item.booking_type === 'bloodTest' ? 'จองคิวเจาะเลือด' : 'จองคิวปรึกษา'}
      </Text>
      {item.booking_detail ? (
        <Text style={{ fontSize: 15, marginTop: 4, color: '#666', fontStyle: 'italic' }}>
          {item.booking_detail}
        </Text>
      ) : null}
      <TouchableOpacity onPress={() => handleDelete(item.id)} style={{ marginTop: 12 }}>
        <Text style={{ color: '#D9534F', fontWeight: 'bold', fontSize: 15 }}>ลบการจอง</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.main}>
      <ProfileCard />
      <View style={[styles.servicesContainer, { paddingHorizontal: 16, paddingVertical: 10, flex: 1 }]}>
        <Text style={[Consult.header, { marginBottom: 10 }]}>
          สรุปรายการนัดหมาย
        </Text>

        {isLoading && bookingInfo.length === 0 ? (
          <ActivityIndicator size="large" color="#005B94" style={{ marginTop: 20 }} />
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
            ListEmptyComponent={
              <Text style={{ textAlign: 'center', color: '#888', marginTop: 30, fontSize: 16 }}>
                ไม่พบข้อมูลรายการนัดหมาย
              </Text>
            }
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </View>
  );
}
