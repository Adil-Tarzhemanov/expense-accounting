import Home from '../pages/Home/Home'
import Auth from "../pages/Auth/Auth";
import Categories from "../pages/Categories/Categories";
import Transactions from "../pages/Transactions/Transactions";

export const RouteNames={
    HOME:'/',
    TRANSACTIONS: '/transactions',
    CATEGORIES: 'categories',
    AUTH: '/auth',
}

export const publicRoutes =[
    {
        path:RouteNames.HOME,
        element: Home,
    },
    {
        path: RouteNames.AUTH,
        element: Auth,
    }
];

export const privateRoutes =[
    {
        path: RouteNames.TRANSACTIONS,
        element: Transactions
    },
    {
        path: RouteNames.CATEGORIES,
        element: Categories
    },
]