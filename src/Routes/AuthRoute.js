import React from 'react'
import { Navigate, useLocation } from 'react-router';
import AuthComponent from '../Back/pages/auth/AuthComponent';
import {checkAuth} from '../Back/pages/Session';
import { Login } from './FreeRoutes';

function AuthRoute(props) {    
       
    let userLogin = checkAuth();
    let location = useLocation();         
    let setSideBar = false;     
    let setBreadcrumb = false; 
    
    if(userLogin){
        setSideBar = props.isSidebar ?? true;        
        setBreadcrumb = props.setBreadcrumb ?? true;     
    }    
    return <>        
    {        
        userLogin 
        ?   <AuthComponent isSideBar={setSideBar} isBreadCrumb={setBreadcrumb} BreadCrumbList={props.BreadCrumbList} pageName={props.pageName}>
                    {props.children} 
            </AuthComponent>             

        :   <Navigate to={Login.link} state={{ from: location }} />
    }     
    </>
}

export default AuthRoute
