import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import bookingService from '../services/BookingService';

export const useBookingList = () => {
  const [bookingInfo, setBookingInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBookingInfo = async () => {
    setIsLoading(true);
    try {
      const data = await bookingService.bookingInfo();
      setBookingInfo(data || []);
    } catch (error) {
      console.error("Failed to fetch booking information", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookingInfo();
  }, []);

  const handleDelete = (bookingId) => {
    Alert.alert(
      "ยืนยันการลบ",
      "คุณต้องการลบการจองนี้ใช่หรือไม่?",
      [
        { text: "ยกเลิก", style: "cancel" },
        {
          text: "ลบ",
          onPress: async () => {
            try {
              await bookingService.deleteBooking(bookingId);
              setBookingInfo((prevInfo) =>
                prevInfo.filter((booking) => booking.id !== bookingId)
              );
              Alert.alert("สำเร็จ", "การจองถูกลบแล้ว");
            } catch (error) {
              Alert.alert("ผิดพลาด", "ไม่สามารถลบการจองได้");
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  return {
    bookingInfo,
    isLoading,
    handleDelete,
    refreshBookingInfo: fetchBookingInfo,
  };
};

export default useBookingList;
