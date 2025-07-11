import React from 'react'
import { OverlayTrigger } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { profile } from '../../../../Routes/RouterPage';
import { getUser, setSession, getMyImageName } from '../../Session';

function UserProfile(props) {
    const history = useNavigate();
    const userData = getUser();
    const userImg = getMyImageName();
    const userRole = userData.role;
    const fullName = userData.first_name + ' ' + userData.last_name;
    const userEmail = userData.email;

    const logOut = (data) => {
        setSession('userData', null);
        setSession('authData', null);
        history('/login');
    }

    const profilePopUp = (
        <div className={"show menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px"}>
            <div className="menu-item px-3">
                <div className="menu-content d-flex align-items-center px-3">
                    <div className="symbol symbol-50px me-5">
                    </div>
                    <div className="d-flex flex-column">
                        <div className="fw-bolder d-flex align-items-center fs-5">{fullName}
                            <span className="badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2">{userRole}</span>
                        </div>
                        <span className="fw-bold text-muted text-hover-primary fs-7">{userEmail}</span>
                    </div>
                </div>
            </div>
            <div className="separator my-2" />
            <div className="menu-item px-5">
                <Link to={profile.link} className="menu-link px-5">My Profile</Link>
            </div>
            <div className="menu-item px-5">
                <span className="menu-link px-5" onClick={() => { logOut(); props.logout(1); }}>Sign Out</span>
            </div>
        </div>
    )
    return (
        <div>
            <div className="d-flex align-items-center me-n3 ms-1 ms-lg-3" id="kt_header_user_menu_toggle">
                <OverlayTrigger trigger="click" placement="bottom" overlay={profilePopUp} rootClose>
                    <div className="btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px">                        
                        <div className="header-profile-img">
                            <p>{userImg}</p>
                        </div>
                    </div>
                </OverlayTrigger>

            </div>
        </div>
    )
}

export default UserProfile
