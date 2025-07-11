import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ContactUs from '../../../Common/ContactUs'
import CustModal from '../../../HOC/CustModal'
import { FAQPage, SitemapPage, TCPage, TNCPage } from '../../../Routes/RouterPage';

export default function Footer() {
    const [ContactModal, setContactModal] = useState(false);
    return (
        <div className='dashboard_kt_footer'>
            <div className="footer my-4 d-flex flex-lg-column" id="kt_footer"></div>
            <div className="mb-0">
                {/*begin::Wrapper*/}
                <div className="footerBottom">
                {/*begin::Container*/}
                <div className="container-xxl">
                    {/*begin::Wrapper*/}
                    <div className="d-flex flex-column flex-md-row flex-stack py-7 py-lg-5">
                    {/*begin::Copyright*/}
                    <div className="">
                        {/*begin::Logo*/}
                        <Link to="/auth/">
                            <img alt="footerLogo" src="/assets/media/logos/NoteNest.png" className="h-15px h-md-20px footerLogo" />
                        </Link>
                        {/*end::Logo image*/}
                    </div>
                    <div className="copyrighttext">                        
                        <span className="fs-6 fw-bolf text-gray-600 pt-2">Copyright © 2024 NoteNest. All rights reserved.</span>                        
                    </div>                                        
                    <ul className="menu menu-gray-600 menu-hover-primary fw-bold fs-6 fs-md-5 order-1 mb-5 mb-md-0">
                        <li className="menu-item">
                            <Link to={TCPage.link} className="menu-link px-2">
                                Terms And Conditions
                            </Link>
                        </li>
                        <li className="menu-item mx-5">
                            <Link to={FAQPage.link} className='menu-link px-2'>
                                FAQ's
                            </Link>
                        </li>
                        <li className="menu-item mx-5">
                            <Link to={SitemapPage.link} className='menu-link px-2'>
                                Sitemap
                            </Link>
                        </li>
                        <li className="menu-item">
                            <a to="#" data-bs-toggle="modal" data-bs-target="#contactUs" className="menu-link px-2" onClick={() => setContactModal(true)}>Contact Us</a>
                        </li>
                    </ul>                    
                    </div>                    
                </div>                
                </div>                
            </div>
            <CustModal show={ContactModal} close={() => setContactModal(false)} header="Contact Us" size="md">
                <ContactUs close={() => setContactModal(false)} alertMessage="" alerMessageShow="" />
            </CustModal>  
            <a href="#" id="kt_scrolltop" className="scrolltop">
                {/*begin::Svg Icon | path: icons/duotune/arrows/arr066.svg*/}
                <span className="svg-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                    <rect opacity="0.5" x={13} y={6} width={13} height={2} rx={1} transform="rotate(90 13 6)" fill="black" />
                    <path d="M12.5657 8.56569L16.75 12.75C17.1642 13.1642 17.8358 13.1642 18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25L12.7071 5.70711C12.3166 5.31658 11.6834 5.31658 11.2929 5.70711L5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75C6.16421 13.1642 6.83579 13.1642 7.25 12.75L11.4343 8.56569C11.7467 8.25327 12.2533 8.25327 12.5657 8.56569Z" fill="black" />
                </svg>
                </span>
                {/*end::Svg Icon*/}
            </a>
        </div>
    )
}
