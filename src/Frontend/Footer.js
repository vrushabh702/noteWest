import { useState } from "react";
import ContactUs from "../Common/ContactUs";
import CustModal from "../HOC/CustModal";
import { FAQPage, SitemapPage, TCPage } from "../Routes/RouterPage";
import { Link } from "react-router-dom";

function Footer() {
    const [ContactModal, setContactModal] = useState(false);    
    return (
        <div>
            <div className="mb-0">
                {/*begin::Curve top*/}
                <div className="landing-curve landing-dark-color">
                    <svg viewBox="15 -1 1470 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 48C4.93573 47.6644 8.85984 47.3311 12.7725 47H1489.16C1493.1 47.3311 1497.04 47.6644 1501 48V47H1489.16C914.668 -1.34764 587.282 -1.61174 12.7725 47H1V48Z" fill="currentColor" />
                    </svg>
                </div>
                {/*end::Curve top*/}
                {/*begin::Wrapper*/}
                <div className="landing-dark-bg pt-0">
                    {/*begin::Container*/}
                    <div className="container">
                        {/*begin::Row*/}
                        <div className="row py-10 py-lg-20">
                            {/*begin::Col*/}
                            <div className="col-lg-6 pe-lg-16 mb-10 mb-lg-0 more_about">
                                <div className="footer_detail">
                                    {/* <h4 className="fw-bolder  mb-6 text-white">More about Us</h4>
                                    <p className="text-white  fs-5 mb-6">Dolor sitam consectetur adipisicing eiusmod tempor cididunt laboret mag magn aliquat enim
                                        sed minim veniam nostrud sed lorem ipsum dolor.</p>
                                    <hr />                                     */}
                                </div>
                                <div>                                                                       
                                </div>
                            </div>                                                        
                            <div className="col-lg-6">                                
                                <div className="d-flex justify-content-end">                                    
                                    <div className="d-flex fw-bold flex-column me-20 more_about more_info">                                        
                                        {/* <h4 className="fw-bolder  mb-6 text-white">Reach Us</h4>
                                        <p className="text-white  fs-5 mb-6"><i className="fa fa-map-marker text-white  fs-5 mb-6" /> Test Lorem Ipsum, USA</p>
                                        <p className="text-white  fs-5 mb-6"><i className="fa fa-phone text-white  fs-5 mb-6" /> Call Us 234.150.9876</p>
                                        <p className="text-white  fs-5 mb-6"><i className="fa fa-envelope text-white fs-5 mb-6" /> info@Notenest.com</p> */}
                                    </div>                                                                        
                                    <div className="d-flex fw-bold flex-column ms-lg-20 socialIcon">                                        
                                        <h4 className="fw-bolder mb-6 text-white">Stay Connected</h4>                                                                                
                                        <ul>
                                        <li>
                                                <div className="mb-6">
                                                    <a href="https://www.facebook.com/people/NoteNest/100083253464942/" target="_blank" rel="nofollow" >
                                                        <i className="fab fa-facebook-f" />
                                                    </a>
                                                    {/* <img src="./assets/media/img/facebook-4.svg" class="h-20px me-2" alt="" />
                                                <span class="text-white fs-5 mb-6">Facebook</span> */}
                                                </div>
                                            </li>
                                            <li>
                                                <div className="mb-6">
                                                    <a href="https://www.youtube.com/@notenest" target="_blank" rel="nofollow">
                                                        <i className="fab fa-youtube" />
                                                    </a>
                                                    {/* <img src="./assets/media/img/facebook-4.svg" class="h-20px me-2" alt="" />
                                                <span class="text-white fs-5 mb-6">Facebook</span> */}
                                                </div>
                                            </li>
                                            <li>
                                                <div className="mb-6">
                                                    <a href="https://www.instagram.com/notenest_/?igshid=NDk5N2NlZjQ%3D" target="_blank" rel="nofollow">
                                                        <i className="fab fa-instagram" />
                                                    </a>
                                                    {/* <img src="./assets/media/img/facebook-4.svg" class="h-20px me-2" alt="" />
                                                <span class="text-white fs-5 mb-6">Facebook</span> */}
                                                </div>
                                            </li>
                                            {/* <li>
                                                <div className="mb-6">
                                                    <i className="fab fa-twitter" />
                                                    {/* <img src="./assets/media/img/facebook-4.svg" class="h-20px me-2" alt="" />
                                                <span class="text-white fs-5 mb-6">Facebook</span> *
                                                </div>
                                            </li>
                                            <li>
                                                <div className="mb-6">
                                                    <i className="fab fa-dribbble" />
                                                    {/* <img src="./assets/media/img/facebook-4.svg" class="h-20px me-2" alt="" />
                                                <span class="text-white fs-5 mb-6">Facebook</span> *
                                                </div>
                                            </li> */}
                                           
                                        </ul>
                                        {/*end::Link*/}
                                    </div>
                                    {/*end::Links*/}
                                </div>
                                {/*end::Navs*/}
                            </div>
                            {/*end::Col*/}
                        </div>
                        {/*end::Row*/}
                    </div>
                    {/*end::Container*/}
                    <div className="footerBottom">
                        {/*begin::Container*/}
                        <div className="container">
                            {/*begin::Wrapper*/}
                            <div className="d-flex flex-column flex-md-row flex-stack py-7 py-lg-5">
                                {/*begin::Copyright*/}
                                <div className>
                                    {/*begin::Logo*/}
                                    <a href="#">
                                        <img alt="footerLogo" src="assets/media/logos/NoteNest.png" className="h-15px h-md-20px footerLogo" />
                                    </a>
                                    {/*end::Logo image*/}
                                </div>
                                <div className="copyrighttext">
                                    {/*begin::Logo image*/}
                                    <span className="fs-6 fw-bolf text-gray-600 pt-2">Copyright © 2024 NoteNest. All rights reserved.</span>
                                    {/*end::Logo image*/}
                                </div>
                                {/*end::Copyright*/}
                                {/*begin::Menu*/}
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
                                        <span target="_blank" className="menu-link px-2" onClick={() => setContactModal(true)}>Contact Us</span>
                                    </li>
                                </ul>                                
                            </div>                            
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

export default Footer