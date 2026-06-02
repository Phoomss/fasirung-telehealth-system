import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import UserInfo from '../common/UserInfo';

const SideNav = () => {
    const navigate = useNavigate()
    const linkClass = ({ isActive }) =>
        `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition ${isActive
            ? 'bg-violet-600 text-white shadow-sm'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
        }`
    const sectionClass = "px-3 pt-5 pb-2 text-xs font-bold uppercase tracking-wide text-slate-400"

    const handleLogout = () => {
        Swal.fire({
            icon: 'warning',
            title: 'แน่ใจแล้วหรอที่จะออกจากระบบ',
            showCancelButton: true,
            confirmButtonText: 'กดเพื่อออกจากระบบ',
            cancelButtonText: 'กดยกเลิกยังไม่แน่ใจ'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear('token')
                Swal.fire({
                    icon: 'success',
                    title: 'ออกจากระบบสำเร็จ',
                    text: 'แล้วเจอกันใหม่สวัสดี',
                    timer: 1000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                })
                navigate('/')
            }
        })
    }

    return (
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-slate-200 bg-white lg:block">
            <div className="flex h-full flex-col gap-4 px-4 py-5">
                <div>
                    <p className="text-lg font-bold text-slate-950">Fasirung</p>
                    <p className="text-xs font-medium text-slate-500">Counselor workspace</p>
                </div>
                <UserInfo />
                <nav className="flex-1 overflow-y-auto">
                    <ul className="space-y-1">
                        <li className={sectionClass}>จัดการระบบ</li>
                        <li><NavLink to='/counselor/consult' className={linkClass}><span>เคส</span><span>จัดการเคสคนเข้าปรึกษา</span></NavLink></li>
                        <li className={sectionClass}>จัดการข้อมูล</li>
                        <li><NavLink to='/counselor/profile' className={linkClass}><span>ฉัน</span><span>ข้อมูลส่วนตัว</span></NavLink></li>
                        <li className={sectionClass}>ออกจากระบบ</li>
                        <li>
                            <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium text-rose-600 transition hover:bg-rose-50">
                                <span>ออก</span><span>ออกจากระบบ</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    )
}

export default SideNav
