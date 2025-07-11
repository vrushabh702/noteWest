import React from 'react'
import { Link } from 'react-router-dom'
import { checkAuth } from '../Back/pages/Session';
import { authPrefix, Register } from '../Routes/RouterPage'
import $ from "jquery";

function mainImage() {
    const checkUser = checkAuth()
    const RedirectLink = checkUser ? authPrefix : Register.link;

    function subscribe() {
        let email = $("#subscribe-email").val();
        $.ajax({
            url: "https://api.notenest.com/api/v1/subscribe-now",
            // url: "http://localhost/notenest_backend/api/v1/subscribe-now",
            type:'POST',
            headers: {
                'X-CSRF-TOKEN': '{{ csrf_token() }}'
            },
            data: {
                email: email,
            },
            success: function(data) {
                // console.log('report', data);
                if($.isEmptyObject(data.error)){
                    $("#subscribe-email").val('');
                    $("#sub-email").text(data.success);
                }else{
                    $("#sub-email").text(data.error[0]);
                }
            }
        });
    }

    return (
        <div className="bg-center front-end-img-height front-end-img-bg-size" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(assets/media/img/image-07.jpg)', backgroundPosition: 'center bottom', display:"flex",alignItems:"center" }}>
            <div className="container">
                <div className="row mx-6">
                    <div className="col-lg-6 col-md-12 wow fadeInUp animated">
                        <div className="text-grey mb-5 mb-lg-10 py-10 py-lg-20">
                            {/*begin::Title*/}
                            <h1 className="text-grey lh-base fw-bolder fs-3x fs-lg-4x mb-5 ">
                                <span style={{ background: 'linear-gradient(to right, #7117EA 0%, #EA6060 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                    {/* <span id="kt_landing_hero_text" style={{ "font-size": "50px" }}>We Are Coming Soon...</span> */}
                                </span></h1>
                            <h1 className="text-grey lh-base fw-bolder fs-3x fs-lg-4x mb-5 ">
                                <span style={{ background: 'linear-gradient(to right, #ffd200 0%, #ace8ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                    <span id="kt_landing_hero_text">Why NoteNest</span>
                                </span></h1>
                            <div className="text-white" style={{fontSize:"1.7rem"}}>
                                {/* style={{ color: '#646060 !imporant' }} */}
                                Effortless notes are just a few clicks away. Created by a counselor for counselors.
                            </div>
                            <div className="text-white pt-3" style={{fontSize:"1.7rem"}}>
                            NoteNest’s intuitive keyword selections and cutting-edge language generation takes the
typing out of writing notes. Comprehensive and personalized documents are created in
seconds. NoteNest saves professionals countless hours while improving the quality and depth
of their documentation.

                            </div>
                            
                            {/*end::Title*/}
                            {/*begin::Action*/}
                            {/* <div className="fs-6 fs-lg-4 text-white pt-3">
                                //<div className="col-xl-8">
                                    <input className="form-control form-control-lg form-control-solid" placeholder='Please enter your email to receive updates' type="text" name="email" id="subscribe-email" autoComplete="off" />
                                //</div>  
                                <Link to="" className="btn btn-primary mt-10 btn_blue" onClick={() => subscribe()}>Subscribe Now</Link>
                            </div>*/}
                            {/* <div className="fs-6 fs-lg-4 text-white pt-3">
                                <span style={{color:'red'}} id="sub-email"></span>
                            </div> */}
                            {/*end::Action*/}
                        </div>
                    </div>
                </div>
                <div className='text-center promo-image-section'>
                                <img src='./assets/media/promo/Get_a_30_day_free_trial-trans1.png' alt='30 day free trial'/>
                            </div>
                {/*begin::Heading*/}
                {/*end::Heading*/}
            </div>
        </div>
    )
}

export default mainImage
