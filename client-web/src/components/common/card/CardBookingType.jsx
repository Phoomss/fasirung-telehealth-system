import React, { useEffect, useState } from 'react'
import bookingService from './../../../service/bookingService';
import { Badge } from '../../ui/Badge';

const CardBookingType = () => {
    const [count, setCount] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await bookingService.countBookingType();
                setCount(res.data.data);
            } catch (error) {
                console.error("Failed to fetch booking counts", error);
            }
        };
        fetchData();
    }, []);

    const bloodTestCount = count.find(item => item.booking_type === 'bloodTest')?._count?.booking_type || 0;
    const consultCount = count.find(item => item.booking_type === 'consult')?._count?.booking_type || 0;

    const cards = [
        { title: 'จองคิวเจาะเลือด', value: bloodTestCount, variant: 'sky', desc: 'รายการนัดตรวจวิเคราะห์' },
        { title: 'จองคิวปรึกษา', value: consultCount, variant: 'emerald', desc: 'รายการนัดแนะพูดคุย' }
    ];

    return (
        <div className="grid gap-4 sm:grid-cols-2 mb-6">
            {cards.map((card, idx) => (
                <div key={idx} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:scale-[1.01] duration-200">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{card.title}</p>
                    <div className="mt-4 flex items-baseline justify-between">
                        <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{card.value}</span>
                        <Badge variant={card.variant}>
                            {card.desc}
                        </Badge>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CardBookingType;
