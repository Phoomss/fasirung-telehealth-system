import React from 'react';
import { View, Image, Text, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { ProfileStyle, styles } from '../constants/styles';
import logo from '../assets/user.png';
import Feather from '@expo/vector-icons/Feather';
import useProfile from '../hooks/useProfile';

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
      <View style={[styles.main, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#005B94" />
      </View>
    );
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View style={styles.main}>
        <View style={[styles.servicesContainer, { alignItems: 'center', padding: 20 }]}>
          <Image
            source={logo}
            style={[
              ProfileStyle.profileImage,
              { borderWidth: 2, borderColor: '#ddd', borderRadius: 50, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 5, shadowOffset: { width: 0, height: 2 } },
            ]}
          />
          {user ? (
            <Text style={[styles.greetingText, { marginTop: 10, fontSize: 20, fontWeight: 'bold', color: '#333' }]}>
              {user.title} {user.full_name}
            </Text>
          ) : (
            <Text style={[styles.greetingText, { marginTop: 10, fontSize: 20, color: '#777' }]}>User Not Found</Text>
          )}

          <TouchableOpacity
            style={ProfileStyle.btnEdit}
            onPress={() => setIsEditing(!isEditing)}
          >
            <Feather name={isEditing ? "x" : "edit"} size={18} color="white" style={{ marginRight: 5 }} />
            <Text style={{ color: '#fff', fontSize: 16 }}>{isEditing ? 'Cancel' : 'Edit Profile'}</Text>
          </TouchableOpacity>

          {/* Editable form */}
          {isEditing ? (
            <View style={{ width: '100%', marginTop: 10 }}>
              {[
                { label: 'Title', key: 'title', value: formData.title },
                { label: 'Full Name', key: 'full_name', value: formData.full_name },
                { label: 'Age', key: 'age', value: formData.age },
                { label: 'Phone', key: 'phone', value: formData.phone },
                { label: 'Username', key: 'username', value: formData.username },
                { label: 'Password', key: 'password', value: formData.password, secureTextEntry: true },
                { label: 'Role', key: 'role', value: formData.role },
              ].map((field) => (
                <View key={field.key} style={{ marginBottom: 15 }}>
                  <Text style={{ fontWeight: '600', marginBottom: 5, color: '#555' }}>{field.label}</Text>
                  <TextInput
                    value={field.value}
                    style={ProfileStyle.input}
                    secureTextEntry={field.secureTextEntry || false}
                    onChangeText={(value) => handleChange(field.key, value)}
                  />
                </View>
              ))}
              <TouchableOpacity onPress={handleSubmit} style={[ProfileStyle.btnEdit, { marginTop: 10, backgroundColor: '#28A745' }]}>
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          ) : (
            // Read-only fields
            <View style={{ width: '100%', marginTop: 10 }}>
              {[
                { label: 'Title', value: user?.title },
                { label: 'Full Name', value: user?.full_name },
                { label: 'Age', value: String(user?.age || '') },
                { label: 'Phone', value: user?.phone },
                { label: 'Username', value: user?.username },
                { label: 'Role', value: user?.role },
              ].map((field, index) => (
                <View key={index} style={{ marginBottom: 15 }}>
                  <Text style={{ fontWeight: '600', marginBottom: 5, color: '#555' }}>{field.label}</Text>
                  <TextInput
                    value={field.value}
                    style={[ProfileStyle.input, { backgroundColor: '#F5F5F5' }]}
                    editable={false}
                  />
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
