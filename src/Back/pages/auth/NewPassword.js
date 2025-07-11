import React, {useRef, useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {Alert} from "react-bootstrap";
import {postRequest} from "../CustomHttp";
import {setSession} from "../Session";
import {useLocation} from "react-router-dom";

export default function NewPassword(props) {

    const refForm = useRef(null)
    const search = useLocation().search;
    const passwordToken = new URLSearchParams(search).get('token');

    //history
    const history = useNavigate();

    //alert config
    const InitAlertMessage = {'status' : false, 'message' : 'Something Went Wrong'};
    const [alertShow, setAlertShow] = useState(false);
    const [alertMessage, setAlertMessage] = useState(InitAlertMessage);

    const sendRequest = async () => {
        let isValidate = window.newPasswordFormValidation();
        if(isValidate) {
            var userInput = {
                token: passwordToken,
                new_password: refForm.current['forgotNewPassword'].value,
                confirm_password: refForm.current['forgotConfirmPassword'].value,
            }

            var myData = await postRequest('/reset-password',userInput);
            if(myData) {
                setAlertMessage(prevData => prevData = myData);
                setAlertShow(true);
                if(myData.status) {
                    setTimeout(() => {
                        history('/login');
                    }, 3000);
                }
            }
        }
    }

    return (
            <div className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed" style={{backgroundImage: 'url(/metronic8/demo2/assets/media/illustrations/sigma-1/14.png'}}>
                <div className="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
                    <div className="w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto ">
                        <form className="form w-100" id="newPasswordForm" method="post" ref={refForm}>
                            <div className="text-center mb-10">
                                <h1 className="text-dark mb-3">Create a New Password</h1>
                            </div>

                            <div className="fv-row mb-10">
                                { alertShow ? <Alert variant={ alertMessage.status ? 'success' : 'danger' } onClose={() => setAlertShow(false)} dismissible>
                                        <b>{ alertMessage.message }</b>
                                    </Alert>
                                    : '' }
                            </div>

                            <div className="fv-row mb-10">
                                <label className="form-label fs-6 fw-bolder text-dark">New Password</label>
                                <input className="form-control form-control-lg form-control-solid mb-2" type="password" id="forgotNewPassword" name="forgotNewPassword" autoComplete="off" />
                            </div>

                            <div className="fv-row mb-10">
                                <label className="form-label fw-bolder text-dark fs-6 mb-0">Confirm Password</label>
                                <input className="form-control form-control-lg form-control-solid mb-2" type="password" name="forgotConfirmPassword" autoComplete="off" />
                            </div>

                            <div className="text-center">
                                <button type="button" onClick={sendRequest} id="kt_sign_in_submit" className="btn btn-lg btn-primary w-100 mb-5">
                                    <span className="indicator-label">Continue</span>
                                    <span className="indicator-progress">Please wait...
                                    <span className="spinner-border spinner-border-sm align-middle ms-2" /></span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    )
}