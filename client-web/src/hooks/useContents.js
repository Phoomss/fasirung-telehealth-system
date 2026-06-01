import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import contentService from '../service/contentService';

export const useContents = (itemsPerPage = 10) => {
  const [contents, setContents] = useState([]);
  const [filteredContent, setFilteredContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchContents = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await contentService.contentList();
      setContents(res.data.data || []);
      setFilteredContent(res.data.data || []);
    } catch (err) {
      console.error(err);
      setError("เกิดข้อผิดพลาดในการดึงข้อมูลคอนเทนท์");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContents();
  }, []);

  // Pagination Arithmetic
  const totalPages = Math.ceil(filteredContent.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentContents = filteredContent.slice(indexOfFirstItem, indexOfLastItem);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = async (contentId) => {
    try {
      const res = await contentService.contentDetail(contentId);
      const contentDetail = res.data.data;

      const { value: formValues } = await Swal.fire({
        title: 'แก้ไขคอนเทนท์',
        html: `
          <div class="swal2-input-container">
            <input 
              id="swal-input-name" 
              class="swal2-input" 
              value="${contentDetail.content_name}" 
              placeholder="ชื่อคอนเทนท์" 
              style="width: 70%; padding: 12px; font-size: 16px; margin-bottom: 15px; border-radius: 5px; border: 1px solid #ddd; box-sizing: border-box;"/>
            <textarea 
              id="swal-input-detail" 
              class="swal2-textarea" 
              placeholder="รายละเอียดคอนเทนท์" 
              style="width: 70%; padding: 12px; font-size: 16px; margin-bottom: 15px; border-radius: 5px; border: 1px solid #ddd; box-sizing: border-box; height: 120px;">${contentDetail.content_detail}</textarea>
          </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'บันทึกการแก้ไข',
        cancelButtonText: 'ยกเลิก',
        focusConfirm: false,
        preConfirm: () => {
          const contentName = document.getElementById('swal-input-name').value;
          const contentDetail = document.getElementById('swal-input-detail').value;
          return { contentName, contentDetail };
        }
      });

      if (formValues) {
        const { contentName, contentDetail } = formValues;
        if (contentName && contentDetail) {
          await contentService.updateContent(contentId, {
            content_name: contentName,
            content_detail: contentDetail
          });

          const updated = contents.map((c) =>
            c.id === contentId
              ? { ...c, content_name: contentName, content_detail: contentDetail }
              : c
          );
          setContents(updated);
          setFilteredContent(updated);

          Swal.fire('สำเร็จ!', 'คอนเทนท์ของคุณได้รับการอัปเดตแล้ว', 'success');
        } else {
          Swal.fire('ข้อผิดพลาด!', 'กรุณากรอกข้อมูลให้ครบถ้วน', 'error');
        }
      }
    } catch (err) {
      console.error(err);
      Swal.fire('เกิดข้อผิดพลาด!', 'ไม่สามารถดึงข้อมูลคอนเทนท์มาแก้ไขได้', 'error');
    }
  };

  const handleDelete = async (contentId) => {
    const confirm = await Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: "การลบนี้จะไม่สามารถย้อนกลับได้!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่, ลบเลย!',
      cancelButtonText: 'ยกเลิก'
    });

    if (confirm.isConfirmed) {
      try {
        await contentService.deteleContent(contentId);
        const updated = contents.filter((c) => c.id !== contentId);
        setContents(updated);
        setFilteredContent(updated);

        Swal.fire('ลบแล้ว!', 'คอนเทนท์ของคุณถูกลบเรียบร้อยแล้ว', 'success');
      } catch (err) {
        console.error(err);
        Swal.fire('เกิดข้อผิดพลาด!', 'เกิดข้อผิดพลาดในการลบคอนเทนท์', 'error');
      }
    }
  };

  const handleViewDetails = async (contentId) => {
    try {
      const res = await contentService.contentDetail(contentId);
      const contentDetail = res.data.data;

      Swal.fire({
        title: `<strong>${contentDetail.content_name}</strong>`,
        html: `<p style="text-align: left; line-height: 1.6;">${contentDetail.content_detail}</p>`,
        confirmButtonText: 'ปิด',
      });
    } catch (err) {
      console.error(err);
      Swal.fire('เกิดข้อผิดพลาด!', 'เกิดข้อผิดพลาดในการดึงข้อมูลคอนเทนท์', 'error');
    }
  };

  return {
    contents,
    filteredContent,
    currentContents,
    isLoading,
    error,
    currentPage,
    totalPages,
    indexOfFirstItem,
    handlePreviousPage,
    handleNextPage,
    handlePageClick,
    handleEdit,
    handleDelete,
    handleViewDetails,
    refreshContents: fetchContents
  };
};

export default useContents;
