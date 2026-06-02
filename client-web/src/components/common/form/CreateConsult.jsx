import React, { useEffect, useState } from 'react';
import userService from './../../../service/userService';
import bookingService from '../../../service/bookingService';
import Swal from 'sweetalert2';
import caseService from '../../../service/caseService';

const CreateConsult = () => {
  const [caseData, setCaseData] = useState({
    bookingId: '',
    officerId: '',
    physicianId: '',
    case_status: 'accepting',
  });
  const [bookings, setBookings] = useState([]);
  const [physicians, setPhysicians] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const resBooking = await bookingService.searchBookingConsult();
      setBookings(resBooking.data.data);

      const resUserInfo = await userService.userInfo();
      setUser(resUserInfo.data.data);
      setCaseData((prev) => ({
        ...prev,
        officerId: resUserInfo.data.data.id,
      }));

      const resPhysician = await userService.searchRolePhysician();
      setPhysicians(resPhysician.data.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Error loading data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCaseData({ ...caseData, [name]: value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    // Ensure necessary fields are present
    if (!caseData.bookingId || !caseData.physicianId) {
      setError("Please select both a booking and a physician.");
      setIsLoading(false);
      return;
    }

    console.log(caseData); // Inspect caseData before submission
    try {
      await caseService.createCase(caseData);
      Swal.fire({
        title: 'สำเร็จ!',
        text: 'สร้างเคสเรียบร้อยแล้ว',
        icon: 'success',
        confirmButtonText: 'ตกลง'
      }).then(() => {
        window.location.reload(); // Reload the page after success
      });
      handleClose();
    } catch (err) {
      console.error("Error creating case:", err);
      setError("Failed to create case. Please check your inputs and try again.");
      Swal.fire({
        title: 'เกิดข้อผิดพลาด!',
        text: 'ไม่สามารถสร้างเคสได้ โปรดตรวจสอบข้อมูลอีกครั้ง',
        icon: 'error',
        confirmButtonText: 'ตกลง'
      });
    } finally {
      setIsLoading(false);
    }
  };



  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <button className="rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700" onClick={handleShow}>
        เพิ่มเคสคนเขาปรึกษา
      </button>

      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <h2 className="text-lg font-bold text-slate-950">สร้างเคสคนเขาปรึกษา</h2>
              <button className="rounded-md px-2 py-1 text-slate-500 hover:bg-slate-100" onClick={handleClose}>ปิด</button>
            </div>
            <div className="px-5 py-4">
          {isLoading ? (
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-sky-600" />
          ) : (
            <>
              {error && <div className="mb-4 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">{error}</div>}
              <div className="space-y-4">
                <div>
                  <label className="tw-label">เลือกการจอง</label>
                  <select
                    className="tw-field"
                    name="bookingId"
                    value={caseData.bookingId}
                    onChange={handleInputChange}
                  >
                    <option value="">เลือกการจอง</option>
                    {bookings.map((booking) => {
                      const appointmentDate = new Date(booking.appointment);
                      const formattedDate = appointmentDate.toLocaleDateString('th-TH', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit'
                      });
                      const formattedTime = appointmentDate.toLocaleTimeString('th-TH', {
                        hour: '2-digit',
                        minute: '2-digit'
                      });

                      return (
                        <option key={booking.id} value={booking.id}>
                          {booking.user.full_name} - {booking.booking_type === 'consult' ? 'เข้าปรึกษา' : booking.booking_type} - {formattedDate} {formattedTime}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div>
                  <label className="tw-label">เลือกเจ้าหน้าที่ให้คำปรึกษา</label>
                  <select
                    className="tw-field"
                    name="physicianId"
                    value={caseData.physicianId}
                    onChange={handleInputChange}
                  >
                    <option value="">เลือกเจ้าหน้าที่ให้คำปรึกษา</option>
                    {physicians.map((physician) => (
                      <option key={physician.id} value={physician.id}>
                        {physician.title} {physician.full_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="tw-label">สถานะเคส</label>
                  <input
                    className="tw-field"
                    type="text"
                    name="case_status"
                    value={caseData.case_status === 'accepting' ? 'accepting' : 'รับเคส'}
                    disabled
                  />
                </div>

                <div>
                  <label className="tw-label" htmlFor="contentName">ชื่อผู้รับเคส</label>
                  <input
                    id="contentName"
                    className="tw-field"
                    type="text"
                    name="officerId"
                    value={user ? user.full_name : ''}
                    disabled
                  />
                </div>
              </div>
            </>
          )}
            </div>
            <div className="flex justify-end gap-2 border-t border-slate-200 px-5 py-4">
          <button className="rounded-md bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200" onClick={handleClose}>
            ปิด
          </button>
          <button
            className="rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={handleSubmit}
            disabled={isLoading || !caseData.bookingId || !caseData.physicianId}
          >
            {isLoading ? "กำลังบันทึก..." : "บันทึกเคส"}
          </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateConsult;
