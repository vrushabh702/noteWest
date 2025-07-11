import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { postRequest } from '../../CustomHttp';
import { Alert } from 'react-bootstrap';

function ForgotPracticeEmailModal(props) {
    const URL = props.id === 1 ? '/forgot-practice' : '/forgot-username';
    const InitAlertMessage = {'status' : false, 'message' : 'Something Went Wrong'};
    const [alertShow, setAlertShow] = useState(false);
    const [alertMessage, setAlertMessage] = useState(InitAlertMessage);
    const [email, setEmail] = useState('');      
    const data = {
        email: email,
    }

    const PostData = async () => {
        let isValidate = window.ForgotUsernameFormValidation();
        if(isValidate) {
            let PostData = await postRequest(URL, data);
            setAlertMessage(prevData => prevData = PostData);
            setAlertShow(true);
            // console.log(PostData);
        }
    }
    
    return (
        <div className="px-4">
             { alertShow ? <Alert variant={ alertMessage.status ? 'success' : 'danger' } onClose={() => setAlertShow(false)} dismissible> 
                                <b>{ alertMessage.message }</b>
                           </Alert>
                        : '' }
            <form id="ForgotUsernameForm" className="form">
                <div className="d-flex flex-column mb-7 fv-row">                                                        
                    <label className="d-flex align-items-center fs-6 fw-bold form-label mb-2">
                        <span className="required">Email Address</span>
                    </label>                                    
                    <input type="email" className="form-control form-control-solid" placeholder="" onChange={(e) => setEmail(e.target.value)} name="forgotPracticeEmail"/>
                </div>                                                                                              
                
                <div className="text-center pt-2">
                    <button type="reset" id="kt_modal_new_card_cancel" className="btn btn-light me-3" onClick={props.close}>Discard</button>
                    <button type="button" id="kt_modal_new_card_submit" className="btn btn-primary" onClick={PostData}>
                        <span className="indicator-label">Submit</span>
                        <span className="indicator-progress">Please wait... 
                        <span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                    </button>
                </div>                                                                                            
            </form> 
        </div>
    )
}

ForgotPracticeEmailModal.propTypes = {
    id: PropTypes.number,
    close: PropTypes.func,
}

export default ForgotPracticeEmailModal


