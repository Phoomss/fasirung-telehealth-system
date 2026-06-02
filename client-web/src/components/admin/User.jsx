import React, { useEffect, useState } from 'react';
import userService from './../../service/userService';
import { useNavigate } from 'react-router-dom';
import { Shield, UserCheck, Stethoscope, User as UserIcon } from 'lucide-react';
import { Badge } from '../ui/Badge';

const User = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await userService.userList();
      setUsers(res.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(users.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleEdit = async (userId) => {
    navigate(`/admin/user/detail/${userId}`);
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'ADMIN':
        return (
          <Badge variant="sky" icon={<Shield size={12} className="stroke-[2.5]" />}>
            ผู้ดูแลระบบ
          </Badge>
        );
      case 'OFFICER':
        return (
          <Badge variant="emerald" icon={<UserCheck size={12} className="stroke-[2.5]" />}>
            เจ้าหน้าที่
          </Badge>
        );
      case 'COUNSELOR':
      case 'PHYSICIAN':
        return (
          <Badge variant="violet" icon={<Stethoscope size={12} className="stroke-[2.5]" />}>
            ผู้ให้คำปรึกษา
          </Badge>
        );
      default:
        return (
          <Badge variant="slate" icon={<UserIcon size={12} className="stroke-[2.5]" />}>
            ผู้ใช้งานทั่วไป
          </Badge>
        );
    }
  };

  return (
    <div className="table-responsive rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
      <table className="w-full text-left text-sm text-slate-600 border-collapse">
        <thead className="bg-slate-50/70 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200">
          <tr>
            <th scope="col" className="px-6 py-4 text-center">#</th>
            <th scope="col" className="px-6 py-4">ชื่อ-นามสกุล</th>
            <th scope="col" className="px-6 py-4">เบอร์โทรศัพท์</th>
            <th scope="col" className="px-6 py-4 text-center">บทบาท / สถานะ</th>
            <th scope="col" className="px-6 py-4 text-center">การจัดการ</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {currentUsers.length > 0 ? (
            currentUsers.map((user, index) => (
              <tr key={user.id} className="hover:bg-slate-50/50 transition duration-150">
                <td className="px-6 py-4 text-center font-medium text-slate-400">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                <td className="px-6 py-4 font-semibold text-slate-900">{user.full_name}</td>
                <td className="px-6 py-4 font-medium text-slate-600">{user.phone}</td>
                <td className="px-6 py-4 text-center">{getRoleBadge(user.role)}</td>
                <td className="px-6 py-4 text-center">
                  <button 
                    className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-sky-700 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
                    onClick={() => handleEdit(user.id)}
                  >
                    แก้ไขรายละเอียด
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-10 text-center text-slate-400 font-medium">ไม่พบข้อมูลผู้ใช้ในระบบ</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <nav aria-label="Page navigation" className="flex items-center justify-between border-t border-slate-100 bg-white px-6 py-4 flex-wrap gap-4">
        <div className="text-xs text-slate-500 font-medium">
          แสดงรายการที่ {indexOfFirstItem + 1} ถึง {Math.min(indexOfLastItem, users.length)} จากทั้งหมด {users.length} รายการ
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
          {Array.from({ length: Math.ceil(users.length / itemsPerPage) }, (_, index) => (
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
              disabled={currentPage === Math.ceil(users.length / itemsPerPage)}
            >
              ถัดไป
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default User;
