import { Link, NavLink } from "react-router-dom"
import { checkAuth } from "../Back/pages/Session"
import { authPrefix, Register, AboutPage, NotesPage, FeaturesPage, PricingPage } from "../Routes/RouterPage"

function Header(props) {    
        const checkUser = checkAuth();
        return (
            <div>
                {/*begin::Header Section*/}
                <div className="mb-0" id="home">
                    {/*begin::Wrapper*/}
                    <div className="bgi-no-repeat customBg bgi-size-contain bgi-position-x-center bgi-position-y-bottom whiteBg">
                        {/*begin::Header*/}
                        <div className="landing-header m-0" data-kt-sticky="true" data-kt-sticky-name="landing-header" data-kt-sticky-offset="{default: '200px', lg: '300px'}">
                            {/*begin::Container*/}
                            <div className="container">
                                {/*begin::Wrapper*/}
                                <div className="d-flex align-items-center justify-content-between font-fira-sans">
                                    {/*begin::Logo*/}
                                    <div className="d-flex align-items-center flex-equal">
                                        {/*begin::Mobile menu toggle*/}
                                        
                                        <button className="btn btn-icon btn-active-color-primary me-3 d-flex d-lg-none btn_blue" id="kt_landing_menu_toggle">
                                            {/*begin::Svg Icon | path: icons/duotune/abstract/abs015.svg*/}
                                            <span className="svg-icon svg-icon-2hx">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                    <path d="M21 7H3C2.4 7 2 6.6 2 6V4C2 3.4 2.4 3 3 3H21C21.6 3 22 3.4 22 4V6C22 6.6 21.6 7 21 7Z" fill="black" />
                                                    <path opacity="0.3" d="M21 14H3C2.4 14 2 13.6 2 13V11C2 10.4 2.4 10 3 10H21C21.6 10 22 10.4 22 11V13C22 13.6 21.6 14 21 14ZM22 20V18C22 17.4 21.6 17 21 17H3C2.4 17 2 17.4 2 18V20C2 20.6 2.4 21 3 21H21C21.6 21 22 20.6 22 20Z" fill="black" />
                                                </svg>
                                            </span>
                                            {/*end::Svg Icon*/}
                                        </button>
                                        {/*end::Mobile menu toggle*/}
                                        {/*begin::Logo image*/}
                                        <Link to="/">
                                            <img alt="Logo" src="assets/media/logos/NoteNest.png" className="logo-default  headerLogo" />
                                            <img alt="Logo" src="assets/media/logos/NoteNest.png" className="logo-sticky headerLogo" />
                                        </Link>
                                        {/*end::Logo image*/}
                                    </div>
                                    {/*end::Logo*/}
                                    {/*begin::Menu wrapper*/}
                                    <div className="d-lg-block" id="kt_header_nav_wrapper">
                                        <div className="d-lg-block p-5 p-lg-0" data-kt-drawer="true" data-kt-drawer-name="landing-menu" data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true" data-kt-drawer-width="200px" data-kt-drawer-direction="start" data-kt-drawer-toggle="#kt_landing_menu_toggle" data-kt-swapper="true" data-kt-swapper-mode="prepend" data-kt-swapper-parent="{default: '#kt_body', lg: '#kt_header_nav_wrapper'}">
                                            {/*begin::Menu*/}
                                            <div className="menu menu-column flex-nowrap menu-rounded menu-lg-row menu-title-gray-500 menu-state-title-primary nav nav-flush fs-5" id="kt_landing_menu">
                                                {/*begin::Menu item*/}
                                                <div className="menu-item">
                                                    {/*begin::Menu link*/}
                                                    <Link to={'/'} className="menu-link nav-link active py-3 px-4 px-xxl-6" data-kt-scroll-toggle="true" data-kt-drawer-dismiss="true">Home</Link>
                                                    {/*end::Menu link*/}
                                                </div>
                                                {/*end::Menu item*/}
                                                <div className="menu-item">
                                                    <NavLink activeClassName="active" to={NotesPage.link} className="menu-link nav-link py-3 px-4 px-xxl-6" data-kt-scroll-toggle="true" data-kt-drawer-dismiss="true">Notes</NavLink>
                                                </div>
                                                <div className="menu-item">
                                                    <NavLink activeClassName="active" to={FeaturesPage.link} className="menu-link nav-link py-3 px-4 px-xxl-6" data-kt-scroll-toggle="true" data-kt-drawer-dismiss="true">Features</NavLink>
                                                </div>
                                                <div className="menu-item">
                                                <a activeClassName="active" href="https://blog.notenest.com/" className="menu-link nav-link py-3 px-4 px-xxl-6" data-kt-scroll-toggle="true" data-kt-drawer-dismiss="true">Blogs</a>
                                            </div>
                                                <div className="menu-item">
                                                    <NavLink activeClassName="active" to={PricingPage.link} className="menu-link nav-link py-3 px-4 px-xxl-6" data-kt-scroll-toggle="true" data-kt-drawer-dismiss="true">Pricing</NavLink>
                                                </div>
                                                {/*begin::Menu item*/}
                                                <div className="menu-item">
                                                    {/*begin::Menu link*/}
                                                    {/* <a className="menu-link nav-link py-3 px-4 px-xxl-6" href="#about" data-kt-scroll-toggle="true" data-kt-drawer-dismiss="true">About</a> */}
                                                    {/* <Link to={AboutPage.link} className="menu-link nav-link py-3 px-4 px-xxl-6" data-kt-scroll-toggle="true" data-kt-drawer-dismiss="true">About</Link> */}
                                                    <NavLink activeClassName="active" to={AboutPage.link} className="menu-link nav-link py-3 px-4 px-xxl-6" data-kt-scroll-toggle="true" data-kt-drawer-dismiss="true">About</NavLink>
                                                    {/*end::Menu link*/}
                                                </div>
                                                {/*end::Menu item*/}
                                                {/*begin::Menu item*/}
                                                <div className="menu-item">
                                                    {/*begin::Menu link*/}
                                                    <a className="menu-link nav-link py-3 px-4 px-xxl-6" href="/#contact" data-kt-scroll-toggle="true" data-kt-drawer-dismiss="true">Contact</a>
                                                    {/*end::Menu link*/}
                                                </div>
                                                {/*end::Menu item*/}
                                            </div>
                                            {/*end::Menu*/}
                                        </div>
                                    </div>
                                    {/*end::Menu wrapper*/}
                                    {/*begin::Toolbar*/}
                                    <div className="text-end ms-4">                                        
                                        <Link to={authPrefix} className="btn btn-secondary wow pulse animated loginButton">{checkUser ? 'Dashboard' : 'Login'}</Link>
                                    </div>
                                    {/*end::Toolbar*/}
                                </div>
                                {/*end::Wrapper*/}
                            </div>
                            {/*end::Container*/}
                        </div>
                        { props.children ?? null }
                    </div>
                    {/*end::Wrapper*/}
                </div>
                {/*end::Header Section*/}
            </div>
        )
    }

export default Header