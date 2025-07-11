import React from 'react'
import { Link } from 'react-router-dom'
import { getAuthData } from '../Session'

export default function Sidebar() {
  const AuthData = getAuthData();  

  return (
    <div id="kt_aside" className="aside card tour__step-two" data-kt-drawer="true" data-kt-drawer-name="aside" data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true" data-kt-drawer-width="{default:'200px', '300px': '250px'}" data-kt-drawer-direction="start" data-kt-drawer-toggle="#kt_aside_mobile_toggle" data-kt-sticky="false" data-kt-sticky-name="aside-sticky" data-kt-sticky-offset="{default: false, lg: '200px'}" data-kt-sticky-width="{lg: '265px'}" data-kt-sticky-left="auto" data-kt-sticky-top="95px" data-kt-sticky-animation="false" data-kt-sticky-zindex={95}>
      <div className="aside-menu flex-column-fluid">
        <div className="hover-scroll-overlay-y my-5 my-lg-6" id="kt_aside_menu_wrapper" data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-height="auto" data-kt-scroll-dependencies="#kt_header, #kt_aside_footer, #kt_footer" data-kt-scroll-wrappers="#kt_aside, #kt_aside_menu" data-kt-scroll-offset="0px">
          <div className="menu menu-column menu-title-gray-800 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500" id="#kt_aside_menu" data-kt-menu="true">
            {AuthData.dashboard.read ?
              <div className="menu-item">
                <Link to="/auth/" className="menu-link">
                  <span className="menu-icon">
                    <span className="svg-icon svg-icon-2">
                      <i className='fas fa-border-all' style={{ fontSize: "17px" }}></i>
                      {/* <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                        <rect x={2} y={2} width={9} height={9} rx={2} fill="black" />
                        <rect opacity="0.3" x={13} y={2} width={9} height={9} rx={2} fill="black" />
                        <rect opacity="0.3" x={13} y={13} width={9} height={9} rx={2} fill="black" />
                        <rect opacity="0.3" x={2} y={13} width={9} height={9} rx={2} fill="black" />
                      </svg> */}
                    </span>
                  </span>
                  <span className="menu-title">To Do List</span>
                </Link>
              </div>
              : ''}

            {AuthData.clinic.read ?
              <div className="menu-item tour__step-three">
                <Link to="/auth/clinician" className="menu-link">
                  <span className="menu-icon">
                    <span className="svg-icon svg-icon-2">
                      <i className='fas fa-user-tie' style={{ fontSize: "17px" }}></i>
                      {/* <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                        <path d="M6.28548 15.0861C7.34369 13.1814 9.35142 12 11.5304 12H12.4696C14.6486 12 16.6563 13.1814 17.7145 15.0861L19.3493 18.0287C20.0899 19.3618 19.1259 21 17.601 21H6.39903C4.87406 21 3.91012 19.3618 4.65071 18.0287L6.28548 15.0861Z" fill="black" />
                        <rect opacity="0.3" x={8} y={3} width={8} height={8} rx={4} fill="black" />
                      </svg> */}
                    </span>
                  </span>
                  <span className="menu-title">Manage Clinicians</span>
                </Link>
              </div>
              : ''}

            {AuthData.account.read ?
              <div className="menu-item">
                <Link to="/auth/accounts" className="menu-link">
                  <span className="menu-icon">
                    <span className="svg-icon svg-icon-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                        <path opacity="0.3" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="black" />
                        <path d="M19 10.4C19 10.3 19 10.2 19 10C19 8.9 18.1 8 17 8H16.9C15.6 6.2 14.6 4.29995 13.9 2.19995C13.3 2.09995 12.6 2 12 2C11.9 2 11.8 2 11.7 2C12.4 4.6 13.5 7.10005 15.1 9.30005C15 9.50005 15 9.7 15 10C15 11.1 15.9 12 17 12C17.1 12 17.3 12 17.4 11.9C18.6 13 19.9 14 21.4 14.8C21.4 14.8 21.5 14.8 21.5 14.9C21.7 14.2 21.8 13.5 21.9 12.7C20.9 12.1 19.9 11.3 19 10.4Z" fill="black" />
                        <path d="M12 15C11 13.1 10.2 11.2 9.60001 9.19995C9.90001 8.89995 10 8.4 10 8C10 7.1 9.40001 6.39998 8.70001 6.09998C8.40001 4.99998 8.20001 3.90005 8.00001 2.80005C7.30001 3.10005 6.70001 3.40002 6.20001 3.90002C6.40001 4.80002 6.50001 5.6 6.80001 6.5C6.40001 6.9 6.10001 7.4 6.10001 8C6.10001 9 6.80001 9.8 7.80001 10C8.30001 11.6 9.00001 13.2 9.70001 14.7C7.10001 13.2 4.70001 11.5 2.40001 9.5C2.20001 10.3 2.10001 11.1 2.10001 11.9C4.60001 13.9 7.30001 15.7 10.1 17.2C10.2 18.2 11 19 12 19C12.6 20 13.2 20.9 13.9 21.8C14.6 21.7 15.3 21.5 15.9 21.2C15.4 20.5 14.9 19.8 14.4 19.1C15.5 19.5 16.5 19.9 17.6 20.2C18.3 19.8 18.9 19.2 19.4 18.6C17.6 18.1 15.7 17.5 14 16.7C13.9 15.8 13.1 15 12 15Z" fill="black" />
                      </svg>
                    </span>
                  </span>
                  <span className="menu-title">Manage Account</span>
                </Link>
              </div>
              : ''}

            {AuthData.notes.read ?
              <div className="menu-item tour__step-four">
                <Link to="/auth/clients" className="menu-link">
                  <span className="menu-icon">
                    <span className="svg-icon svg-icon-2">
                      <i style={{ fontSize: "17px" }} className='fas fa-user-tag'></i>
                      {/* <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                        <path d="M21 10H13V11C13 11.6 12.6 12 12 12C11.4 12 11 11.6 11 11V10H3C2.4 10 2 10.4 2 11V13H22V11C22 10.4 21.6 10 21 10Z" fill="black" />
                        <path opacity="0.3" d="M12 12C11.4 12 11 11.6 11 11V3C11 2.4 11.4 2 12 2C12.6 2 13 2.4 13 3V11C13 11.6 12.6 12 12 12Z" fill="black" />
                        <path opacity="0.3" d="M18.1 21H5.9C5.4 21 4.9 20.6 4.8 20.1L3 13H21L19.2 20.1C19.1 20.6 18.6 21 18.1 21ZM13 18V15C13 14.4 12.6 14 12 14C11.4 14 11 14.4 11 15V18C11 18.6 11.4 19 12 19C12.6 19 13 18.6 13 18ZM17 18V15C17 14.4 16.6 14 16 14C15.4 14 15 14.4 15 15V18C15 18.6 15.4 19 16 19C16.6 19 17 18.6 17 18ZM9 18V15C9 14.4 8.6 14 8 14C7.4 14 7 14.4 7 15V18C7 18.6 7.4 19 8 19C8.6 19 9 18.6 9 18Z" fill="black" />
                      </svg> */}
                    </span>
                  </span>
                  <span className="menu-title">Clients/Notes</span>
                </Link>
              </div>
              : ''}

            <div className="menu-item">
              <Link to="/help"  className="menu-link">
                <span className="menu-icon">
                  <span className="svg-icon svg-icon-2">
                    <i className='fas fa-comment-dots' style={{ fontSize: "17px" }}></i>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                        <path opacity="0.3" d="M20 3H4C2.89543 3 2 3.89543 2 5V16C2 17.1046 2.89543 18 4 18H4.5C5.05228 18 5.5 18.4477 5.5 19V21.5052C5.5 22.1441 6.21212 22.5253 6.74376 22.1708L11.4885 19.0077C12.4741 18.3506 13.6321 18 14.8167 18H20C21.1046 18 22 17.1046 22 16V5C22 3.89543 21.1046 3 20 3Z" fill="black" />
                        <rect x={6} y={12} width={7} height={2} rx={1} fill="black" />
                        <rect x={6} y={7} width={12} height={2} rx={1} fill="black" />
                      </svg> */}
                  </span>
                </span>
                <span className="menu-title">Help/How To</span>
              </Link>
            </div>            
          </div>
        </div>
      </div>
    </div>
  )
}
