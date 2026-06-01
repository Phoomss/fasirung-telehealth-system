import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import userService from '../services/UserService';

export const useProfile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    full_name: '',
    phone: '',
    age: '',
    username: '',
    password: '',
    role: '',
  });

  const fetchUserInfo = async () => {
    setIsLoading(true);
    try {
      const res = await userService.userInfo();
      const userInfo = res.data.data;
      setUser(userInfo);
      setFormData({
        title: userInfo.title || '',
        full_name: userInfo.full_name || '',
        phone: userInfo.phone || '',
        age: String(userInfo.age || ''),
        username: userInfo.username || '',
        password: '',
        role: userInfo.role || '',
      });
    } catch (error) {
      console.log('Error fetching user info:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const updatedData = { ...formData };
      if (!formData.password) {
        delete updatedData.password;
      }

      const response = await userService.editProfile(updatedData);
      if (response.status === 200) {
        Alert.alert('สำเร็จ', 'โปรไฟล์ของคุณถูกอัปเดตแล้ว.');
        setIsEditing(false);
        setUser({ ...user, ...updatedData });
      } else {
        Alert.alert('ข้อผิดพลาด', 'ไม่สามารถอัปเดตข้อมูลผู้ใช้ได้.');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('ข้อผิดพลาด', 'ไม่สามารถอัปเดตโปรไฟล์ได้.');
    }
  };

  return {
    user,
    formData,
    isEditing,
    setIsEditing,
    isLoading,
    handleChange,
    handleSubmit,
    refreshProfile: fetchUserInfo,
  };
};

export default useProfile;
