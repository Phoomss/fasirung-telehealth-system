import React, { useEffect, useState } from 'react';
import caseService from './../../service/caseService';
import Swal from 'sweetalert2';
import { CheckCircle2 } from 'lucide-react';
import { Badge } from '../ui/Badge';

const Consult = () => {
  const [cases, setCases] = useState([]);
  const [filteredCase, setFilteredCase] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchStatus, setSearchStatus] = useState('');

  const fetchCase = async () => {
    try {
      const res = await caseService.caseList();
      setCases(res.data.data);
      setFilteredCase(res.data.data);
    } catch (error) {
      setError('Error fetching cases');
    }
  };

  useEffect(() => {
    fetchCase();
  }, []);

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, Math.ceil(filteredCase.length / itemsPerPage)));
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = () => {
    if (searchStatus === '') {
      setFilteredCase(cases);
    } else {
      const filtered = cases.filter(caseItem => caseItem.case_status === searchStatus);
      setFilteredCase(filtered);
    }
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCases = filteredCase.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredCase.length / itemsPerPage);

  const handleDelete = async (caseId) => {
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
        await caseService.deleteCase(caseId);
        const res = await caseService.caseList();
        setCases(res.data.data);
        setFilteredCase(res.data.data);

        Swal.fire('ลบแล้ว!', 'เคสของคุณถูกลบเรียบร้อยแล้ว', 'success');
      } catch (error) {
        Swal.fire('เกิดข้อผิดพลาด!', 'เกิดข้อผิดพลาดในการลบเคส', 'error');
      }
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'accepting') {
      return (
        <Badge variant="amber" dot={true} pulsing={true}>
          กำลังดำเนินการ
        </Badge>
      );
    }
    return (
      <Badge variant="emerald" icon={<CheckCircle2 size={12} className="stroke-[2.5]" />}>
        ปรึกษาเสร็จสิ้น
      </Badge>
    );
  };

  return (
    <div className="tb-assment-response mt-3">
      {error && <div className="p-3 mb-4 text-sm text-rose-700 bg-rose-50 border border-rose-100 rounded-lg">{error}</div>}

      <div className="mb-4">
        <label htmlFor="searchStatus" className="block text-sm font-semibold text-gray-700 mb-1 text-start">ค้นหาตามสถานะเคส:</label>
        <select
          id="searchStatus"
          className="form-select w-full max-w-xs border border-gray-300 rounded-[var(--radius-interactive)] focus:ring-1 focus:ring-[var(--color-brand-500)] focus:border-[var(--color-brand-500)] shadow-sm bg-white p-2"
          value={searchStatus}
          onChange={(e) => {
            setSearchStatus(e.target.value);
            handleSearch();
          }}
        >
          <option value="">ทั้งหมด</option>
          <option value="accepting">กำลังดำเนินการ</option>
          <option value="completed">ปรึกษาเสร็จสิ้น</option>
        </select>
      </div>

      <div className="table-responsive rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600 border-collapse">
          <thead className="bg-slate-50/70 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200">
            <tr>
              <th scope="col" className="px-6 py-4 text-center">#</th>
              <th scope="col" className="px-6 py-4">ผู้จองเข้าปรึกษา</th>
              <th scope="col" className="px-6 py-4">เจ้าหน้าที่รับเคส</th>
              <th scope="col" className="px-6 py-4">เจ้าหน้าที่ให้คำปรึกษา</th>
              <th scope="col" className="px-6 py-4 text-center">สถานะเคส</th>
              <th scope="col" className="px-6 py-4 text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentCases.length > 0 ? (
              currentCases.map((caseItem, index) => (
                <tr key={caseItem.id} className="hover:bg-slate-50/50 transition duration-150">
                  <td className="px-6 py-4 text-center font-medium text-slate-400">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="px-6 py-4 font-semibold text-slate-900">{caseItem.booking.user.title} {caseItem.booking.user.full_name}</td>
                  <td className="px-6 py-4 font-medium text-slate-600">{caseItem.officer.title} {caseItem.officer.full_name}</td>
                  <td className="px-6 py-4 font-medium text-slate-600">{caseItem.physician.title} {caseItem.physician.full_name}</td>
                  <td className="px-6 py-4 text-center">{getStatusBadge(caseItem.case_status)}</td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      className="inline-flex items-center justify-center rounded-lg bg-rose-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-rose-700 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
                      onClick={() => handleDelete(caseItem.id)}
                    >
                      ลบข้อมูล
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-10 text-center text-slate-400 font-medium">ไม่มีข้อมูลการประเมินในระบบ</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {filteredCase.length > 0 && (
          <nav aria-label="Page navigation" className="flex items-center justify-between border-t border-slate-100 bg-white px-6 py-4 flex-wrap gap-4">
            <div className="text-xs text-slate-500 font-medium">
              แสดงรายการที่ {indexOfFirstItem + 1} ถึง {Math.min(indexOfLastItem, filteredCase.length)} จากทั้งหมด {filteredCase.length} รายการ
            </div>
            <ul className="flex items-center gap-1.5">
              <li>
                <button 
                  className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  ก่อนหน้า
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index}>
                  <button 
                    className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold cursor-pointer transition ${
                      currentPage === index + 1 
                        ? 'bg-sky-600 text-white shadow-xs' 
                        : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                    onClick={() => handlePageClick(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li>
                <button 
                  className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  ถัดไป
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Consult;
