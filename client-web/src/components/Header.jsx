import React from 'react'

const Header = ({ onMenuClick }) => {
    return (
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3">
                    <button 
                        onClick={onMenuClick}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900 lg:hidden cursor-pointer"
                        aria-label="Open navigation menu"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-sky-600">Fasirung Telehealth</p>
                        <h1 className="text-sm font-semibold text-slate-900 sm:text-base">
                            ระบบให้คำปรึกษาทางไกล คลินิกเทคนิคการแพทย์ฟ้าสีรุ้ง จังหวัดนครปฐม
                        </h1>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
