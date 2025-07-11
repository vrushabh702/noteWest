import React from 'react'
import { Link } from 'react-router-dom'
import { checkAuth } from '../Back/pages/Session';
import { authPrefix, Register } from '../Routes/RouterPage'

function mainImage() {
    const checkUser = checkAuth()
    const RedirectLink = checkUser ? authPrefix : Register.link;
    return (        
            <div className="bg-center front-end-img-height front-end-img-bg-size" style={{backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(assets/media/img/image-07.jpg)', backgroundPosition: 'center bottom'}}>                        
                <div className="container">
                    <div className="row mx-6">
                        <div className="col-md-6 wow fadeInUp animated">
                            <div className="text-grey mb-5 mb-lg-10 py-10 py-lg-20">
                                {/*begin::Title*/}
                                <h1 className="text-grey lh-base fw-bolder fs-2x fs-lg-3x mb-5 ">
                                <span style={{background: 'linear-gradient(to right, #7117EA 0%, #EA6060 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>    
                                    <span id="kt_landing_hero_text">Why NoteNest</span>
                                    </span></h1>
                                <div className="fs-6 fs-lg-4 text-white">
                                    {/* style={{ color: '#646060 !imporant' }} */}
                                    Never write a note again with NoteNest's intuitive, cutting edge, customizable note generator.
                                </div>
                                <div className="fs-6 fs-lg-4 text-white pt-3">
                                    The perfect notes are just a few clicks away
                                </div>
                                {/*end::Title*/}
                                {/*begin::Action*/}
                                <Link to={RedirectLink} className="btn btn-primary mt-10 btn_blue">Start 30-day Free Trial</Link>
                                {/*end::Action*/}
                            </div>
                        </div>
                    </div>
                    {/*begin::Heading*/}
                    {/*end::Heading*/}
                </div>
            </div>         
    )
}

export default mainImage
