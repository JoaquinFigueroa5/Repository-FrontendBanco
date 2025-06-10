import { useContext } from "react"
import DashboardAdmin from "../LandingPages/DashboardAdmin"
import DashboardUsers from "../LandingPages/DashboardUsers"
import { UserContext } from "../context/UseContext"

const DashboardMain = () => {
    const { user, refreshUser } = useContext(UserContext);

    return (
        <>
            {/* {user?.role === "ADMIN_ROLE" ? <DashboardAdmin /> : <DashboardUsers /> } */}
            <DashboardUsers />
        </>
    )
}

export default DashboardMain
