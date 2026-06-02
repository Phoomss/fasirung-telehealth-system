import React, { useEffect, useState } from 'react';
import userService from './../../../service/userService';

const CardUser = () => {
    const [count, setCount] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await userService.userCount();
                setCount(res.data.data);
                setTotalUsers(res.data.totalUsers);
            } catch (error) {
                console.error("Failed to fetch user counts", error);
            }
        };
        fetchData();
    }, []);

    const officerCount = count.find(item => item.role === 'OFFICER')?._count?.role || 0;
    const physicianCount = count.find(item => item.role === 'PHYSICIAN')?._count?.role || 0;
    const userCount = count.find(item => item.role === 'USER')?._count?.role || 0;

    const cards = [
        { title: 'ผู้ใช้งานระบบทั้งหมด', value: totalUsers, color: 'text-sky-600 bg-sky-50 border-sky-100', desc: 'ยอดบัญชีในระบบ' },
        { title: 'ผู้ใช้งาน', value: userCount, color: 'text-emerald-600 bg-emerald-50 border-emerald-100', desc: 'ผู้รับบริการทั่วไป' },
        { title: 'เจ้าหน้าที่', value: officerCount, color: 'text-amber-600 bg-amber-50 border-amber-100', desc: 'เจ้าหน้าที่ควบคุมระบบ' },
        { title: 'เจ้าหน้าที่ให้คำปรึกษา', value: physicianCount, color: 'text-violet-600 bg-violet-50 border-violet-100', desc: 'ผู้เชี่ยวชาญให้คำแนะนำ' }
    ];

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
            {cards.map((card, idx) => (
                <div key={idx} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:scale-[1.01] duration-200">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{card.title}</p>
                    <div className="mt-4 flex items-baseline justify-between">
                        <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{card.value}</span>
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${card.color} border`}>
                            {card.desc}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CardUser;
