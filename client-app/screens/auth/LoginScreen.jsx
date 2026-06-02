import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, SafeAreaView, ScrollView, Platform } from 'react-native';
import React, { useState } from 'react';
import auth_back from '../../assets/auth_back.png';
import authService from '../../services/AuthService';
import { useAuth } from '../../context/AuthProvider';
import { colors } from '../../constants/theme';
import Feather from '@expo/vector-icons/Feather';

export default function LoginScreen({ navigation }) {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth(); 

  const handleChange = (field, value) => {
    setLoginData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await authService.login(loginData);
      if (res.status === 200 && res.data?.data?.token) {
        const token = res.data.data.token;
        login(token);
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.log('Error logging in:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.headerImageContainer}>
          <Image source={auth_back} style={styles.backgroundImage} resizeMode="contain" />
        </View>

        <View style={styles.card}>
          <Text style={styles.headerTitle}>เข้าสู่ระบบ</Text>
          <Text style={styles.headerSubtitle}>เข้าสู่ระบบเพื่อใช้งานระบบปรึกษาและจองคิวแพทย์</Text>

          {/* Username Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>ชื่อผู้ใช้งาน</Text>
            <View style={styles.inputWrapper}>
              <Feather name="user" size={18} color="#94A3B8" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="กรอกชื่อผู้ใช้งาน"
                placeholderTextColor="#94A3B8"
                autoCapitalize="none"
                value={loginData.username}
                onChangeText={(value) => handleChange('username', value)}
              />
            </View>
          </View>

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>รหัสผ่าน</Text>
            <View style={styles.inputWrapper}>
              <Feather name="lock" size={18} color="#94A3B8" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="กรอกรหัสผ่าน"
                secureTextEntry={!showPassword}
                placeholderTextColor="#94A3B8"
                autoCapitalize="none"
                value={loginData.password}
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
            <Text style={styles.submitBtnText}>เข้าสู่ระบบ</Text>
          </TouchableOpacity>

          {/* SignUp Link */}
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>คุณยังไม่มีบัญชีผู้ใช้งานใช่หรือไม่? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signUpLink}>ลงทะเบียน</Text>
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
    paddingVertical: Platform.OS === 'ios' ? 20 : 10,
    backgroundColor: '#F8FAFC',
  },
  backgroundImage: {
    width: '100%',
    height: 180,
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
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  signUpText: {
    fontSize: 14,
    color: '#64748B',
  },
  signUpLink: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.light.primary,
  },
});
