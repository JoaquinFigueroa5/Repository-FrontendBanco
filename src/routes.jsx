import { lazy } from "react";
import DashboardMain from "./pages/DashboardMain";
const TransaccionPage = lazy(()=>import('./pages/TransactionsPage'))
const Login = lazy(() => import('./components/Login'))
const Register = lazy(() => import('./components/Register'))
import ProductsPage from "./pages/ProductsPage";

const routes = [
    { path: '/', element: <Login />},
    { path: '/dashboard', element: <DashboardMain /> },
    { path: '/transactions', element: <TransaccionPage/>},
    { path: '/productos', element: <ProductsPage/>}
]

export default routes;