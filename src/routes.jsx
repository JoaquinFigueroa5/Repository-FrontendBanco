import { lazy } from "react";

const TransaccionPage = lazy(()=>import('./pages/TransactionsPage'));
const Login = lazy(() => import('./components/Login'));
const Register = lazy(() => import('./components/Register'));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const DashboardMain = lazy(() => import("./pages/DashboardMain"));

const routes = [
    { path: '/', element: <Login />},
    { path: '/dashboard', element: <DashboardMain /> },
    { path: '/transactions', element: <TransaccionPage/>},
    { path: '/productos', element: <ProductsPage/>},
    { path: '/register', element: <Register /> }
]

export default routes;