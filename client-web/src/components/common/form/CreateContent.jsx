import React, { useState } from 'react';
import Swal from 'sweetalert2';
import contentService from './../../../service/contentService';

const CreateContent = () => {
  const [contentData, setContentData] = useState({
    content_name: "",
    content_detail: ""
  });
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContentData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    Swal.fire({
      title: 'กำลังสร้างเนื้อหา...',
      text: 'โปรดรอสักครู่',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      await contentService.createContent(contentData);
      Swal.fire({
        icon: 'success',
        title: 'สร้างเนื้อหาเรียบร้อย',
        text: 'เนื้อหาของคุณถูกสร้างสำเร็จแล้ว!',
        confirmButtonText: 'ตกลง'
      }).then(() => {
        window.location.reload();
      });
      handleClose();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'มีปัญหาในการสร้างเนื้อหา',
        confirmButtonText: 'ลองอีกครั้ง'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button className="rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:opacity-60" onClick={handleShow}>
        เพิ่มเนื้อหา
      </button>

      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="w-full max-w-lg rounded-lg bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <h2 className="text-lg font-bold text-slate-950">สร้างเนื้อหาใหม่</h2>
              <button className="rounded-md px-2 py-1 text-slate-500 hover:bg-slate-100" onClick={handleClose}>ปิด</button>
            </div>
            <div className="space-y-4 px-5 py-4">
              <div>
                <label className="tw-label" htmlFor="contentName">ชื่อเนื้อหา</label>
                <input id="contentName" className="tw-field" type="text" name="content_name" value={contentData.content_name} onChange={handleChange} placeholder="กรอกชื่อเนื้อหา" />
              </div>
              <div>
                <label className="tw-label" htmlFor="contentDetail">รายละเอียดเนื้อหา</label>
                <textarea id="contentDetail" className="tw-field min-h-28" name="content_detail" value={contentData.content_detail} onChange={handleChange} placeholder="กรอกรายละเอียดเนื้อหา" />
              </div>
            </div>
            <div className="flex justify-end gap-2 border-t border-slate-200 px-5 py-4">
              <button className="rounded-md bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200" onClick={handleClose} disabled={isLoading}>ปิด</button>
              <button className="rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 disabled:opacity-60" onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? 'กำลังสร้างเนื้อหา...' : 'บันทึกการเปลี่ยนแปลง'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateContent;
