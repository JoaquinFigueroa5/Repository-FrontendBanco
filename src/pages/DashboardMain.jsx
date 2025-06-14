import { useContext } from "react"
import DashboardAdmin from "../components/LandingPages/DashboardAdmin";
import DashboardUsers from "../components/LandingPages/DashboardUsers";
import useUserStore from "../context/UserStore"

const DashboardMain = () => {
    const { user, fetchUser } = useUserStore();
    
    return (
        <>
            {user?.role === "ADMIN_ROLE" ? <DashboardAdmin /> : <DashboardUsers /> }
        </>
    )
}

export default DashboardMain
