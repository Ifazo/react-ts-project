import { Outlet } from 'react-router-dom'
import Navbar from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default MainLayout