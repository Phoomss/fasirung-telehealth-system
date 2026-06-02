import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { styles } from '../constants/styles';
import contentService from '../services/ContentService';
import Loading from '../components/Loading';
import { useNavigation } from '@react-navigation/native';

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
    <View style={styles.main}>
      <Text style={styles.header}>สาระน่ารู้</Text>
      <View style={styles.servicesContainer}>
        {isTimeout ? (
          <Text style={{ color: 'red' }}>ไม่พบข้อมูล เนื้อหายังไม่โหลด หรือไม่มีข้อมูล</Text>
        ) : isLoading ? (
          <Loading /> // Show Loading component if data is still being fetched
        ) : contentList && contentList.length > 0 ? (
          contentList.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.serviceButton,
                { backgroundColor: index % 2 === 0 ? '#69AFEF' : '#288CE866' },
              ]}
              onPress={() => navigation.navigate('KnowledgeDetail', { contentId: item.id })}
            >
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: index % 2 === 0 ? '#ffff' : '#366189',
                  },
                ]}
              >
                {item.content_name || 'No content name available'}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text>ไม่พบเนื้อหาสาระน่ารู้</Text>
        )}
      </View>
    </View>
  );
}
