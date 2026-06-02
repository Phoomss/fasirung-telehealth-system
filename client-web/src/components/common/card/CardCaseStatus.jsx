import React, { useEffect, useState } from 'react'
import caseService from './../../../service/caseService';

const CardCaseStatus = () => {
    const [count, setCount] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await caseService.caseCount();
                setCount(res.data.data);
            } catch (error) {
                console.error("Failed to fetch booking counts", error);
            }
        };
        fetchData();
    }, []);

    const completedCount = count.find(item => item.case_status === 'completed')?._count?.case_status || 0;
    const acceptingCount = count.find(item => item.case_status === 'accepting')?._count?.case_status || 0;

    const cards = [
        { title: 'รับเคส (กำลังดำเนินการ)', value: acceptingCount, color: 'text-amber-600 bg-amber-50 border-amber-100', desc: 'อยู่ระหว่างดำเนินการ' },
        { title: 'รับเข้าปรึกษาแล้ว (สำเร็จ)', value: completedCount, color: 'text-emerald-600 bg-emerald-50 border-emerald-100', desc: 'เสร็จสิ้นการบริการ' }
    ];

    return (
        <div className="grid gap-4 sm:grid-cols-2 mb-6">
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

export default CardCaseStatus;
