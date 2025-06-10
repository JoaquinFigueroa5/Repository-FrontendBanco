import { lazy } from "react";
import DashboardMain from "./pages/DashboardMain";
const TransaccionPage = lazy(()=>import('./pages/TransactionsPage'))


const routes = [
    { path: '/', element: <DashboardMain/>},
    { path: '/transactions', element: <TransaccionPage/>}
]

export default routes;