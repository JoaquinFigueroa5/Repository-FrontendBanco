import { lazy } from "react";
import { Navigate } from "react-router-dom";

const TransaccionPage = lazy(() => import('./pages/TransactionsPage'))
const DepositsPage = lazy(() => import('./pages/DepositsPage'))
const Login = lazy(() => import('./components/Login'))
const UserPage = lazy(() => import('./components/Profile/ProfilePage.jsx'));
const Register = lazy(() => import('./components/Register'));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const DashboardMain = lazy(() => import("./pages/DashboardMain"));
const User = lazy(() => import("./pages/UserPage.jsx"));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage.jsx'));
const PrivateRoute = lazy(() => import("./components/PrivateRoute.jsx"));
const UnauthorizedModal = lazy(() => import("./components/UnauthorizedModal.jsx"));

const routes = [
    { path: '/', element: <Login /> },
    { path: '/unauthorized', element: <UnauthorizedModal /> },
    {
        path: '/dashboard/*',
        element: <PrivateRoute allowedRoles={['ADMIN_ROLE', 'USER_ROLE']} />,
        children: [
            { path: '', element: <DashboardMain /> }
        ]
    },
    {
        path: '/transactions/*',
        element: <PrivateRoute allowedRoles={['ADMIN_ROLE', 'USER_ROLE']} />,
        children: [
            { path: '', element: <TransaccionPage /> }
        ]
    },
    {
        path: '/productos/*',
        element: <PrivateRoute allowedRoles={['ADMIN_ROLE', 'USER_ROLE']} />,
        children: [
            { path: '', element: <ProductsPage /> }
        ]
    },
    {
        path: '/register/*',
        element: <PrivateRoute allowedRoles={['ADMIN_ROLE']} />,
        children: [
            { path: '', element: <Register /> }
        ]
    },
    {
        path: '/profile/*',
        element: <PrivateRoute allowedRoles={['ADMIN_ROLE', 'USER_ROLE']} />,
        children: [
            { path: '', element: <UserPage /> }
        ]
    },
    {
        path: '/deposits/*',
        element: <PrivateRoute allowedRoles={['ADMIN_ROLE', 'USER_ROLE']} />,
        children: [
            { path: '', element: <DepositsPage /> }
        ]
    },
    {
        path: '/register/*',
        element: <PrivateRoute allowedRoles={['ADMIN_ROLE', 'USER_ROLE']} />,
        children: [
            { path: '', element: <Register /> }
        ]
    },
    {
        path: '/favorites/*',
        element: <PrivateRoute allowedRoles={['ADMIN_ROLE', 'USER_ROLE']} />,
        children: [
            { path: '', element: <FavoritesPage /> }
        ]
    },
    {
        path: '/users/*',
        element: <PrivateRoute allowedRoles={['ADMIN_ROLE', 'USER_ROLE']} />,
        children: [
            { path: '', element: <User /> }
        ]
    },
    {
        path: '*',
        element: <Navigate to="/" replace />
    }

]

export default routes;