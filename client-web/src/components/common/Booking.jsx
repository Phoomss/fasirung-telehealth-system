import React from 'react';
import useBookings from '../../hooks/useBookings';
import { Table } from '../ui/Table';
import { Droplet, MessageSquare } from 'lucide-react';
import { Badge } from '../ui/Badge';

const Booking = () => {
  const {
    currentBookings,
    isLoading,
    error,
    currentPage,
    totalPages,
    indexOfFirstItem,
    searchType,
    setSearchType,
    handlePreviousPage,
    handleNextPage,
    handlePageClick,
    filteredBookings
  } = useBookings(10);

  // Define column mappings for our atomic Table component
  const columns = [
    {
      header: '#',
      accessor: (item) => (
        <span className="font-semibold text-gray-500">
          {indexOfFirstItem + currentBookings.indexOf(item) + 1}
        </span>
      ),
      width: '80px'
    },
    {
      header: 'ข้อมูลผู้นัดหมาย',
      accessor: (item) => (
        <div className="text-start">
          <div className="font-semibold text-gray-800">{item.user?.title}{item.user?.full_name}</div>
          <div className="text-sm text-gray-500">โทรศัพท์: {item.user?.phone}</div>
        </div>
      )
    },
    {
      header: 'ประเภทการนัดหมาย',
      accessor: (item) => (
        item.booking_type === 'bloodTest' ? (
          <Badge variant="sky" icon={<Droplet size={12} className="stroke-[2.5]" />}>
            จองคิวเจาะเลือด
          </Badge>
        ) : (
          <Badge variant="emerald" icon={<MessageSquare size={12} className="stroke-[2.5]" />}>
            จองคิวปรึกษา
          </Badge>
        )
      ),
      width: '200px'
    },
    {
      header: 'วันที่และเวลานัดหมาย',
      accessor: (item) => (
        <span className="text-gray-600 font-medium">
          {new Date(item.appointment).toLocaleString('th-TH', {
            dateStyle: 'medium',
            timeStyle: 'short'
          })}
        </span>
      ),
      width: '240px'
    },
    {
      header: 'รายละเอียด',
      accessor: (item) => (
        <span className="text-start text-gray-600 italic block">
          {item.booking_detail || "-"}
        </span>
      )
    }
  ];

  return (
    <div className='tb-content mt-3'>
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Search Dropdown for booking_type */}
      <div className="mb-4">
        <label htmlFor="bookingType" className="block text-sm font-semibold text-gray-700 mb-1 text-start">
          ค้นหาตามประเภทการนัดหมาย:
        </label>
        <select
          id="bookingType"
          className="form-select w-full max-w-xs border border-gray-300 rounded-[var(--radius-interactive)] focus:ring-1 focus:ring-[var(--color-brand-500)] focus:border-[var(--color-brand-500)] shadow-sm bg-white p-2"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="">ทั้งหมด</option>
          <option value="bloodTest">จองคิวเจาะเลือด</option>
          <option value="consult">จองคิวปรึกษา</option>
        </select>
      </div>

      {/* Reusable, Virtualized Table Component */}
      <Table
        data={currentBookings}
        columns={columns}
        isLoading={isLoading}
        emptyMessage="ไม่พบข้อมูลการนัดหมาย"
      />

      {!isLoading && filteredBookings.length > 0 && (
        <nav aria-label="Page navigation" className="mt-4">
          <ul className="pagination justify-content-end mb-0">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link shadow-none" onClick={handlePreviousPage}>ก่อนหน้า</button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="page-link shadow-none" onClick={() => handlePageClick(index + 1)}>{index + 1}</button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link shadow-none" onClick={handleNextPage}>ถัดไป</button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Booking;
