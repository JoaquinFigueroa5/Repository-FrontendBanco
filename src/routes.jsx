import { lazy } from "react";
import DashboardMain from "./pages/DashboardMain";
const TransaccionPage = lazy(()=>import('./pages/TransactionsPage'))
const Login = lazy(() => import('./components/Login'))


const routes = [
    { path: '/', element: <Login />},
    { path: '/dashboard', element: <DashboardMain /> },
    { path: '/transactions', element: <TransaccionPage/>}
]

export default routes;