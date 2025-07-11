import React from 'react'
import LoginComponent from '../Back/pages/auth/Login'
import RegisterComponent from '../Back/pages/auth/Register'
import NewPasswordComponent from '../Back/pages/auth/NewPassword'
import PageNotFound from '../Back/pages/other/PageNotFound'
import { Route, Routes } from 'react-router-dom'
import Home from '../Frontend/Home'

/* Login & Register Routes Start */
export const Login = { name: 'Login', link: '/login' };
export const Register = { name: 'Register', link: '/register' };
export const NewPassword = { name: 'New Password', link: '/new-password' };
export const AbortPage = { name: 'Abort Page', link: '*' };
/* Login & Register Routes End */

function FreeRoutes() {
    return (
        <>
             <Routes>
                {/* ------------------ auth free routes start ------------------ */}                
                <Route path={"/"}>
                    <Route index={true} element={ <Home /> } />
                    <Route index={false} path={Login.link} element={<LoginComponent /> } />
                    <Route index={false} path={Register.link} element={<RegisterComponent />} />
                    <Route index={false} path={NewPassword.link} element={<NewPasswordComponent />} />
                    <Route index={false} path={AbortPage.link} element={<PageNotFound />} />
                </Route>
                {/* ------------------ auth free routes start ------------------ */}
            </Routes>
        </>
    )
}

export default FreeRoutes
