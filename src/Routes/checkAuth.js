import React, { useEffect, useState } from 'react'
import RouterPage from "./RouterPage";
import Header from "../Back/pages/components/Header"
import AuthHeader from "../Back/pages/components/AuthHeader"
import Footer from "../Back/pages/components/Footer"
import {checkAuth} from "../Back/pages/Session";

function CheckAuth() {
    const [showHeader, setshowHeader] = useState(1);

    /* react lyfecycle methods */
    useEffect(() => {
        setshowHeader(checkAuth() ? 2 : 1)
        return () => {
            //cleanup
        }
    }, []);
    return (        
        <div className="d-flex flex-column flex-root">
            <div className="page d-flex flex-row flex-column-fluid">
                <div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
                    { showHeader === 1 ? <AuthHeader /> : <Header setshowHeader={(s) => setshowHeader(s)} /> }                 
                     <RouterPage setshowHeader={(e) => setshowHeader(e)} />                                                                
                </div>
            </div>
            <Footer />
        </div>          
    )
}

export default CheckAuth
