import {Navigate, Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../router";
import MainLayout from "../layouts/MainLayout/MainLayout";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import {useAuth} from "../hooks/useAuth";

const AppRouter = () => {
    const isAuth = useAuth()
    return (
        <>
            <Routes>
                <Route path={'/'} element={<MainLayout />}>
                    <Route path={'/*'} element={<Navigate to={'/'} />} />
                    {isAuth && <Route path={'/auth'} element={<Navigate to="/" />} />}
                    {publicRoutes.map(route => (
                        <Route path={route.path}
                               element={<route.element />}
                               key={route.path} />
                    ))}
                    {privateRoutes.map(route => (
                        <Route path={route.path}
                               element={
                                    <ProtectedRoute>
                                        <route.element />
                                    </ProtectedRoute>}
                               key={route.path}/>
                    ))}
                </Route>
            </Routes>
        </>
    )
}
export default AppRouter;