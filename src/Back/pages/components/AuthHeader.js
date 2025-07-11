import React from 'react'
import { Link } from 'react-router-dom'

export default function AuthHeader() {
    return (
        <div>
            <div id="kt_header" className="header align-items-stretch landing-header" data-kt-sticky="true" data-kt-sticky-name="header" data-kt-sticky-offset="{default: '200px', lg: '300px'}">
                {/*begin::Container*/}
                <div className="container-xxl d-flex align-items-center">
                {/*begin::Header Logo*/}
                <div className="header-logo me-5 me-md-10 flex-grow-1 flex-lg-grow-0">
                    <Link to="/auth/">
                    <img alt="Logo" src="/assets/media/logos/NoteNest.png" className="logo-default h-25px headerLogo" />
                    <img alt="Logo" src="/assets/media/logos/NoteNest.png" className="logo-sticky h-25px" />
                    </Link>
                </div>
                {/*end::Header Logo*/}
                </div>
                {/*end::Container*/}
            </div>
        </div>
    )
}
