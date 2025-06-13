import { lazy } from "react";
import DashboardMain from "./pages/DashboardMain";
const TransaccionPage = lazy(()=>import('./pages/TransactionsPage'))
const Login = lazy(() => import('./components/Login'))
const UserPage = lazy(() => import('./components/Profile/ProfilePage.jsx'));

const routes = [
    { path: '/', element: <Login />},
    { path: '/dashboard', element: <DashboardMain /> },
    { path: '/transactions', element: <TransaccionPage/>},
    { path: '/profile', element: <UserPage />}
]

export default routes;