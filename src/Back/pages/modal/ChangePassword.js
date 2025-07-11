import React, { useContext, useState } from 'react'
import { Alert } from 'react-bootstrap';
import { postRequest } from '../CustomHttp';
import { UserInformation } from '../other/userProfile/MyProfile';

export default function ChangePassword({close}) {
    const { userDetail } = useContext(UserInformation);
    const initPasswords = {
        new_password: '',
        confirm_password: ''
    }
    const [Passwords, setPasswords] = useState(initPasswords);
    const [AlertMessage, setAlertMessage] = useState(false);

    const ChangePassword = (e) => {
        setPasswords({...Passwords, ...e});
    }

    const submitNewPassword = async () => {
        const URL = '/change-password';
        const params = {...Passwords, id: userDetail.id}
        const postData = await postRequest(URL, params, true);
        if(postData){
            setAlertMessage(postData);
            if(postData.status){
                //success
                setTimeout(() => {
                    close()    
                }, 1000); 
            }else{
                //error
            }
        }
    }
    return (
        <form className="form" action="#" id="kt_modal_add_customer_form" data-kt-redirect="list.html">                       
                {
                    AlertMessage 
                    ?   <Alert variant={ AlertMessage.status ? 'success' : 'danger' } onClose={() => setAlertMessage(false)} dismissible> 
                            <b>{ AlertMessage.message }</b>
                        </Alert>
                    : null
                }                                
                <div className="scroll-y me-n7 pe-7" id="kt_modal_add_customer_scroll" data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto" data-kt-scroll-dependencies="#kt_modal_add_customer_header" data-kt-scroll-wrappers="#kt_modal_add_customer_scroll" data-kt-scroll-offset="300px">
                    <div className="fv-row mb-7">

                        <label className="d-flex align-items-center fs-6 fw-bold form-label mb-2">
                            <span className="required">New Password</span>
                        </label>

                        <input type="text" className="form-control form-control-solid" placeholder name="password" value={Passwords.new_password} onChange={(e) => ChangePassword({new_password: e.target.value})} />
                    </div>
                    <div className="fv-row mb-7">

                        <label className="d-flex align-items-center fs-6 fw-bold form-label mb-2">
                            <span className="required">Confirm Password</span>
                        </label>

                        <input type="text" className="form-control form-control-solid" placeholder name="cpassword" value={Passwords.confirm_password} onChange={(e) => ChangePassword({confirm_password: e.target.value})} />
                    </div>
                    {/*end::Scroll*/}
                </div>
                {/*end::Modal body*/}
                {/*begin::Modal footer*/}
                <div className="modal-footer flex-center">
                    {/*begin::Button*/}
                    <button type="reset" id="kt_modal_add_customer_cancel" className="btn btn-light me-3" onClick={() => close()}>Discard</button>
                    {/*end::Button*/}
                    {/*begin::Button*/}
                    <button type="button" id="kt_modal_add_customer_submit" className="btn btn-primary" onClick={() => submitNewPassword()}>
                        <span className="indicator-label">Submit</span>
                        <span className="indicator-progress">Please wait...
                            <span className="spinner-border spinner-border-sm align-middle ms-2" /></span>
                    </button>
                    {/*end::Button*/}
                </div>
                {/*end::Modal footer*/}
                {/*end::Form*/}            
        </form>
    )
}
