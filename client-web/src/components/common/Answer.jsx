import React, { useEffect, useState } from 'react'
import answerService from './../../service/answerService';
import Swal from 'sweetalert2';

const Answer = () => {
  const [answers, setAnswers] = useState([])
  const [filteredAnswer, setFilteredAnswer] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [currentAnswerId, setCurrentAnswerId] = useState(null);
  const [currentQuestionId, setCurrentQuestionId] = useState('');
  const [currentAnswerText, setCurrentAnswerText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await answerService.answerList()
        setAnswers(res.data.data)
        setFilteredAnswer(res.data.data)
      } catch (error) {
        setError("เกิดข้อผิดพลาดในการดึงข้อมูลคำถามและคำตอบ");
      }
    }
    fetchData()
  }, [])

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    filterAnswers(query, selectedQuestion);
  };

  const handleQuestionSelect = (e) => {
    const question = e.target.value;
    setSelectedQuestion(question);
    filterAnswers(searchQuery, question);
  };

  const filterAnswers = (query, question) => {
    const filtered = answers.filter(answer =>
      (answer.question.ques_name.toLowerCase().includes(query) ||
        answer.answer_text.toLowerCase().includes(query)) &&
      (question === '' || answer.question.ques_name === question)
    );
    setFilteredAnswer(filtered);
    setCurrentPage(1); // รีเซ็ตไปยังหน้าแรก
  };

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, Math.ceil(filteredAnswer.length / itemsPerPage)));
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAnswers = filteredAnswer.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredAnswer.length / itemsPerPage);

  const handleEdit = async (answerId) => {
    try {
      const res = await answerService.answerById(answerId);
      const answerDetail = res.data.data;

      const questionId = answerDetail?.question?.ques_name || '';
      const answerText = answerDetail?.answer_text || '';

      setCurrentAnswerId(answerId);
      setCurrentQuestionId(questionId);
      setCurrentAnswerText(answerText);

      const { value: formValues } = await Swal.fire({
        title: 'แก้ไขคำตอบ',
        html: `
          <div class="swal2-input-container">
            <input 
              id="swal-input-question" 
              disabled
              class="swal2-input" 
              value="${questionId}" 
              placeholder="คำถาม" 
              style="width: 70%; padding: 12px; font-size: 16px; margin-bottom: 15px; border-radius: 5px; border: 1px solid #ddd; box-sizing: border-box;"/>
            <input 
              id="swal-input-answer" 
              class="swal2-input" 
              value="${answerText}" 
              placeholder="คำตอบ" 
              style="width: 70%; padding: 12px; font-size: 16px; margin-bottom: 15px; border-radius: 5px; border: 1px solid #ddd; box-sizing: border-box;"/>
          </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'บันทึกการแก้ไข',
        cancelButtonText: 'ยกเลิก',
        focusConfirm: false,
        customClass: {
          popup: 'swal2-popup-edit',
          confirmButton: 'swal2-confirm-btn',
          cancelButton: 'swal2-cancel-btn',
        },
        preConfirm: () => {
          const questionId = document.getElementById('swal-input-question').value;
          const answerText = document.getElementById('swal-input-answer').value;
          return { questionId, answerText };
        }
      });

      if (formValues) {
        const { answerText } = formValues;
        const response = await answerService.updateAnswer(answerId, { answer_text: answerText });

        if (response.status === 200) {
          const updatedAnswers = answers.map(answer =>
            answer.id === answerId ? { ...answer, answer_text: answerText } : answer
          );
          setAnswers(updatedAnswers);
          setFilteredAnswer(updatedAnswers);

          Swal.fire('สำเร็จ!', 'คำตอบของคุณได้รับการอัปเดตแล้ว', 'success');
        } else {
          Swal.fire('เกิดข้อผิดพลาด!', 'ไม่สามารถอัปเดตคำตอบได้', 'error');
        }
      }
    } catch (error) {
      Swal.fire('เกิดข้อผิดพลาด!', 'ไม่สามารถดึงข้อมูลคำตอบมาแก้ไขได้', 'error');
    }
  };


  const handleDelete = async (answerId) => {
    const confirm = await Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: "การลบนี้จะไม่สามารถย้อนกลับได้!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่, ลบเลย!'
    });

    if (confirm.isConfirmed) {
      try {
        await answerService.deleteAnswer(answerId);
        const res = await answerService.answerList();
        setAnswers(res.data.data);
        setFilteredAnswer(res.data.data);

        Swal.fire('ลบแล้ว!', 'คำตอบของคุณถูกลบเรียบร้อยแล้ว', 'success');
      } catch (error) {
        Swal.fire('เกิดข้อผิดพลาด!', 'เกิดข้อผิดพลาดในการลบคำตอบ', 'error');
      }
    }
  };
  return (
    <div className='mt-4'>
      {error && <div className="mb-4 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">{error}</div>}
      <div className="mb-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <input
              type="text"
              placeholder="ค้นหาคำถามหรือคำตอบ..."
              value={searchQuery}
              onChange={handleSearch}
              className="tw-field"
            />
          </div>

          <div>
            <select
              className="tw-field"
              value={selectedQuestion}
              onChange={handleQuestionSelect}
              aria-label="เลือกคำถาม"
            >
              <option value="">-- เลือกคำถาม --</option>
              {[...new Set(answers.map(answer => answer.question.ques_name))].map((ques_name, index) => (
                <option key={index} value={ques_name}>
                  {ques_name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-center text-sm">
          <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr className="border-b border-slate-200">
              <th className="px-4 py-3" scope="col">#</th>
              <th className="px-4 py-3" scope="col">คำถาม</th>
              <th className="px-4 py-3" scope="col">คำตอบ</th>
              <th className="px-4 py-3" scope="col">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {currentAnswers.length > 0 ? (
              currentAnswers.map((answer, index) => (
                <tr key={answer.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">{indexOfFirstItem + index + 1}</td>
                  <td className="px-4 py-3">
                    {answer.question.ques_name}
                  </td>
                  <td className="px-4 py-3">
                    {answer.answer_text}
                  </td>
                  <td className="space-x-2 px-4 py-3">
                    <button className="rounded-md bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 hover:bg-sky-100" onClick={() => handleEdit(answer.id)}>แก้ไข</button>{' '}
                    <button className="rounded-md bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100" onClick={() => handleDelete(answer.id)}>ลบ</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-8 text-slate-500" colSpan="4">ไม่พบข้อมูล</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredAnswer.length > 0 && (
        <nav className="mt-4 flex justify-end" aria-label="Page navigation">
          <ul className="flex items-center gap-1">
            <li>
              <button className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50" disabled={currentPage === 1} onClick={handlePreviousPage}>ก่อนหน้า</button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <button className={`rounded-md px-3 py-1.5 text-sm font-semibold ${currentPage === index + 1 ? 'bg-sky-600 text-white' : 'border border-slate-200 bg-white text-slate-700'}`} onClick={() => handlePageClick(index + 1)}>{index + 1}</button>
              </li>
            ))}
            <li>
              <button className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50" disabled={currentPage === totalPages} onClick={handleNextPage}>ถัดไป</button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  )
}

export default Answer
