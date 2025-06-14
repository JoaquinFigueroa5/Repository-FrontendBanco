import { lazy } from "react";
import DashboardMain from "./pages/DashboardMain";
const TransaccionPage = lazy(()=>import('./pages/TransactionsPage'))
const Login = lazy(() => import('./components/Login'))
const Register = lazy(() => import('./components/Register'))

const routes = [
    { path: '/', element: <Login />},
    { path: '/dashboard', element: <DashboardMain /> },
    { path: '/transactions', element: <TransaccionPage/>},
    { path: '/register', element: <Register/>}
]

export default routes;