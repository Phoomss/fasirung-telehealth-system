import React from 'react'

const Header = () => {
    return (
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-sky-600">Fasirung Telehealth</p>
                    <h1 className="text-sm font-semibold text-slate-900 sm:text-base">
                        ระบบให้คำปรึกษาทางไกล คลินิกเทคนิคการแพทย์ฟ้าสีรุ้ง จังหวัดนครปฐม
                    </h1>
                </div>
            </div>
        </header>
    )
}

export default Header
