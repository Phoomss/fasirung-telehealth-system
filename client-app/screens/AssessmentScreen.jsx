import { View, Text, ScrollView, Alert, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import userService from './../services/UserService';
import assessmentService from './../services/assessmentService';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../constants/theme';

export default function AssessmentScreen() {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [userId, setUserId] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    fetchUserInfo();
    fetchQuestion();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const res = await userService.userInfo();
      setUserInfo(res.data.data);
      setUserId(res.data.data.id);
    } catch (error) {
      console.log('Error fetching user info:', error);
    }
  };

  const fetchQuestion = async () => {
    try {
      const res = await assessmentService.questionList();
      const questionsData = res.data.data;
      
      const questionsWithAnswers = await Promise.all(questionsData.map(async (question) => {
        const answerRes = await assessmentService.searchAnswer(question.id);
        question.answerOptions = answerRes.data.data;
        return question;
      }));

      setQuestions(questionsWithAnswers);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleAnswerSelect = (questionId, answerId) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answerId }));
  };

  const handleSubmit = async () => {
    if (!userId) {
      Alert.alert('เกิดข้อผิดพลาด', 'ไม่พบรหัสผู้ใช้');
      return;
    }
  
    const responses = Object.entries(selectedAnswers).map(([questionId, answerId]) => ({
      userId,
      questionId,
      answerId,
    }));
  
    const dataToSubmit = {
      userId,
      userInfo,
      responses,
    };
  
    Alert.alert(
      'ยืนยันการส่งคำตอบ',
      'คุณแน่ใจหรือไม่ว่าจะส่งคำตอบของคุณ?',
      [
        {
          text: 'ยกเลิก',
          style: 'cancel',
        },
        {
          text: 'ยืนยัน',
          onPress: async () => {
            try {
              await assessmentService.createResponse(dataToSubmit);
              Alert.alert('สำเร็จ', 'ส่งคำตอบสำเร็จ', [
                {
                  text: 'ตกลง',
                  onPress: () => navigation.goBack()
                },
              ]);
            } catch (error) {
              console.error("เกิดข้อผิดพลาดในการส่งคำตอบ:", error);
              Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถส่งคำตอบได้');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };  

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            โปรดบันทึกข้อมูลที่เป็นความจริงเพื่อใช้ในการประเมินความเสี่ยง
          </Text>
          <Text style={styles.descriptionText}>
            * ข้อมูลของท่านจะถูกเก็บเป็นความลับทางการแพทย์
          </Text>
        </View>

        {questions.map((question, index) => (
          <View key={question.id} style={styles.cardAss}>
            <Text style={styles.questionText}>
              {index + 1}. {question.ques_name}
            </Text>

            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={selectedAnswers[question.id]}
                onValueChange={(value) => handleAnswerSelect(question.id, value)}
                style={styles.picker}
                dropdownIconColor={colors.light.primary}
              >
                <Picker.Item label="เลือกคำตอบ..." value={null} color="#94A3B8" />
                {question.answerOptions?.map((answer) => (
                  <Picker.Item key={answer.id} label={answer.answer_text} value={answer.id} color="#0F172A" />
                ))}
              </Picker>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>ยืนยันคำตอบ</Text>
        </TouchableOpacity>
      </ScrollView>
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
    paddingBottom: 32,
  },
  headerContainer: {
    backgroundColor: '#E6F0FA',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#D0E2F5',
  },
  headerText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E3A8A',
    textAlign: 'center',
    lineHeight: 22,
  },
  descriptionText: {
    fontSize: 12,
    color: '#EF4444',
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '600',
  },
  cardAss: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  questionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
    lineHeight: 22,
    marginBottom: 12,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    overflow: 'hidden',
  },
  picker: {
    height: 48,
    width: '100%',
  },
  submitButton: {
    backgroundColor: colors.light.primary,
    borderRadius: 12,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});
