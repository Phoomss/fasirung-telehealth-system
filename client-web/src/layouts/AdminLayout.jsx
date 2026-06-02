import { Outlet } from "react-router-dom"
import SideNav from "../components/admin/SideNav"
import Header from "../components/Header"
import Footer from "../components/Footer"

const AdminLayout = () => {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <SideNav />
            <div className="min-h-screen lg:pl-72">
                <Header />
                <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    )
}

export default AdminLayout
