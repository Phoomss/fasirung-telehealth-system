import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import contentService from '../services/ContentService';
import Loading from '../components/Loading';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function KnowledgeScreen() {
  const navigation = useNavigation();
  const [contentList, setContentList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTimeout, setIsTimeout] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await contentService.contentList();
        setContentList(res.data.data);
      } catch (error) {
        console.log('Error fetching content:', error);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchContent();

    const timeout = setTimeout(() => {
      if (isLoading) {
        setIsTimeout(true); 
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [isLoading]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>สาระน่ารู้</Text>
          <Text style={styles.headerSubtitle}>บทความสุขภาพที่น่าสนใจเพื่อการดูแลตัวเองอย่างถูกวิธี</Text>
        </View>

        {isTimeout ? (
          <View style={styles.centerContainer}>
            <Ionicons name="warning-outline" size={48} color={colors.light.error} />
            <Text style={styles.errorText}>ไม่พบข้อมูล หรืออินเทอร์เน็ตมีปัญหา</Text>
          </View>
        ) : isLoading ? (
          <Loading />
        ) : contentList && contentList.length > 0 ? (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollList}>
            {contentList.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                onPress={() => navigation.navigate('KnowledgeDetail', { contentId: item.id })}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel={item.content_name}
              >
                <View style={styles.cardContent}>
                  <View style={styles.textContainer}>
                    <Text style={styles.articleTitle} numberOfLines={2}>
                      {item.content_name || 'บทความสุขภาพ'}
                    </Text>
                    <Text style={styles.articleSnippet} numberOfLines={2}>
                      อ่านต่อเพื่อศึกษาข้อมูลและรายละเอียดฉบับเต็มของบทความนี้...
                    </Text>
                  </View>
                  <View style={styles.iconContainer}>
                    <Ionicons name="chevron-forward-outline" size={20} color="#94A3B8" />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.centerContainer}>
            <Ionicons name="document-text-outline" size={48} color="#94A3B8" />
            <Text style={styles.emptyText}>ไม่พบเนื้อหาสาระน่ารู้</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#64748B',
  },
  scrollList: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    paddingRight: 12,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 6,
  },
  articleSnippet: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 15,
    color: colors.light.error,
    marginTop: 12,
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 15,
    color: '#64748B',
    marginTop: 12,
  },
});
