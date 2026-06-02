import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import logo from '../assets/user.png';
import userService from '../services/UserService';
import { colors } from '../constants/theme';

export default function ProfileCard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await userService.userInfo();
        setUser(res.data.data);
      } catch (error) {
        console.log('Error fetching user info:', error);
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <View style={styles.card}>
      <Image source={logo} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>ยินดีต้อนรับ</Text>
        {user ? (
          <Text style={styles.nameText}>{user.title} {user.full_name}</Text>
        ) : (
          <Text style={styles.nameText}>กำลังโหลด...</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    width: '90%',
    maxWidth: 400,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  nameText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 2,
  },
});