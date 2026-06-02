import React, { useEffect, useState } from 'react';
import userService from '../../service/userService';

const UserInfo = () => {
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await userService.userInfo();
                setUserInfo(res.data.data);
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="rounded-lg border border-sky-100 bg-sky-50/80 p-4">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-600 text-sm font-bold text-white">
                    {userInfo.full_name ? userInfo.full_name.charAt(0) : 'U'}
                </div>
                <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-950">{userInfo.title}{userInfo.full_name}</p>
                    <p className="mt-1 inline-flex rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-sky-700 ring-1 ring-sky-200">
                        {userInfo.role || 'USER'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
