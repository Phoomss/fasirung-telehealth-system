import React, { useState } from 'react';
import Swal from 'sweetalert2';
import questionService from './../../../service/questionService';

const CreateQuestion = () => {
  const [questionData, setQuestionData] = useState({ ques_name: "" });
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!questionData.ques_name.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณากรอกคำถาม',
        text: 'คุณต้องกรอกคำถามก่อนที่จะส่ง',
      });
      return;
    }

    setIsLoading(true);
    Swal.fire({
      title: 'กำลังสร้างคำถาม...',
      text: 'โปรดรอสักครู่',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      await questionService.createQuestion(questionData);
      Swal.fire({
        icon: 'success',
        title: 'สร้างคำถามเรียบร้อย',
        text: 'คำถามของคุณถูกสร้างสำเร็จแล้ว!',
        confirmButtonText: 'ตกลง'
      }).then(() => {
        window.location.reload();
      });
      handleClose();
    } catch (error) {
      console.error('Error creating content:', error);
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'มีปัญหาในการสร้างคำถาม',
        confirmButtonText: 'ลองอีกครั้ง'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button className="rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700" onClick={handleShow}>
        เพิ่มคำถาม
      </button>

      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="w-full max-w-lg rounded-lg bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <h2 className="text-lg font-bold text-slate-950">สร้างคำถามใหม่</h2>
              <button className="rounded-md px-2 py-1 text-slate-500 hover:bg-slate-100" onClick={handleClose}>ปิด</button>
            </div>
            <div className="px-5 py-4">
              <label className="tw-label" htmlFor="questionName">คำถาม</label>
              <input id="questionName" className="tw-field" type="text" name="ques_name" value={questionData.ques_name} onChange={handleChange} placeholder="กรอกคำถาม" disabled={isLoading} />
            </div>
            <div className="flex justify-end gap-2 border-t border-slate-200 px-5 py-4">
              <button className="rounded-md bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200" onClick={handleClose} disabled={isLoading}>ปิด</button>
              <button className="rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 disabled:opacity-60" onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? 'กำลังสร้างคำถาม...' : 'บันทึกการเปลี่ยนแปลง'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateQuestion;
