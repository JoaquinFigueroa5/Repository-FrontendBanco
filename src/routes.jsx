import { lazy } from "react";

const TransaccionPage = lazy(()=>import('./pages/TransactionsPage'))
const DepositsPage = lazy(() => import('./pages/DepositsPage'))
const Login = lazy(() => import('./components/Login'))
const UserPage = lazy(() => import('./components/Profile/ProfilePage.jsx'));
const Register = lazy(() => import('./components/Register'));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const DashboardMain = lazy(() => import("./pages/DashboardMain"));
const User = lazy(() => import("./pages/UserPage.jsx"));

const routes = [
    { path: '/', element: <Login />},
    { path: '/dashboard', element: <DashboardMain /> },
    { path: '/transactions', element: <TransaccionPage/>},
    { path: '/productos', element: <ProductsPage/>},
    { path: '/register', element: <Register /> },
    { path: '/profile', element: <UserPage />},
    { path: '/deposits', element: <DepositsPage/>},
    { path: '/register', element: <Register/>},
    { path: '/users', element: <User/>}
]

export default routes;