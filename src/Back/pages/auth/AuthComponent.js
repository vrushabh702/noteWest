import React from 'react'
import { authPrefix } from '../../../Routes/RouterPage';
import Breadcrumb from '../components/Breadcrumb';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

function AuthComponent(props) {
    const initBreadCrumb = [{ name: 'Home', link: authPrefix }];
    const isBreadCrumb = props.isBreadCrumb ?? true;
    const isSideBar = props.isSideBar ?? true;
    const BreadCrumbList = props.BreadCrumbList ? initBreadCrumb.concat(props.BreadCrumbList) : initBreadCrumb;
    const pageName = props.pageName ?? 'Home';

    return (
        <div className='font-noto-sans'>
            <div className="d-flex flex-column flex-root">
                <div className="page d-flex flex-row flex-column-fluid">
                    <div className="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
                         <Header setshowHeader={(s) => {}} />
                        {isBreadCrumb ? <Breadcrumb list={BreadCrumbList} pageName={pageName} /> : null}
                        <div id="kt_content_container" className="d-flex flex-column-fluid align-items-start container-xxl">
                            {isSideBar ? <Sidebar /> : null}                                
                                {props.children}                                  
                        </div>
                    </div>
                </div>
                {/* <Footer /> */}
            </div>
        </div>
    )
}

export default AuthComponent
