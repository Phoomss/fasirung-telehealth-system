import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import contentService from '../services/ContentService';
import Loading from './../components/Loading';
import { colors } from '../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function KnowledgeDetailScreen({ route, navigation }) {
  const { contentId } = route.params;
  const [contentDetail, setContentDetail] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await contentService.contentDetail(contentId);
        setContentDetail(res.data.data);
      } catch (error) {
        console.log('Error fetching content:', error);
      }
    };
    fetchContent();
  }, [contentId]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {contentDetail ? (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <Text style={styles.headerTitle}>{contentDetail.content_name}</Text>
            
            <View style={styles.divider} />

            <Text style={styles.contentText}>{contentDetail.content_detail}</Text>

            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              accessibilityRole="button"
              accessibilityLabel="ย้อนกลับไปหน้ารายการสาระน่ารู้"
            >
              <Ionicons name="arrow-back-outline" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.backButtonText}>ย้อนกลับ</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <Loading />
      )}
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
  card: {
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
    lineHeight: 28,
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 16,
  },
  contentText: {
    fontSize: 15,
    color: '#334155',
    lineHeight: 24,
    marginBottom: 24,
  },
  backButton: {
    backgroundColor: colors.light.primary,
    borderRadius: 12,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
