import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Ionicons from 'react-native-vector-icons/Ionicons';
import userService from "../services/UserService";
import { useNavigation } from "@react-navigation/native";
import bookingService from "../services/BookingService";
import { colors } from "../constants/theme";

export default function ConsultScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [bookingData, setBookingData] = useState({
    userId: '',
    appointment: '',
    booking_type: "consult",
    booking_detail: ""
  });

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await userService.userInfo();
        setUser(res.data.data);
        setBookingData((prev) => ({
          ...prev,
          userId: res.data.data.id,
        }));
      } catch (error) {
        console.log('Error fetching user info:', error);
      }
    };
    fetchUserInfo();
  }, []);

  const handleChange = (field, value) => {
    setBookingData((prev) => ({ ...prev, [field]: value }));
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    handleChange('appointment', date.toISOString());
    setDatePickerVisibility(false);
  };

  const handleSubmit = async () => {
    if (!bookingData.appointment) {
      Alert.alert('กรุณากรอกข้อมูล', 'โปรดเลือกวันและเวลาที่ต้องการเข้าปรึกษา');
      return;
    }
    try {
      await bookingService.createBooking(bookingData);
      Alert.alert('สำเร็จ', 'บันทึกการจองคิวเข้าปรึกษาเรียบร้อยแล้ว', [
        { text: 'ตกลง', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.error('booking error: ', error);
      Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถจองคิวได้');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formCard}>
          <Text style={styles.headerTitle}>จองคิวเข้าปรึกษา</Text>
          <Text style={styles.headerSubtitle}>บริการนัดหมายปรึกษาปัญหาสุขภาพกับทีมแพทย์</Text>

          {/* User Fields */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>ชื่อ-นามสกุลผู้ป่วย</Text>
            <TextInput
              style={[styles.input, styles.readOnly]}
              value={user ? `${user.title}.${user.full_name}` : 'กำลังโหลด...'}
              editable={false}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>เบอร์โทรศัพท์ติดต่อ</Text>
            <TextInput
              style={[styles.input, styles.readOnly]}
              value={user ? user.phone : 'กำลังโหลด...'}
              editable={false}
            />
          </View>

          {/* Date Selector */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>วันและเวลาที่ต้องการนัดหมาย</Text>
            <TouchableOpacity 
              style={styles.dateSelector} 
              onPress={() => setDatePickerVisibility(true)}
              accessibilityRole="button"
              accessibilityLabel="เลือกวันและเวลาจองเข้าปรึกษา"
            >
              <Ionicons name="calendar-outline" size={20} color={colors.light.primary} style={{ marginRight: 10 }} />
              <Text style={selectedDate ? styles.dateText : styles.placeholderText}>
                {selectedDate ? selectedDate.toLocaleString('th-TH') : 'เลือกวันและเวลาเข้ารับบริการ'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Detail Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>รายละเอียดเพิ่มเติม</Text>
            <TextInput
              style={[styles.input, styles.textarea]}
              multiline
              numberOfLines={4}
              placeholder="กรุณากรอกรายละเอียดอาการหรือเรื่องที่ต้องการปรึกษา"
              placeholderTextColor="#94A3B8"
              value={bookingData.booking_detail}
              onChangeText={(text) => handleChange('booking_detail', text)}
            />
          </View>

          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitBtnText}>ยืนยันการจองคิว</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        locale="th"
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    padding: 16,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#0F172A',
    backgroundColor: '#FFFFFF',
  },
  textarea: {
    height: 100,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
  readOnly: {
    backgroundColor: '#F8FAFC',
    color: '#64748B',
  },
  dateSelector: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  dateText: {
    fontSize: 15,
    color: '#0F172A',
  },
  placeholderText: {
    fontSize: 15,
    color: '#94A3B8',
  },
  submitBtn: {
    backgroundColor: colors.light.primary,
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
