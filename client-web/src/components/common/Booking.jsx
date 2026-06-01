import React from 'react';
import useBookings from '../../hooks/useBookings';

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

  return (
    <div className='tb-content mt-3'>
      {error && <div className="alert alert-danger">{error}</div>}
      {isLoading && (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">กำลังโหลด...</span>
          </div>
        </div>
      )}

      {/* Search Dropdown for booking_type */}
      <div className="mb-3">
        <label htmlFor="bookingType" className="form-label font-semibold">ค้นหาตามประเภทการนัดหมาย:</label>
        <select
          id="bookingType"
          className="form-select border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="">ทั้งหมด</option>
          <option value="bloodTest">จองคิวเจาะเลือด</option>
          <option value="consult">จองคิวปรึกษา</option>
        </select>
      </div>

      <div className="table-responsive shadow-sm rounded-lg overflow-hidden border border-gray-200">
        <table className="table table-bordered table-gray table-striped text-center align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th scope="col" style={{ width: '80px' }}>#</th>
              <th scope="col">ข้อมูลผู้นัดหมาย</th>
              <th scope="col" style={{ width: '200px' }}>ประเภทการนัดหมาย</th>
              <th scope="col" style={{ width: '240px' }}>วันที่และเวลานัดหมาย</th>
              <th scope="col">รายละเอียด</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading && currentBookings.length > 0 ? (
              currentBookings.map((booking, index) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="font-semibold text-gray-500">{indexOfFirstItem + index + 1}</td>
                  <td className="text-start">
                    <div className="font-semibold text-gray-800">{booking.user.title}{booking.user.full_name}</div>
                    <div className="text-sm text-gray-500">โทรศัพท์: {booking.user.phone}</div>
                  </td>
                  <td>
                    <span className={`badge ${booking.booking_type === 'bloodTest' ? 'bg-info text-dark' : 'bg-primary'}`}>
                      {booking.booking_type === 'bloodTest' ? 'จองคิวเจาะเลือด' : 'จองคิวปรึกษา'}
                    </span>
                  </td>
                  <td className="text-gray-600 font-medium">
                    {new Date(booking.appointment).toLocaleString('th-TH', {
                      dateStyle: 'medium',
                      timeStyle: 'short'
                    })}
                  </td>
                  <td className="text-start text-gray-600 italic">
                    {booking.booking_detail || "-"}
                  </td>
                </tr>
              ))
            ) : !isLoading ? (
              <tr>
                <td colSpan="5" className="text-muted py-4">ไม่พบข้อมูลการนัดหมาย</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      {!isLoading && filteredBookings.length > 0 && (
        <nav aria-label="Page navigation" className="mt-3">
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
