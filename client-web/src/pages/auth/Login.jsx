import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import authService from '../../service/authService';
import Swal from 'sweetalert2';

const Login = () => {
    const [loginData, setLoginData] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await authService.login(loginData);
            const userRole = res.data.data.role;
            // console.log(res.data.data)
            localStorage.setItem("token", res.data.data.token);

            switch (userRole) {
                case "ADMIN":
                    Swal.fire({
                        icon: 'success',
                        title: 'เข้าสู่ระบบ',
                        text: 'ยินดีต้อนรับเข้าสู่ระบบ',
                        timer: 1000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    })
                    navigate('/admin/reservation');
                    break;
                case 'OFFICER':
                    Swal.fire({
                        icon: 'success',
                        title: 'เข้าสู่ระบบ',
                        text: 'ยินดีต้อนรับเข้าสู่ระบบ',
                        timer: 1000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    })
                    navigate('/officer/reservation');
                    break;
                case 'COUNSELOR':
                    Swal.fire({
                        icon: 'success',
                        title: 'เข้าสู่ระบบ',
                        text: 'ยินดีต้อนรับเข้าสู่ระบบ',
                        timer: 1000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    })
                    navigate('/counselor/consult');
                    break;
                default:
                    navigate('/');
                    break;
            }
        } catch (error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "เกิดข้อผิดพลาด!",
                text: "โปรดใส่ username และ password ให้ถูกต้อง",
                showConfirmButton: false,
                timer: 1000
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10'>
            <div className="w-full max-w-md">
                <div className="mb-6 text-center">
                    <p className="text-sm font-semibold uppercase tracking-wide text-sky-600">Fasirung Telehealth</p>
                    <h1 className="mt-2 text-2xl font-bold text-slate-950">ระบบให้คำปรึกษาทางไกล</h1>
                    <p className="mt-2 text-sm text-slate-600">สำหรับผู้รับบริการคลินิกเทคนิคการแพทย์ฟ้าสีรุ้งจังหวัดนครปฐม</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                        <p className="mb-5 text-center text-sm font-medium text-slate-600">ล็อกอินเพื่อเข้าสู่ระบบ</p>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="tw-label" htmlFor="username">Username</label>
                                <input
                                    id="username"
                                    type="username"
                                    className="tw-field"
                                    placeholder="username"
                                    name="username"
                                    value={loginData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="tw-label" htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    className="tw-field"
                                    placeholder="Password"
                                    name="password"
                                    value={loginData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <button type="submit" className="w-full rounded-md bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60" disabled={loading}>
                                    {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
                                </button>
                            </div>
                            <p className="text-center text-sm text-slate-600">
                                <NavLink to="/register" className="font-semibold text-sky-700 hover:text-sky-800">โปรดสมัครก่อนเข้าสู่ระบบ</NavLink>
                            </p>
                        </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
