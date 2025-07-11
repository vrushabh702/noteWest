import React, { useEffect, useRef, useState } from 'react'
import { Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { account } from '../../../Routes/RouterPage';
import { getRequest, postRequest } from '../CustomHttp';
import PlanCost from '../other/userProfile/PlanCost'
import { getAuthData } from '../Session';

export default function AddAccount() {
    const AuthData = getAuthData();
    const navigate = useNavigate()
    useEffect(() => {
      if(!AuthData.account.write){
        navigate('/auth')
      }
    },[]) 
    const AddAccountRef = useRef();    
    const getParams = useParams();    
    const initAddress = {address: '', city_id: 0, state_id: 0, zipcode: ''}
    const initAccountInfo = {
        first_name: '',
        last_name: '',
        email: '',
        practice_name: '',
        username: '',
        password: '',        
        toc: '',
        qacd: '',
        physical_address: initAddress,
        billing_address: initAddress,
        company_name: '',
        phone_number: '',               
        nonce: '',      
        trial_days: 1,  
        package: 1,
    }    

    const [AccountInfo, setAccountInfo] = useState(initAccountInfo);
    //history
    const RedirectTo = useNavigate();
    
    //alert config
    const InitAlertMessage = {'status' : false, 'message' : 'Something Went Wrong'};
    const [alertShow, setAlertShow] = useState(false);
    const [alertMessage, setAlertMessage] = useState(InitAlertMessage);        

    const [OptionCity, setOptionCity] = useState([]);
    const [OptionBillingCity, setOptionBillingCity] = useState([]);

    const [PhysicalData, setPhysicalData] = useState(initAddress);
    const [BillingData, setBillingData] = useState(initAddress);
    const [sameAsPhysical, setSameAsPhysical] = useState(false);
    
    const [OptionState, setOptionState] = useState([]);    

    const changePhysicalData = (e, stateId = 0) => {        
        setPhysicalData({...PhysicalData, ...e});         
        let checkSameAsPhy = AddAccountRef.current['same_as_phy'].checked;
        if(checkSameAsPhy){
            if(stateId !== 0){
                loadCity(stateId, 2);
            }
            setBillingData({...BillingData, ...e});            
        }
    }

    const changeBillingData = (e) => {
        setBillingData({...BillingData, ...e});        
    }
        
    const sameAsPhysicalFun = (e) => {        
        setSameAsPhysical(e);
        if(e){            
            setBillingData(PhysicalData);   
            loadCity(PhysicalData.state_id, 2);
        }else{
            setBillingData(initAddress);            
        }
    }

    //load state list
    const loadState = async () => {
        var myData = await getRequest('/state');
        if(myData) {
            setOptionState(myData.data);
        }
    }
    //load city list
    const loadCity = async (stateId, forOption = 1) => {                   
        let passData = {
            'state' : stateId,
        };

        if(stateId == 0){
            forOption === 1 ? setOptionCity([]) : setOptionBillingCity([]);                                 
        }else{
            var myCities = await postRequest('/city', passData);
            if(myCities.status) {                                              
                forOption == 1 ? setOptionCity(myCities.data) : setOptionBillingCity(myCities.data);                
            }                
        }
    }

    const submitForm = async () => {
        let isValidate = window.addAccountFormValidation();
        if(isValidate) {
           const postData = {...AccountInfo, physical_address: PhysicalData, billing_address: BillingData};            

            const URL = getParams.id ? '/edit-account' : '/create-account';        
            const uploadData = await postRequest(URL, postData, true);
            if(uploadData){
                //do something
                setAlertShow(true);
                setAlertMessage(uploadData);                
                if(uploadData.status){
                    RedirectTo(account.link);
                }
            }
        }
    }

    const getPackageInfo = (id, price) => {
        setAccountInfo({...AccountInfo, package: id});
    }
    const changeAccountInfo = (e) => {
        setAccountInfo({...AccountInfo, ...e});
    }
    //
    const getAccountInfo = async () => {
        const URL = '/account-info';
        const postData = { id: getParams.id }
        const sentRequest = await postRequest(URL, postData, true);
        if(sentRequest){
            if(sentRequest.status){                
                setAccountInfo({...sentRequest.data});                  
                setPhysicalData(sentRequest.data.physical_address);
                setBillingData(sentRequest.data.billing_address);
                loadCity(sentRequest.data.physical_address.state_id);
                loadCity(sentRequest.data.billing_address.state_id, 2);
            }
        }
    }
    // console.log(AccountInfo, BillingData);
    // React LifeCycle Hook: useEffect
    useEffect(() => {
        loadState();                  
        if(getParams.id){                                
            getAccountInfo();           
        }
        return () => {
            //cleanup
        }
    }, [])
    return (
        <React.Fragment>
            <div className="content flex-row-fluid" id="kt_content">
                {/*begin::Tables Widget 9*/}
                <div className="card card-xxl-stretch mb-5 mb-xl-8">
                    {/*begin::Header*/}
                    <div className="card-header border-0 pt-5">
                    <h3 className="card-title align-items-start flex-column">
                        <span className="card-label fw-bolder fs-3 mb-1">Account Information</span>
                    </h3>
                    </div>
                    {/*end::Header*/}
                    {/*begin::Body*/}
                    <div className="card-body py-3">
                    {/*begin::Form*/}
                    <form className="form w-100" ref={AddAccountRef} noValidate="novalidate" id="addAccountForm">
                        <div className="row fv-row mb-7">
                        {/*begin::Col*/}
                        <div className="col-xl-6">
                            <label className="form-label text-dark fs-6"><span className="required">First Name</span></label>
                            <input className="form-control form-control-lg form-control-solid"
                                type="text" placeholder name="first_name"
                                autoComplete="off" value={AccountInfo.first_name} onChange={(e) => changeAccountInfo({first_name: e.target.value})} />
                        </div>
                        {/*end::Col*/}
                        {/*begin::Col*/}
                        <div className="col-xl-6">
                            <label className="form-label text-dark fs-6"><span className="required">Last Name</span></label>
                            <input className="form-control form-control-lg form-control-solid" type="text" placeholder name="last_name" autoComplete="off" 
                                value={AccountInfo.last_name} onChange={(e) => changeAccountInfo({last_name: e.target.value})} />
                        </div>
                        {/*end::Col*/}
                        </div>
                        {/*end::Input group*/}
                        
                        <div className="row fv-row mb-7">
                            <div className={"col-xl-" + (getParams.id ? 12 : 6)}>
                                <label className="form-label text-dark fs-6"><span className="required">Email</span></label>
                                <input className="form-control form-control-lg form-control-solid" type="text" placeholder name="email" autoComplete="off"
                                        value={AccountInfo.email} onChange={(e) => changeAccountInfo({email: e.target.value})} />
                            </div>
                            {
                                 getParams.id 
                                 ? null
                                 :  <div className="col-xl-6">
                                        <label className="form-label text-dark fs-6"><span className="required">Password</span></label>
                                        <input className="form-control form-control-lg form-control-solid" type="password" placeholder name="password" autoComplete="off"
                                            value={AccountInfo.password} onChange={(e) => changeAccountInfo({password: e.target.value})} />
                                    </div>
                            }                               
                        </div>


                        <div className="row fv-row mb-7">
                            <div className="col-xl-6">
                                <label className="form-label text-dark fs-6"><span className="required">Username</span></label>
                                <input className="form-control form-control-lg form-control-solid" type="text" placeholder name="username" autoComplete="off"
                                    value={AccountInfo.username} onChange={(e) => changeAccountInfo({username: e.target.value})} />
                            </div>
                            <div className="col-xl-6">
                                <label className="form-label text-dark fs-6"><span className="required">Practice Name</span></label>
                                <input className="form-control form-control-lg form-control-solid" type="text" placeholder name="practice_name" autoComplete="off"
                                        value={AccountInfo.practice_name} onChange={(e) => changeAccountInfo({practice_name: e.target.value})} />
                            </div>
                        </div>
                        {/*end::Input group*/}
                        
                        <div className="row fv-row mb-7">
                        <div className="col-xl-6">
                            <label className="form-label text-dark fs-6">Company Name</label>
                            <input className="form-control form-control-lg form-control-solid" type="text" placeholder name="company_name" autoComplete="off"
                                    value={AccountInfo.company_name} onChange={(e) => changeAccountInfo({company_name: e.target.value})} />
                        </div>
                        <div className="col-xl-6">
                            <label className="form-label text-dark fs-6">Phone Number</label>
                            <input className="form-control form-control-lg form-control-solid" type="text" placeholder name="phone_number" autoComplete="off" 
                                    value={AccountInfo.phone_number} onChange={(e) => changeAccountInfo({phone_number: e.target.value})} />
                        </div>
                        </div>
                        {/*end::Input group*/}
                        
                        <div className="fv-row mb-7">
                        <label className="form-label text-dark fs-6">Physical Address </label>
                        <input className="form-control form-control-lg form-control-solid" type="text" placeholder name="phy_address" autoComplete="off" value={PhysicalData.address} onChange={(e) => changePhysicalData({address: e.target.value})} />
                        </div>
                        {/*end::Input group*/}
                        
                        <div className="row fv-row mb-7">                        
                        <div className="col-xl-4">
                            <label className="form-label text-dark fs-6">State</label>
                            <select name="phy_state" className="form-select form-select-solid" value={PhysicalData.state_id} onChange={(e) => { changePhysicalData({state_id: e.target.value}, e.target.value); loadCity(e.target.value, 1); } } >
                            <option value={0}>Select State</option>
                            {
                                OptionState.map((e, i) => {
                                    return <option key={e.id+'_'+i} value={e.id}>{e.name}</option>
                                })
                            }
                            </select>
                        </div>                 
                        <div className="col-xl-4">
                            <label className="form-label text-dark fs-6">City</label>
                            <select name="phy_city" className="form-select form-select-solid" value={PhysicalData.city_id} onChange={(e) => changePhysicalData({city_id: e.target.value})}>
                            <option value={0}>Select City</option>
                            {
                                OptionCity.map((e, i) => {
                                    return <option key={e.id+'_'+i} value={e.id}>{e.city}</option>
                                })
                            }
                            </select>
                        </div>                       
                        <div className="col-xl-4">
                            <label className="form-label text-dark fs-6">Zip Code</label>
                            <input className="form-control form-control-lg form-control-solid" type="text" placeholder name="phy_zipcode" autoComplete="off" value={PhysicalData.zipcode} onChange={(e) => changePhysicalData({zipcode: e.target.value})} />
                        </div>                        
                        </div>                        
                        
                        <div className="fv-row mb-7">
                        <label className="form-check form-check-custom form-check-solid form-check-inline">
                            <input className="form-check-input" type="checkbox" name="same_as_phy" defaultValue={1} onChange={(e) => sameAsPhysicalFun(e.target.checked)} />
                            <span className="form-check-label text-dark fs-6">Same as Physical Address
                            </span>
                        </label>
                        </div>
                        {/*end::Input group*/}
                        
                        <div className="fv-row mb-7">
                        <label className="form-label text-dark fs-6">Billing Address </label>
                        <input className="form-control form-control-lg form-control-solid" type="text" placeholder name="billing_address" autoComplete="off" value={BillingData.address} onChange={(e) => changeBillingData({address: e.target.value})} disabled={sameAsPhysical} />
                        </div>
                        {/*end::Input group*/}
                        
                        <div className="row fv-row mb-7">                       
                            <div className="col-xl-4">
                                <label className="form-label text-dark fs-6">State</label>
                                <select name="billing_state" className="form-select form-select-solid" value={BillingData.state_id} onChange={(e) => { changeBillingData({state_id: e.target.value}); loadCity(e.target.value, 2) } } disabled={sameAsPhysical} >
                                <option value={0}>Select State</option>
                                { 
                                    OptionState.map((e, i) => {
                                        return <option key={e.id+'_'+i} value={e.id}>{e.name}</option>
                                    })
                                }
                                </select>
                            </div>                                                
                            <div className="col-xl-4">
                                <label className="form-label text-dark fs-6">City</label>
                                <select name="billing_city" className="form-select form-select-solid" value={BillingData.city_id} onChange={(e) => changeBillingData({city_id: e.target.value})} disabled={sameAsPhysical}>
                                <option value={0}>Select City</option>
                                {
                                    OptionBillingCity.map((e, i) => {
                                        return <option key={e.id+'_'+i} value={e.id}>{e.city}</option>
                                    })
                                }
                                </select>
                            </div>                        
                            <div className="col-xl-4">
                                <label className="form-label text-dark fs-6">Zip Code</label>
                                <input className="form-control form-control-lg form-control-solid" type="text" placeholder name="billing_zipcode" autoComplete="off" value={BillingData.zipcode} onChange={(e) => changeBillingData({zipcode: e.target.value})} disabled={sameAsPhysical} />
                            </div>                        
                        </div> 
                        {
                            getParams.id 
                            ? null
                            :   <>                                    
                                        <PlanCost shareIdAndCost={getPackageInfo} minVal={AccountInfo.package}>
                                            <div className="col-xl-4">
                                                <label className="form-label text-dark fs-6"><span className="required">Trial Days</span></label>
                                                <input className="form-control form-control-lg form-control-solid" type="number" placeholder name="trial_days" autoComplete="off" min={1} value={AccountInfo.trial_days} onChange={(e) => changeAccountInfo({trial_days: e.target.value}) } />
                                            </div>  
                                        </PlanCost>                                  
                                </>                            
                        }                        
                        <div className="fv-row mb-10">
                                { alertShow ? <Alert variant={ alertMessage.status ? 'success' : 'danger' } onClose={() => setAlertShow(false)} dismissible>
                                        <b>{ alertMessage.message }</b>
                                    </Alert>
                                    : '' }
                            </div>
                        <div className="text-center mb-7">
                            <button type="button" id="kt_sign_up_submit" className="btn btn-lg btn-primary" onClick={() => submitForm()}>
                                <span className="indicator-label">Submit</span>
                                <span className="indicator-progress">Please wait... 
                                <span className="spinner-border spinner-border-sm align-middle ms-2" /></span>
                            </button>
                        </div>                        
                    </form>                    
                    </div>                    
                </div>                
                </div>
        </React.Fragment>
    )
}
