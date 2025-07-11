import React, {useRef, useState} from 'react'
import {postRequest} from "../../CustomHttp";
import { Alert } from 'react-bootstrap';

function ForgotPasswordModal(props) {

    const formVal = useRef(null)
    const InitAlertMessage = {'status' : false, 'message' : 'Something Went Wrong'};
    const [alertShow, setAlertShow] = useState(false);
    const [alertMessage, setAlertMessage] = useState(InitAlertMessage);

    const sendRequest = async () => {
        let isValidate = window.ForgotPasswordFormValidation();
        if(isValidate) {
            let data = {
                practice_name: formVal.current['forgotPracticeName'].value,
                username: formVal.current['forgotUsername'].value,
            }

            let PostData = await postRequest('/forgot-password', data);
            if(PostData) {
                setAlertMessage(prevData => prevData = PostData);
                setAlertShow(true);
            }
        }
    }

    return (
        <div className="px-4">
            { alertShow ? <Alert variant={ alertMessage.status ? 'success' : 'danger' } onClose={() => setAlertShow(false)} dismissible>
                    <b>{ alertMessage.message }</b>
                </Alert>
                : '' }
            <form id="ForgotPasswordForm" className="form" ref={formVal}>
                <div className="d-flex flex-column mb-7 fv-row">                                                        
                    <label className="d-flex align-items-center fs-6 fw-bold form-label mb-2">
                        <span className="required">Practice Name</span>
                    </label>                                    
                    <input type="text" className="form-control form-control-solid" placeholder="" name="forgotPracticeName" />
                </div> 

                <div className="d-flex flex-column mb-7 fv-row">                                                        
                    <label className="d-flex align-items-center fs-6 fw-bold form-label mb-2">
                        <span className="required">Username</span>
                    </label>                                    
                    <input type="text" className="form-control form-control-solid" placeholder="" name="forgotUsername" />
                </div>                                                                                              
                
                <div className="text-center pt-2">
                    <button type="reset" id="kt_modal_new_card_cancel" className="btn btn-light me-3" onClick={props.close}>Discard</button>
                    <button type="button" id="kt_modal_new_card_submit" className="btn btn-primary" onClick={sendRequest}>
                        <span className="indicator-label">Submit</span>
                        <span className="indicator-progress">Please wait... 
                        <span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                    </button>
                </div>                                                                                            
            </form> 
        </div>
    )
}

ForgotPasswordModal.propTypes = {

}

export default ForgotPasswordModal

