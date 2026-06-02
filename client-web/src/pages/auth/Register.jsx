import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../service/authService'; // ปรับเส้นทางตามที่จำเป็น
import Swal from 'sweetalert2';

const Register = () => {
    const [signupData, setSignupData] = useState({
        title: '',  // เก็บคำนำหน้า
        full_name: '',
        phone: '',
        age: '',
        username: '',
        password: '',
        confirmPassword: "",
        role: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupData({ ...signupData, [name]: value }); // ใช้ signupData แทน registerData
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (signupData.password !== signupData.confirmPassword) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "เกิดข้อผิดพลาด!",
                text: "รหัสผ่านไม่ตรงกัน",
                showConfirmButton: false,
                timer: 1000
            });
            setLoading(false);
            return;
        }

        try {
            await authService.signup(signupData); // สมมติว่า authService มีเมธอด register
            Swal.fire({
                position: "center",
                icon: "success",
                title: "ลงทะเบียนสำเร็จ!",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/');
        } catch (error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "เกิดข้อผิดพลาด!",
                text: "การลงทะเบียนล้มเหลว",
                showConfirmButton: false,
                timer: 1500
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10'>
            <div className="w-full max-w-2xl">
                <div className="mb-6 text-center">
                    <p className="text-sm font-semibold uppercase tracking-wide text-sky-600">Fasirung Telehealth</p>
                    <h1 className="mt-2 text-2xl font-bold text-slate-950">ระบบให้คำปรึกษาทางไกล</h1>
                    <p className="mt-2 text-sm text-slate-600">สำหรับผู้รับบริการคลินิกเทคนิคการแพทย์ฟ้าสีรุ้งจังหวัดนครปฐม</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                        <p className="mb-5 text-center text-sm font-medium text-slate-600">สมัครใช้งานเพื่อเป็นสมาชิกระบบ</p>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="grid gap-4 sm:grid-cols-3">
                                <div>
                                    <label className="tw-label" htmlFor="title">คำนำหน้า</label>
                                        <select
                                            id="title"
                                            className="tw-field"
                                            name="title"
                                            value={signupData.title}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="" disabled>เลือกคำนำหน้า</option>
                                            <option value="นาย.">นาย.</option>
                                            <option value="นาง.">นาง.</option>
                                            <option value="น.ส.">น.ส.</option>
                                            <option value="Mr.">Mr.</option>
                                            <option value="Ms.">Ms.</option>
                                        </select>
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="tw-label" htmlFor="full_name">ชื่อเต็ม</label>
                                        <input
                                            id="full_name"
                                            type="text"
                                            className="tw-field"
                                            placeholder="ชื่อเต็ม"
                                            name="full_name"
                                            value={signupData.full_name}
                                            onChange={handleChange}
                                            required
                                        />
                                </div>
                            </div>

                            <div>
                                <label className="tw-label" htmlFor="reg_username">ชื่อผู้ใช้</label>
                                <input
                                    id="reg_username"
                                    type="username"
                                    className="tw-field"
                                    placeholder="ชื่อผู้ใช้"
                                    name="username"
                                    value={signupData.username}  
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label className="tw-label" htmlFor="reg_password">รหัสผ่าน</label>
                                <input
                                    id="reg_password"
                                    type="password"
                                    className="tw-field"
                                    placeholder="รหัสผ่าน"
                                    name="password"
                                    value={signupData.password}  // การผูกข้อมูลที่ถูกต้อง
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="tw-label" htmlFor="confirmPassword">พิมพ์รหัสผ่านอีกครั้ง</label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    className="tw-field"
                                    placeholder="พิมพ์รหัสผ่านอีกครั้ง"
                                    name="confirmPassword"
                                    value={signupData.confirmPassword}  // การผูกข้อมูลที่ถูกต้อง
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label className="tw-label" htmlFor="phone">เบอร์โทรศัพท์</label>
                                <input
                                    id="phone"
                                    type="tel"
                                    className="tw-field"
                                    placeholder="เบอร์โทรศัพท์"
                                    name="phone"  // ชื่อฟิลด์ที่ถูกต้อง
                                    value={signupData.phone}  // การผูกข้อมูลที่ถูกต้อง
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="tw-label" htmlFor="role">บทบาท</label>
                                <select
                                    id="role"
                                    className="tw-field"
                                    name="role"
                                    value={signupData.role}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>เลือกบทบาท</option>
                                    <option value="OFFICER">เจ้าหน้าที่</option>
                                    <option value="COUNSELOR">เจ้าหน้าที่ให้คำปรึกษา</option>
                                </select>
                            </div>
                            </div>
                            <div>
                                <label className="tw-label" htmlFor="age">อายุ</label>
                                <input
                                    id="age"
                                    type="number"
                                    className="tw-field"
                                    placeholder="อายุ"
                                    name="age"
                                    value={signupData.age}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                    <button type="submit" className="w-full rounded-md bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60" disabled={loading}>
                                        {loading ? 'กำลังลงทะเบียน...' : 'ลงทะเบียน'}
                                    </button>
                            </div>
                        </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
