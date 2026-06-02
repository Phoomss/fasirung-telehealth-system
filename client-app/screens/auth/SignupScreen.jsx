import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import auth_back from '../../assets/auth_back.png';
import authService from '../../services/AuthService';
import { colors } from '../../constants/theme';
import Feather from '@expo/vector-icons/Feather';

export default function SignUpScreen({ navigation }) {
  const [signupData, setSignupData] = useState({
    title: 'นาย',
    full_name: '',
    phone: '',
    age: '',
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field, value) => {
    setSignupData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const { title, full_name, phone, age, username, password } = signupData;
    if (!title || !full_name || !phone || !age || !username || !password) {
      Alert.alert('กรุณากรอกข้อมูล', 'โปรดกรอกข้อมูลให้ครบถ้วนทุกช่อง');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      await authService.signup(signupData);
      Alert.alert('สำเร็จ', 'ลงทะเบียนสำเร็จแล้ว', [
        {
          text: 'ตกลง',
          onPress: () => navigation.navigate('Login'),
        },
      ]);
    } catch (error) {
      console.error('Signup error: ', error);
      Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถลงทะเบียนได้');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.headerImageContainer}>
          <Image source={auth_back} style={styles.backgroundImage} resizeMode="contain" />
        </View>

        <View style={styles.card}>
          <Text style={styles.headerTitle}>ลงทะเบียน</Text>
          <Text style={styles.headerSubtitle}>ลงทะเบียนเพื่อรับบริการและดูแลสุขภาพของคุณอย่างต่อเนื่อง</Text>

          {/* Title Dropdown */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>คำนำหน้าชื่อ</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={signupData.title}
                onValueChange={(itemValue) => handleChange('title', itemValue)}
                style={styles.picker}
                dropdownIconColor={colors.light.primary}
              >
                <Picker.Item label="นาย" value="นาย" color="#0F172A" />
                <Picker.Item label="นาง" value="นาง" color="#0F172A" />
                <Picker.Item label="นางสาว" value="นางสาว" color="#0F172A" />
              </Picker>
            </View>
          </View>

          {/* Full Name Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>ชื่อ-นามสกุล</Text>
            <View style={styles.inputWrapper}>
              <Feather name="user" size={18} color="#94A3B8" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="กรอกชื่อและนามสกุลของคุณ"
                placeholderTextColor="#94A3B8"
                value={signupData.full_name}
                onChangeText={(value) => handleChange('full_name', value)}
              />
            </View>
          </View>

          {/* Phone Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>หมายเลขโทรศัพท์</Text>
            <View style={styles.inputWrapper}>
              <Feather name="phone" size={18} color="#94A3B8" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="กรอกหมายเลขโทรศัพท์"
                placeholderTextColor="#94A3B8"
                keyboardType="phone-pad"
                value={signupData.phone}
                onChangeText={(value) => handleChange('phone', value)}
              />
            </View>
          </View>

          {/* Age Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>อายุ</Text>
            <View style={styles.inputWrapper}>
              <Feather name="hash" size={18} color="#94A3B8" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="ระบุอายุของคุณ"
                placeholderTextColor="#94A3B8"
                keyboardType="numeric"
                value={signupData.age}
                onChangeText={(value) => handleChange('age', value)}
              />
            </View>
          </View>

          {/* Username Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>ชื่อผู้ใช้งาน (Username)</Text>
            <View style={styles.inputWrapper}>
              <Feather name="user-check" size={18} color="#94A3B8" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="สำหรับใช้ลงชื่อเข้าใช้งานระบบ"
                placeholderTextColor="#94A3B8"
                autoCapitalize="none"
                value={signupData.username}
                onChangeText={(value) => handleChange('username', value)}
              />
            </View>
          </View>

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>รหัสผ่าน (Password)</Text>
            <View style={styles.inputWrapper}>
              <Feather name="lock" size={18} color="#94A3B8" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="สำหรับความปลอดภัยของข้อมูลการรักษา"
                secureTextEntry={!showPassword}
                placeholderTextColor="#94A3B8"
                autoCapitalize="none"
                value={signupData.password}
                onChangeText={(value) => handleChange('password', value)}
              />
              <TouchableOpacity 
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
                accessibilityRole="button"
                accessibilityLabel={showPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
              >
                <Feather name={showPassword ? "eye" : "eye-off"} size={18} color="#94A3B8" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitBtnText}>ลงทะเบียน</Text>
          </TouchableOpacity>

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>มีบัญชีอยู่แล้วใช่หรือไม่? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>เข้าสู่ระบบ</Text>
            </TouchableOpacity>
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
    paddingBottom: 32,
  },
  headerImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#F8FAFC',
  },
  backgroundImage: {
    width: '100%',
    height: 140,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
    flex: 1,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 32,
    lineHeight: 18,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 8,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  picker: {
    height: 48,
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 14,
    backgroundColor: '#FFFFFF',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 15,
    color: '#0F172A',
  },
  eyeIcon: {
    padding: 4,
  },
  submitBtn: {
    backgroundColor: colors.light.primary,
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    shadowColor: colors.light.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  loginText: {
    fontSize: 14,
    color: '#64748B',
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.light.primary,
  },
});
