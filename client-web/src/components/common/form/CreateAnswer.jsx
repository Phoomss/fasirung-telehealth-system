import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import answerService from './../../../service/answerService';
import questionService from './../../../service/questionService';

const CreateAnswer = () => {
  const [answerTexts, setAnswerTexts] = useState(['']);
  const [selectedQuestionId, setSelectedQuestionId] = useState('');
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await questionService.questionList();
        setQuestions(response.data.data);
      } catch (error) {
        Swal.fire('เกิดข้อผิดพลาด!', 'ไม่สามารถโหลดคำถามได้', 'error');
      }
    };
    fetchQuestions();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answerTexts];
    updatedAnswers[index] = value;
    setAnswerTexts(updatedAnswers);
  };

  const handleAddAnswer = () => {
    setAnswerTexts([...answerTexts, '']);
  };

  const handleRemoveAnswer = (index) => {
    const updatedAnswers = answerTexts.filter((_, i) => i !== index);
    setAnswerTexts(updatedAnswers);
  };

  const handleSubmit = async () => {
    try {
      const validAnswers = answerTexts.filter(text => text.trim() !== '');

      if (validAnswers.length === 0) {
        Swal.fire('ข้อผิดพลาด', 'กรุณากรอกคำตอบอย่างน้อย 1 ข้อ', 'error');
        return;
      }

      if (!selectedQuestionId) {
        Swal.fire('ข้อผิดพลาด', 'กรุณาเลือกคำถามก่อน', 'error');
        return;
      }

      setIsLoading(true); // Set loading state

      // Pass the answer data to the createAnswer service function
      const response = await answerService.createAnswer({
        questionId: selectedQuestionId,
        answerTexts: validAnswers,
      });

      // Handle the success response
      Swal.fire({
        icon: 'success',
        title: 'สร้างคำถามเรียบร้อย',
        text: 'คำถามของคุณถูกสร้างสำเร็จแล้ว!',
        confirmButtonText: 'ตกลง'
      }).then(() => {
        window.location.reload(); // Reload the page after success
      });
      setAnswerTexts(['']); // Reset answers after submission
      setSelectedQuestionId(''); // Reset the selected question
      handleClose();
    } catch (error) {
      Swal.fire('เกิดข้อผิดพลาด!', 'ไม่สามารถส่งคำตอบได้', 'error');
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div>
      <button className="rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700" onClick={handleShow}>
        เพิ่มคำตอบสำหรับคำถาม
      </button>

      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="w-full max-w-xl rounded-lg bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <h2 className="text-lg font-bold text-slate-950">สร้างคำตอบ</h2>
              <button className="rounded-md px-2 py-1 text-slate-500 hover:bg-slate-100" onClick={handleClose}>ปิด</button>
            </div>
            <div className="space-y-4 px-5 py-4">
              <div>
                <label className="tw-label" htmlFor="questionSelect">เลือกคำถาม</label>
                <select
              id="questionSelect"
              className="tw-field"
              value={selectedQuestionId}
              onChange={(e) => setSelectedQuestionId(e.target.value)}
            >
              <option value="">เลือกคำถาม</option>
              {questions.map((question) => (
                <option key={question.id} value={question.id}>
                  {question.ques_name}
                </option>
              ))}
                </select>
              </div>

            {answerTexts.map((answer, index) => (
              <div key={index} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <input
                  className="tw-field"
                  type="text"
                  value={answer}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  placeholder={`คำตอบที่ ${index + 1}`}
                />
                <button
                  className="mt-2 rounded-md bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={() => handleRemoveAnswer(index)}
                  disabled={answerTexts.length <= 1}
                >
                  ลบคำตอบ
                </button>
              </div>
            ))}

            <button className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700" onClick={handleAddAnswer}>
              เพิ่มคำตอบ
            </button>
            </div>
            <div className="flex justify-end gap-2 border-t border-slate-200 px-5 py-4">
          <button className="rounded-md bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200" onClick={handleClose} disabled={isLoading}>
            ปิด
          </button>
          <button
            className="rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={handleSubmit}
            disabled={isLoading || !selectedQuestionId}
          >
            {isLoading ? 'กำลังสร้างคำตอบ...' : 'ส่งคำตอบ'}
          </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateAnswer;
