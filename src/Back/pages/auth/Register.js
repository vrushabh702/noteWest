import React, { useRef, useEffect, useState } from 'react'
import PaymentLoader from './PaymentLoader'
import { Link, useNavigate } from "react-router-dom";
import CustModal from '../../../HOC/CustModal';
import PlanCost from '../other/userProfile/PlanCost';
import { Login, TCPage } from '../../../Routes/RouterPage';
import Header from '../../../Frontend/Header';
import Footer from '../../../Frontend/Footer';
import { PPPage, BAPage } from '../../../Routes/RouterPage';
import Loader from 'react-loader-spinner'

import $ from "jquery";
import TermAndConditions from './TermAndConditions';
import { toast } from 'react-toastify';
import Toastify from '../../../component/toast';

function Register() {
    const [promoCode,setPromoCode] = useState('')

        var CustomHttp = require('../CustomHttp')
        const formVal = useRef(null)
        const history = useNavigate();

        const initOptions = [
            { id: '0', name: 'Select State', short_code: '' }
        ];

        const [options, setOptions] = useState(initOptions)
        const [optionsCity, setOptionsCity] = useState([]);
        const [optionsBillingCity, setOptionsBillingCity] = useState([]);

        const [physicalAddress, setPhysicalAddress] = useState('')
        // const [physicalCity, setPhysicalCity] = useState(0)
        const [physicalState, setPhysicalState] = useState(0)
        const [physicalZipcode, setPhysicalZipcode] = useState('')
        const [physicalCity, setPhysicalCity] = useState('')

        const [billingAddress, setBillingAddress] = useState('')
        // const [billingCity, setBillingCity] = useState(0)
        const [billingState, setBillingState] = useState(0)
        const [billingZipcode, setBillingZipcode] = useState('')
        const [billingCity, setBillingCity] = useState('')   

        //loader 
        const [loader, setLoader] = useState(false)


        //show Payment Modal
        const [showPaymentModal, setShowPaymentModal] = useState(false);
        const closePaymentModal = () => {
            setShowPaymentModal(false);
        }

        //alertMessage 
        const initAlertMessage = {'status': false, 'message': 'something went wrong'};
        const [showAlert, setShowAlert] = useState(false);
        const closeAlert = () => {
            setShowAlert(false);
        }
        const [AlertMessage, setAlertMessage] = useState(initAlertMessage);


        //load state list
        const loadState = async () => {
            var myData = await CustomHttp.getRequest('/state');
            if(myData) {
                setOptions(myData.data);
            }
        }

        //load city list
        const loadCity = async (stateId, forOption = 1) => {                   
            let passData = {
                'state' : stateId,
            };

            if(stateId == 0){
                forOption === 1 ? setOptionsCity([]) : setOptionsBillingCity([]);                                 
            }else{
                var myCities = await CustomHttp.postRequest('/city', passData);
                if(myCities.status) {                              
                    forOption === 1 ? setOptionsCity(myCities.data) : setOptionsBillingCity(myCities.data);                
                }                
            }
        }

        //same as physical
        const sameAsPhysical = (e) => {
            if(formVal.current['same_as_physical'].checked) {
                setBillingAddress(physicalAddress)                            
                setBillingZipcode(physicalZipcode)
                setBillingCity(physicalCity)
            } else {
                setBillingAddress(billingAddress)
                setBillingZipcode(billingZipcode)
                setBillingCity(billingCity)
            }
        }

        const sameAsPhysicalCity = (e) => {            
            if(formVal.current['same_as_physical'].checked) {
                setBillingCity(e);
            } else {
                setBillingCity(billingCity);
            }            
        }

        const sameAsPhysicalState = (e) => {
            if(formVal.current['same_as_physical'].checked) {
                setBillingState(e);
                loadCity(e, 2);
            } else {
                setBillingState(billingState);
            }
        }
        //on change event 
        const onChangePhysicalCity = (e) => {                       
            loadCity(e.target.value, 1);
            sameAsPhysicalState(e.target.value);            
        }
        const getSquareNonce = async (nonce) => { 
            setLoader(true)    
       
            var userRegisterInput = {
                first_name: formVal.current['first_name'].value,                
                last_name: formVal.current['last_name'].value,
                email: formVal.current['email'].value,
                practice_name: formVal.current['practice_name'].value,
                username: formVal.current['username'].value,
                password: formVal.current['password'].value,
                package: formVal.current['package'].value,
                toc: formVal.current['toc'].value,
                pp: formVal.current['pp'].value,
                ba: formVal.current['ba'].value,
                qacd: formVal.current['qacd'].value,
                // company_name: formVal.current['companyName'].value,
                phone_number: formVal.current['phone'].value,
                phy_address: formVal.current['phy_address'].value,
                phy_state: formVal.current['phy_state'].value,
                phy_city: formVal.current['phy_city'].value,
                phy_zipcode: formVal.current['phy_zipcode'].value,
                billing_address: formVal.current['billing_address'].value,
                billing_state: formVal.current['billing_state'].value,
                billing_city: formVal.current['billing_city'].value,
                billing_zipcode: formVal.current['billing_zipcode'].value,
                signature: formVal.current['signature'].value,
                // promo_code: formVal.current['promo_code'].value,
                promo_code: promoCode,
                nonce: nonce,
            } 

            const URL = '/register';            
            const responseData = await CustomHttp.postRequest(URL, userRegisterInput);
            if(responseData){   
                setLoader(false);
                // console.log('res',responseData.message);   
                if ($.inArray('Email address already registered', responseData.message) != -1) {
                    toast.warning("Email address already registered.")
                    $("#email-unique-error").html('Email address already registered');
                    $("#email-unique-error").css('display','block');
                    window.scrollTo(0, 0);
                } else {
                    $("#email-unique-error").css('display','none');
                }
                if ($.inArray('Username is already taken', responseData.message) != -1) {
                    toast.warning("Username is already taken.")
                    $("#username-unique-error").html('Username is already taken');
                    $("#username-unique-error").css('display','block');
                    window.scrollTo(0, 0);
                } else {
                    $("#username-unique-error").css('display','none');
                }          
                setAlertMessage(responseData);                
                if(responseData.status){ 
                    toast.success(responseData.message)   
                    setTimeout(() => {
                        setShowAlert(true);
                        history(Login.link);
                    }, 3000);
                } else {
                    toast.error(responseData.message)   
                }
                closePaymentModal();
            }
            // setLoader(false)
        }
        const [passwordMismatch,setPasswordMismatch] = useState(false)
        const password2Handler = e => {
            const password1= formVal.current['password'].value;
            const val = e.target.value;
            if(val.length >= 6){
                if(val !== password1){
                    setPasswordMismatch(true)
                } else {
                    setPasswordMismatch(false)
                }
            } else {
                setPasswordMismatch(false)
            }
        }
        const password1Handler = e => {
            const password2= formVal.current['password2'].value;
            const val = e.target.value;
            if(password2.length >= 6){
                if(val !== password2){
                    setPasswordMismatch(true)
                } else {
                    setPasswordMismatch(false)
                }
            } else {
                setPasswordMismatch(false)
            }
        }
        const [userData, setUserData] = useState({})
        const [planCost, setPlanCost] = useState("")
        const handleSubmit = async (event) => {
            event.preventDefault();
            let isValidate = window.registerFormValidation();
            if(!isValidate){
                setLoader(false)
            }
            if(isValidate) {
                if(passwordMismatch){
                    alert("Password doesn't match.")
                    return;
                }
                setUserData(
                    {
                        billingContact: {
                          givenName: formVal.current['first_name']?.value ?? "",
                          familyName: formVal.current['last_name']?.value  ?? "",
                          email: formVal.current['email']?.value ?? "",
                          phone: formVal.current['phone']?.value ?? "",
                          addressLines: [formVal.current['phy_address']?.value??""],
                          city: formVal.current['phy_city']?.value??"",
                          state: formVal.current['phy_state']?.value??"",
                          countryCode: 'US',
                        },
                        amount: planCost,
                        currencyCode: 'USD',
                        intent: 'CHARGE',
                      }
                )
                setShowPaymentModal(true);
            }
        }

        const handleEmailBlur = (e) => {
            console.log("handleEmailBlur",e.target.value)
            $("#email-unique-error").css('display','none');
            if(e.target.value.length > 0){
                CustomHttp.getRequest('/check-email?email='+e.target.value).then((res) => {
                    if(res.status){
                        $("#email-unique-error").html('Email address already registered');
                        $("#email-unique-error").css('display','block');
                    } else {
                        $("#email-unique-error").css('display','none');
                    }
                })
            } else {
                $("#email-unique-error").css('display','none');
            }
        }
        const handleUserBlur = (e) => {
            console.log("handleUserBlur",e.target.value);
            $("#username-unique-error").css('display','none');
            if(e.target.value.length > 0){
                CustomHttp.getRequest('/check-username?username='+e.target.value).then((res) => {
                    if(res.status){
                        $("#username-unique-error").html('Username is already taken');
                        $("#username-unique-error").css('display','block');
                    } else {
                        $("#username-unique-error").css('display','none');
                    }
                })
            } else {
                $("#username-unique-error").css('display','none');
            }
        }

        //lifecycle methods        
        useEffect(() => {        
            loadState();    
        }, []);

        return (
            <>
            <Toastify/>
            <Header />
                <div className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed" style={{backgroundImage: 'url(/metronic8/demo2/assets/media/illustrations/sigma-1/14.png',position:"relative"}}>                    
                    <div className="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">                        
                        <div className="w-lg-600px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto rgForm">  
                        {/* OnScreen Loader */}
                        {loader && (
                                     <div className="text-center" style={{
                                        position:"absolute",top:0,left:0,width:'100%',height:"100%",
                                        display:"flex",justifyContent:"center",alignItems:"center",zIndex:9999,backgroundColor:"rgba(255,255,255,0.9)"}}>
                                        <div>
                                        <Loader type="ThreeDots" color="#017EAD" height={100} width={100} timeout={10000}/>                    
                                        <p>Processing... <br/> Please Do not refersh the page.</p>
                                        </div>
                                    </div> 
                                )}
                        {/* {loader ? (
                        <div style={{
                            position:'fixed',
                            left:0,
                            top:'50%',
                            width:'100%',
                            height:'100%',
                            zIndex:9999,
                            }}>
                            <center>
                                <Loader
                                    type="ThreeDots"
                                    color="#017EAD"
                                    height={100}
                                    width={100}
                                    timeout={30000} />
                            </center>
                            </div>
                            ):""}                          */}
                            <form className="form w-100" noValidate="novalidate" id="registerForm" action="/register" ref={formVal} onSubmit={handleSubmit}>                            
                                <div className="mb-10 text-center">                            
                                    <h1 className="text-dark mb-3">Create an Account</h1>                                                        
                                    <div className="text-gray-400 fw-bold fs-4">Already have an account? &nbsp;
                                        <Link to="/login" className="link-primary fw-bolder">Sign in here</Link>
                                    </div>                            
                                </div>                                                        
                                <div className="d-flex align-items-center mb-10">
                                    <div className="border-bottom border-gray-300 mw-50 w-100">
                                    </div>
                                    <span className="fw-bold text-gray-400 fs-7 mx-2">OR</span>
                                    <div className="border-bottom border-gray-300 mw-50 w-100">
                                    </div>
                                </div>                                                        
                                <div className="row fv-row mb-7">                            
                                    <div className="col-xl-6">
                                        <label className="form-label fw-bolder text-dark fs-6"><span className="required">First Name</span></label>
                                        <input className="form-control form-control-lg form-control-solid" type="text" name="first_name" autoComplete="off" />
                                    </div>                                                        
                                    <div className="col-xl-6">
                                        <label className="form-label fw-bolder text-dark fs-6"><span className="required">Last Name</span></label>
                                        <input className="form-control form-control-lg form-control-solid" type="text" name="last_name" autoComplete="off" />
                                    </div>                            
                                </div>                                                        
                                <div className="row fv-row mb-7">
                                    <div className="col-xl-6">
                                        <label className="form-label fw-bolder text-dark fs-6"><span className="required">Email</span></label>
                                        <input className="form-control form-control-lg form-control-solid" type="text" name="email" autoComplete="off" onBlur={handleEmailBlur} />
                                        <em id="email-unique-error" class="error"></em>
                                    </div>
                                    <div className="col-xl-6">
                                        <label className="form-label fs-6 fw-bolder text-dark"><span className="required">Practice name</span></label>
                                        <input className="form-control form-control-lg form-control-solid mb-2" type="text" name="practice_name" autoComplete="off" />
                                    </div>
                                </div>                                                        
                                <div className="row fv-row mb-7">
                                <div className="col-xl-6">
                                        <label className="form-label fs-6 fw-bolder text-dark"><span className="required">Username</span></label>
                                        <input className="form-control form-control-lg form-control-solid mb-2" type="text" name="username" autoComplete="off" onBlur={handleUserBlur} />
                                        <em id="username-unique-error" class="error"></em>
                                    </div>
                                    <div className="col-xl-6">
                                        <label className="form-label fw-bolder text-dark fs-6"><span className="required">Password</span></label>
                                        <input className="form-control form-control-lg form-control-solid" type="password" name="password" onChange={password1Handler} autoComplete="off" />
                                    </div>
                                </div>                                                        
                                <div className="row fv-row mb-7">
                                <div className="col-xl-6">
                                        <label className="form-label fw-bolder text-dark fs-6"><span className="required">Confirm Password</span></label>
                                        <input className="form-control form-control-lg form-control-solid" type="password" name="password2" autoComplete="off" onChange={password2Handler} />
                                        {passwordMismatch && <em class="error">Password doesn't match.</em>}
                                    </div>
                                    {/* <div className="col-xl-6">
                                        <label className="form-label fw-bolder text-dark fs-6">Company Name</label>
                                        <input className="form-control form-control-lg form-control-solid" type="text" name="companyName" autoComplete="off" />
                                    </div> */}
                                    <div className="col-xl-6">
                                        <label className="form-label fw-bolder text-dark fs-6">Phone Number</label>
                                        <input className="form-control form-control-lg form-control-solid" type="text" name="phone" autoComplete="off" />
                                    </div>
                                </div>     
                                <div className="fv-row mb-7">
                                        <label className="form-label"><span className="required  fw-bolder text-dark fs-6">Signature</span> <span className='fw-bold text-gray-700 fs-6'>(This is how your documents  will be signed)</span></label>
                                        <input className="form-control form-control-lg form-control-solid" type="text" name="signature" autoComplete="off" placeholder='John Smith, LCP, PHD' />
                                    </div>                                                     
                                <div className="fv-row mb-7">
                                    <label className="form-label fw-bolder text-dark fs-6">Physical Address </label>
                                    <input className="form-control form-control-lg form-control-solid" type="text" name="phy_address" autoComplete="off"  value={physicalAddress} onKeyUp={() => sameAsPhysical()} onChange={(e) => { setPhysicalAddress(e.target.value); }} />
                                </div>                                                        
                                <div className="row fv-row mb-7">                            
                                    <div className="col-xl-4">
                                        <label className="form-label fw-bolder text-dark fs-6">State</label>
                                        <select name="phy_state" className="form-select form-select-solid" id="physicalState" value={physicalState} onChange={(e) => { setPhysicalState(prevState => prevState = e.target.value); onChangePhysicalCity(e);  }}>                                
                                        <option value={0}>Select State</option>
                                        {options.map((localState, index) => (
                                            <option key={localState.id+'_'+index} value={localState.id}>{localState.name}</option>
                                        ))}
                                        </select>
                                    </div>        
                                    <div className="col-xl-4">
                                        <label className="form-label fw-bolder text-dark fs-6">City</label>
                                        <input className="form-control form-control-lg form-control-solid" type="text" name="phy_city" autoComplete="off" value={physicalCity} onKeyUp={() => sameAsPhysical()} onChange={(e) => setPhysicalCity(e.target.value)} />
                                    </div>                                               
                                    <div className="col-xl-4">
                                        <label className="form-label fw-bolder text-dark fs-6">Zip Code</label>
                                        <input className="form-control form-control-lg form-control-solid" type="text" name="phy_zipcode" autoComplete="off" value={physicalZipcode} onKeyUp={() => sameAsPhysical()} onChange={(e) => setPhysicalZipcode(e.target.value)} />
                                    </div>                            
                                </div>                                                        
                                <div className="fv-row mb-7">
                                    <label className="form-check form-check-custom form-check-solid form-check-inline">
                                        <input className="form-check-input" type="checkbox" name="same_as_physical" onChange={() => {sameAsPhysical(); sameAsPhysicalCity(physicalCity); sameAsPhysicalState(physicalState);}} defaultValue={1} />
                                        <span className="form-check-label fw-bold text-gray-700 fs-6">
                                            Same as Physical Address
                                        </span>
                                    </label>
                                </div>                                                        
                                <div className="fv-row mb-7">
                                    <label className="form-label fw-bolder text-dark fs-6">Billing Address </label>
                                    <input className="form-control form-control-lg form-control-solid" type="text" name="billing_address" autoComplete="off" value={billingAddress} onChange={(e) => setBillingAddress(e.target.value)} />
                                </div>                                                        
                                <div className="row fv-row mb-7">                            
                                    <div className="col-xl-4">
                                        <label className="form-label fw-bolder text-dark fs-6">State</label>
                                        <select name="billing_state" className="form-select form-select-solid" value={billingState} onChange={(e) => { setBillingState(e.target.value); loadCity(e.target.value, 2) }}>
                                        <option value={0}>Select State</option>
                                        {options.map((localState, index) => (
                                            <option key={localState.id+'_'+index} value={localState.id}>{localState.name}</option>
                                        ))}
                                        </select>
                                    </div>                                                        
                                    <div className="col-xl-4">
                                        <label className="form-label fw-bolder text-dark fs-6">City</label>
                                        <input className="form-control form-control-lg form-control-solid" type="text" name="billing_city" autoComplete="off" value={billingCity} onChange={(e) => setBillingCity(e.target.value)} />
                                    </div>                                                   
                                    <div className="col-xl-4">
                                        <label className="form-label fw-bolder text-dark fs-6">Zip Code</label>
                                        <input className="form-control form-control-lg form-control-solid" type="text" name="billing_zipcode" autoComplete="off" value={billingZipcode} onChange={(e) => setBillingZipcode(e.target.value)} />
                                    </div>                            
                                </div>  

                                <PlanCost minVal={1} shareIdAndCost={(value, val_package) => {
                                    // console.log("value, val_package",value, val_package)
                                    setPlanCost(val_package)
                                }}>
                                    {/* <div className="col-xl-4">
                                            <label className="form-label text-dark fs-6 fw-bolder">Promo code</label>  
                                            <input className="form-control form-control-lg form-control-solid" type="text" name="promo_code" placeholder="Enter Promocode" autoComplete="off" onChange={(e) => setPromoCode(e.target.value)} />
                                            {(promoCode == 'NN60FREE'|| promoCode == 'NN60FREEJS') && <p style={{color:"red",fontWeight:"600 !important",marginBottom:"5px"}}>Congratulations! You will not be charged until free trial ends.</p>}
                                    </div>  */}
                                </PlanCost>                            
                                
                                {/* <div className="fv-row mb-7">
                                    <label className="form-label fw-bolder text-dark fs-6">Terms and Conditions</label>
                                    <div className="tandc form-control form-control-lg form-control-solid">
                                        <TermAndConditions/>
                                    </div>
                                </div>                                                         */}
                                <div className="fv-row mb-7 toc_container">
                                    <label className="form-check form-check-custom form-check-solid form-check-inline">
                                        <input className="form-check-input" type="checkbox" id="toc" name="toc" defaultValue={1} />
                                        <span className="form-check-label fw-bold text-gray-700 fs-6">I have read and agree to all of the <a href={TCPage.link} target="_blank">terms and conditions</a> </span>
                                    </label>
                                </div>
                                <div className="fv-row mb-7 pp_container">
                                    <label className="form-check form-check-custom form-check-solid form-check-inline">
                                        <input className="form-check-input" type="checkbox" id="pp" name="pp" defaultValue={1} />
                                        <span className="form-check-label fw-bold text-gray-700 fs-6">I have read and agree to all of the <a href={PPPage.link} target="_blank">privacy policy </a></span>
                                    </label>
                                </div>
                                <div className="fv-row mb-7 ba_container">
                                    <label className="form-check form-check-custom form-check-solid form-check-inline">
                                        <input className="form-check-input" type="checkbox" id="ba" name="ba" defaultValue={1} />
                                        <span className="form-check-label fw-bold text-gray-700 fs-6">I have read and agree to all of the <a href={BAPage.link} target="_blank">business associate agreement </a></span>
                                    </label>
                                </div>                                                        
                                <div className="fv-row mb-10 qacd_container">
                                    <label className="form-check form-check-custom form-check-solid form-check-inline">
                                        <input className="form-check-input" type="checkbox" id="qacd" name="qacd" defaultValue={1} />
                                        <span className="form-check-label fw-bold text-gray-700 fs-6">I understand that the quality and content of my documentation is my responsibility </span>
                                    </label>
                                </div>                            
                                
                                <div className="text-center">
                                    <button type="submit" id="kt_sign_up_submit" className="btn btn-lg btn-primary">
                                        <span className="indicator-label">Continue</span>
                                        <span className="indicator-progress">Please wait... 
                                        <span className="spinner-border spinner-border-sm align-middle ms-2" /></span>
                                    </button>
                                </div>                            
                            </form>   
                        </div>                        
                    </div>                    
                </div>
                <CustModal header="Enter Payment Details" show={showPaymentModal} close={() => {
                       closePaymentModal();
                       setPromoCode(''); 
                }} alertMessage={AlertMessage} showAlert={showAlert} closeAlert={() => closeAlert()}>
                    <div className="">
                                            <label className="form-label text-dark fs-6 fw-bolder">Promo code</label>  
                                            <input className="form-control form-control-lg form-control-solid" type="text" name="promo_code" placeholder="Enter Promocode" autoComplete="off" onChange={(e) => setPromoCode(e.target.value)} />
                                            {(promoCode == 'NN60FREE'|| promoCode == 'NN60FREEJS') && <p style={{color:"red",fontWeight:"600 !important",marginBottom:"5px"}}>Congratulations! You will not be charged until free trial ends.</p>}
                                    </div> 
                    <PaymentLoader getNonce={getSquareNonce} planCost={planCost} 
                    userData={userData}
                    />
                </CustModal>                
            <Footer />
            </>
        )
}


export default Register