import React, { useRef } from 'react'
import {postRequest} from '../Back/pages/CustomHttp'

function ContactUs(props) {
    const contactUsForm = useRef();

    const submitForm = async () => {
        let isValidate = window.contactUsFormCommonValidation();
        if(isValidate){
            let allFields = '';
            Array.from(contactUsForm.current).map((e) => { allFields = {...allFields, [e.name] : e.value}; return true;});            

            const URL = '/contact-us';
            const params = allFields;
            const postData = await postRequest(URL, params);
            if(postData){                
                props.close();
            }   
        }
    }
    return (
        <form id="contactUsFormCommon" className="form" action="#" ref={contactUsForm}>
            <div className="d-flex flex-column mb-7 fv-row">
                <label className="d-flex fs-6 fw-bold form-label mb-7">
                    <span>Email us at chloe@notenest.com  or fill out our Contact Form</span>
                </label>
                <label className="d-flex align-items-center fs-6 fw-bold form-label mb-2">
                    <span className="required">Full Name</span>
                </label>
                <input type="text" className="form-control form-control-solid" placeholder="John Doe" name="full_name" />
            </div>

            <div className="row fv-row mb-7">
                <div className="col-xl-6">
                    <label className="d-flex align-items-center fs-6 fw-bold form-label mb-2">
                        <span className="required">Email Address</span>
                    </label>
                    <input type="email" className="form-control form-control-solid" placeholder="johndoe@gmail.com" name="email" />
                </div>
                <div className="col-xl-6">
                    <label className="d-flex align-items-center fs-6 fw-bold form-label mb-2">
                        <span>Phone Number</span>
                    </label>
                    <input type="text" className="form-control form-control-solid" placeholder="+190101110011" name="phone_number" />
                </div>
            </div>
            <div className="d-flex flex-column mb-7 fv-row">
                <label className="d-flex align-items-center fs-6 fw-bold form-label mb-2">
                    <span className='required'>Message</span>
                </label>
                <textarea className="form-control form-control-solid" placeholder="write your query" name="message" rows="5"></textarea>
            </div>            

            <div className="text-center pt-2">
                <button type="reset" className="btn btn-light me-3" onClick={props.close}>Discard</button>
                <button type="button" className="btn btn-primary" onClick={() => submitForm()}>
                    <span className="indicator-label">Submit</span>                    
                </button>
            </div>
        </form>
    )
}

export default ContactUs
