import React from 'react';
import { View, Image, Text, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native';
import logo from '../assets/user.png';
import Feather from '@expo/vector-icons/Feather';
import useProfile from '../hooks/useProfile';
import { colors } from '../constants/theme';

export default function ProfileScreen() {
  const {
    user,
    formData,
    isEditing,
    setIsEditing,
    isLoading,
    handleChange,
    handleSubmit
  } = useProfile();

  if (isLoading && !user) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.light.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarWrapper}>
              <Image source={logo} style={styles.avatar} />
            </View>
            <Text style={styles.nameText}>
              {user ? `${user.title} ${user.full_name}` : 'กำลังโหลด...'}
            </Text>
            <Text style={styles.roleText}>
              {user ? `บทบาท: ${user.role}` : ''}
            </Text>

            <TouchableOpacity
              style={[styles.editBtn, isEditing && styles.cancelBtn]}
              onPress={() => setIsEditing(!isEditing)}
            >
              <Feather name={isEditing ? "x" : "edit-2"} size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
              <Text style={styles.editBtnText}>{isEditing ? 'ยกเลิก' : 'แก้ไขข้อมูลส่วนตัว'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formCard}>
            {isEditing ? (
              <View style={styles.form}>
                {[
                  { label: 'คำนำหน้าชื่อ', key: 'title', value: formData.title },
                  { label: 'ชื่อ-นามสกุล', key: 'full_name', value: formData.full_name },
                  { label: 'อายุ', key: 'age', value: formData.age, keyboardType: 'numeric' },
                  { label: 'เบอร์โทรศัพท์', key: 'phone', value: formData.phone, keyboardType: 'phone-pad' },
                  { label: 'ชื่อผู้ใช้งาน', key: 'username', value: formData.username },
                  { label: 'รหัสผ่านใหม่', key: 'password', value: formData.password, secureTextEntry: true },
                ].map((field) => (
                  <View key={field.key} style={styles.inputGroup}>
                    <Text style={styles.label}>{field.label}</Text>
                    <TextInput
                      value={field.value}
                      style={styles.input}
                      secureTextEntry={field.secureTextEntry || false}
                      keyboardType={field.keyboardType || 'default'}
                      placeholder={`กรอก${field.label}`}
                      placeholderTextColor="#94A3B8"
                      onChangeText={(value) => handleChange(field.key, value)}
                    />
                  </View>
                ))}
                
                <TouchableOpacity onPress={handleSubmit} style={styles.saveBtn}>
                  <Text style={styles.saveBtnText}>บันทึกข้อมูล</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.form}>
                {[
                  { label: 'คำนำหน้าชื่อ', value: user?.title },
                  { label: 'ชื่อ-นามสกุล', value: user?.full_name },
                  { label: 'อายุ', value: String(user?.age || '') },
                  { label: 'เบอร์โทรศัพท์', value: user?.phone },
                  { label: 'ชื่อผู้ใช้งาน', value: user?.username },
                  { label: 'บทบาทผู้ใช้', value: user?.role },
                ].map((field, index) => (
                  <View key={index} style={styles.inputGroup}>
                    <Text style={styles.label}>{field.label}</Text>
                    <TextInput
                      value={field.value}
                      style={[styles.input, styles.readOnly]}
                      editable={false}
                    />
                  </View>
                ))}
              </View>
            )}
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
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  avatarWrapper: {
    shadowColor: '#0066CC',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
    marginBottom: 16,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  nameText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  roleText: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 16,
    fontWeight: '500',
  },
  editBtn: {
    backgroundColor: colors.light.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  cancelBtn: {
    backgroundColor: '#64748B',
  },
  editBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 6,
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
  readOnly: {
    backgroundColor: '#F8FAFC',
    borderColor: '#F1F5F9',
    color: '#64748B',
  },
  saveBtn: {
    backgroundColor: colors.light.success,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
