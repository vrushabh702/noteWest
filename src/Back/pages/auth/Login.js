import React, {useEffect, useRef, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import CustModal from '../../../HOC/CustModal';
import ForgotPasswordModal from './LoginModal/ForgotPasswordModal';
import ForgotPracticeEmailModal from './LoginModal/ForgotPracticeEmailModal';
import {postRequest} from "../CustomHttp";
import {setSession} from "../Session";
import { Alert } from 'react-bootstrap';
import { authPrefix, Login as LoginPage, Register } from '../../../Routes/RouterPage';
import Header from '../../../Frontend/Header';
import Footer from '../../../Frontend/Footer';
import Loader from 'react-loader-spinner'
import { toast } from 'react-toastify';
import Toastify from '../../../component/toast';



export default function Login(props) {  
  const refLoginForm = useRef(null)
  const [showModal, setShowModal] = useState(false);
  const [ModalId, setModalId] = useState(1);
  const [loader, setLoader] = useState(false)


  //history
  const history = useNavigate();

  //alert config
  const InitAlertMessage = {'status' : false, 'message' : 'Something Went Wrong'};
  const [alertShow, setAlertShow] = useState(false);
  const [alertMessage, setAlertMessage] = useState(InitAlertMessage);

  const CloseModal =  () => {
      setShowModal(false);
  }

  const sendRequest = async () => {  
    setLoader(true)  
    let isValidate = window.loginFormValidation();
    if(isValidate) {
        var userLoginInput = {
            practice_name: refLoginForm.current['loginPracticeName'].value,
            username: refLoginForm.current['loginUsername'].value,
            password: refLoginForm.current['loginPassword'].value            
        }
        // console.log(userLoginInput);
        var myData = await postRequest('/login',userLoginInput);
        if(myData) {
            setLoader(false)  
            // setAlertMessage(prevData => prevData = myData);
            // setAlertShow(true);
            if(myData.status) {
                setSession('userData', myData.data)
                setSession('authData', myData.permission) 
                toast.success(myData.message)   
                setTimeout(() => {
                    if(myData.data.packagestatus === '1') { 
                        history(authPrefix+"/clients");
                    } else {
                        history(authPrefix+"/profile");
                    }
                },2000)              
            } else {
                toast.error(myData.message)
            }
        }
    }
    setLoader(false)  

  }

  const OpenModal = (id) => {
      setShowModal(true);
      setModalId(id);
  }

  useEffect(() => {
    if(alertShow){
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [alertShow])
  
    return (
        <>
        <Toastify autoClose={2000}/>
        <Header />
            <div className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed" style={{backgroundImage: 'url(/metronic8/demo2/assets/media/illustrations/sigma-1/14.png'}}>                
                <div className="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">                    
                    <div className="w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto ">  
                    {/* Loader set */}
                    {loader ? (
                                <div className='login_loader'>
                                <Loader
                                    type="ThreeDots"
                                    color="#017EAD"
                                    height={100}
                                    width={100}
                                    timeout={30000} 
                                    />
                            </div>
                            ):""}  
                        <form className="form w-100" id="loginForm" method="post" ref={refLoginForm}>
                            <div className="text-center mb-10">                        
                                <h1 className="text-dark mb-3">Sign In to NoteNest</h1>               
                                <div className="text-gray-400 fw-bold fs-4">New Here? &nbsp;
                                    <Link to={Register.link} className="link-primary fw-bolder">Create an Account</Link>
                                </div>                        
                            </div>

                            <div className="d-flex align-items-center mb-10">
                                <div className="border-bottom border-gray-300 mw-50 w-100">
                                </div>
                                <span className="fw-bold text-gray-400 fs-7 mx-2">OR</span>
                                <div className="border-bottom border-gray-300 mw-50 w-100">
                                </div>
                            </div>

                            <div className="fv-row mb-10">
                                { alertShow ? <Alert variant={ alertMessage.status ? 'success' : 'danger' } onClose={() => setAlertShow(false)} dismissible>
                                        <b>{ alertMessage.message }</b>
                                    </Alert>
                                    : '' }
                            </div>

                            <div className="fv-row mb-10">                        
                                <label className="form-label fs-6 fw-bolder text-dark">Practice Name</label>                                                
                                <input className="form-control form-control-lg form-control-solid mb-2" type="text" name="loginPracticeName" autoComplete="off" />
                                <Link to={LoginPage.link} onClick={() => { OpenModal(1) }} className="link-primary fs-6 fw-bolder">Forgot Practice Name ?</Link>
                            </div>     

                            <div className="fv-row mb-10">                                                    
                                <label className="form-label fw-bolder text-dark fs-6 mb-0">Username</label>                                                        
                                <input className="form-control form-control-lg form-control-solid mb-2" type="text" name="loginUsername" autoComplete="off" />
                                <Link to={LoginPage.link} onClick={() => { OpenModal(2) }} className="link-primary fs-6 fw-bolder">Forgot Username ?</Link>
                            </div> 

                            <div className="fv-row mb-10">                                                    
                                <label className="form-label fw-bolder text-dark fs-6 mb-0">Password</label>                                                        
                                <input className="form-control form-control-lg form-control-solid mb-2" type="password" name="loginPassword" autoComplete="off" />
                                <Link to={LoginPage.link} onClick={() => { OpenModal(3) }} className="link-primary fs-6 fw-bolder">Forgot Password ?</Link>
                            </div>       

                            <div className="text-center">                        
                                <button type="button" onClick={sendRequest} id="kt_sign_in_submit" className="btn btn-lg btn-primary w-100 mb-5">
                                    <span className="indicator-label">Continue</span>
                                    <span className="indicator-progress">Please wait... 
                                    <span className="spinner-border spinner-border-sm align-middle ms-2" /></span>
                                </button>     
                                <div className="text-center text-muted text-uppercase fw-bolder mb-5">
                                    or
                                </div>
                                <Link to={Register.link} className="btn btn-lg btn-primary w-100 mb-5">
                                    <span className="indicator-label">Don't have an account? Register</span>
                                    <span className="indicator-progress">Please wait... 
                                    <span className="spinner-border spinner-border-sm align-middle ms-2" /></span>
                                </Link>
                            </div>                        
                        </form>  
                    </div>                    
                </div>                
            </div>
            <CustModal show={showModal} close={() => CloseModal() }>
                { (ModalId === 1 || ModalId === 2) 
                    ?  <ForgotPracticeEmailModal close={() => CloseModal()} id={ModalId} /> 
                    : <ForgotPasswordModal close={() => CloseModal()} />
                }                    
            </CustModal>
            <Footer />
        </>
    )
}
