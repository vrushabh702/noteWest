import React, { useEffect, useState } from "react";
import { Alert, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { clinician } from "../../../Routes/RouterPage";
import { postRequest, getRequest } from "../CustomHttp";
import AccessLevel from "./AccessLevel";
import { getAuthData, getUser } from "../Session";


const renderTooltip = (props) => (
  <Tooltip id="button-tooltip">
    {props}
  </Tooltip>
);

export default function AddClinician() {
  const AuthData = getAuthData();
    const navigate = useNavigate()
    useEffect(() => {
      if(!AuthData.clinic.write){
        navigate('/auth/profile')
      }
    },[])

  let userData = getUser();

  const userId = useParams();
  const navigateTo = useNavigate();
  const tooltipInfo = {signature: "This is how the clinicians signature will appear on their signed documentation. This can be updated at any time and is in real time."}
  const initClinicianInfo = {
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    password2: '',
    email: '',
    phone_number: '',
    work_number: '',
    home_number: '',
    address: '',
    state: '',
    city: '',
    signature: '',
    zipcode: '',
    clinician_type: '',
    role: 'practice_administrator',
    practice_name: userData.practice_name ?? '',
  };
  
  const [passwordMismath, setPasswordMismath] = useState(false);
  const password1Handler = val => {
    if(ClinicianInfo.password2.length >= 6){
      if(val !== ClinicianInfo.password2){
        setPasswordMismath(true)
      }else {
        setPasswordMismath(false)
      }
    } else {
      setPasswordMismath(false)
    }
  }
  const password2Handler = val => {
    if(val.length >= 6){
      if(val !== ClinicianInfo.password){
        setPasswordMismath(true)
      } else {
        setPasswordMismath(false)
      }
    } else {
      setPasswordMismath(false)
    }
  }

  const [ClinicianInfo, setClinicianInfo] = useState(initClinicianInfo);
  const [State, setState] = useState([]);
  const [City, setCity] = useState([]);
  
  const changeClinicianInfo = (e) => {
      setClinicianInfo({...ClinicianInfo, ...e});
  }
  const getUserData = async () => {
    const Url = '/profile';
    const postData = {};
    const getData = await postRequest(Url, postData,true);                          
    if(getData){
       changeClinicianInfo({practice_name: getData.data.practice_name})
    }
}   

  const [alertMessage, setAlertMessage] = useState('');

  const SubmitForm = async () => {           
    let isValidate = window.addClinicianFormValidation();
    if(passwordMismath){
      window.scrollTo(500, 500);
    }
    if(isValidate) {
      const URL = userId.id ? '/update-clinician' : '/create-clinician';
      const postData = ClinicianInfo;
      const uploadData = await postRequest(URL, postData, true);
      if(uploadData){
          //do something
          if(uploadData.status){
            navigateTo(clinician.link);
          }else{
            //
            setAlertMessage(uploadData);
          }
      }
    }
  };

  const getClinicianInfo = async () => {
      const URL = '/clinician-info'
      const params = {clinician_id: userId.id}
      const postData = await postRequest(URL, params, true);
      if(postData){
        if(postData.status){          
          setClinicianInfo(postData.data)
          loadCity(postData.data.state);
        }
      }
  }

    //load state list
    const loadState = async () => {
      var myData = await getRequest('/state');
      if(myData) {
          setState(myData.data);          
      }
  }
  //load city list
  const loadCity = async (stateId) => {                   
      let passData = {
          'state' : stateId,
      };
     
      var myCities = await postRequest('/city', passData);
      if(myCities.status) {                              
          setCity(myCities.data)
      }               
  }

  useEffect(() => {


    getUserData()
    .then(res => {
      if(userId.id){
        getClinicianInfo()      
      }
    })
      loadState();
    return () => {
      //cleanup
    }
  }, [])

  return (
    <React.Fragment>
      <div className="content flex-row-fluid" id="kt_content">
        <form action="" method="post" id="addClinicianForm">          
          <div className="card card-xxl-stretch mb-5 mb-xl-8 tour__step-three--two">            
            <div className="card-header border-0 pt-5">
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label fw-bolder fs-3 mb-1">
                  Access Level
                </span>
              </h3>
            </div>                        
            <AccessLevel onChangeHandler={(e) => changeClinicianInfo({role: e})} checkedValue={ClinicianInfo.role} />          
          </div>                    
          <div className="card card-xxl-stretch mb-5 mb-xl-8">            
            <div className="card-header border-0 pt-5">
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label fw-bolder fs-3 mb-1">
                  User Information
                </span>
              </h3>
            </div>                        
            <div className="card-body py-3">
            <div className="row fv-row mb-2">                
                <div className="col-xl-6">
                  <label className="form-label text-dark fs-6 required">
                    First Name
                  </label>
                  <input
                    className="form-control form-control-lg form-control-solid"
                    type="text"
                    placeholder="Susan"
                    name="first_name"
                    autoComplete="off"
                    value={ClinicianInfo.first_name}
                    onChange={(e) => changeClinicianInfo({first_name: e.target.value})}
                  />
                </div>                                
                <div className="col-xl-6">
                  <label className="form-label text-dark fs-6 required">Last Name</label>
                  <input
                    className="form-control form-control-lg form-control-solid"
                    type="text"
                    placeholder="Smith"
                    name="last_name"
                    autoComplete="off"
                    value={ClinicianInfo.last_name}
                    onChange={(e) => changeClinicianInfo({last_name: e.target.value})}
                  />
                </div>                
              </div> 
              <div className="row fv-row mb-2">
              <div className={"col-xl-"+(userId.id ? 12 : 6)}>
                <label className="align-items-center fs-6 text-dark fw-bold form-label mb-2">
                  <span className="required">User Name:</span>
                </label>
                <input
                  type="text"
                  className="form-control form-control-solid"
                  placeholder="Susan Smith"
                  name="username"
                  value={ClinicianInfo.username}
                  onChange={(e) => changeClinicianInfo({username: e.target.value})}                  
                />
                </div>
                {
                  userId.id
                  ? null
                  : <><div className="col-xl-6">
                        <label className="align-items-center fs-6 text-dark fw-bold form-label mb-2">
                          <span className="required">Password:</span>
                        </label>
                        <input
                          type="password"
                          className="form-control form-control-solid"
                          placeholder="password@123"
                          name="password"
                          value={ClinicianInfo.password}
                          onChange={(e) => {
                            changeClinicianInfo({password: e.target.value})
                            password1Handler(e.target.value)
                          }}                    
                          />
                      </div>
                      <div className="fv-plugins-message-container invalid-feedback" />
                  <div className="col-xl-6">
                        <label className="align-items-center fs-6 text-dark fw-bold form-label mb-2">
                          <span className="required">Confirm Password:</span>
                        </label>
                        <input
                          type="password"
                          className="form-control form-control-solid"
                          placeholder="password@123"
                          name="password2"
                          value={ClinicianInfo.password2}
                          onChange={(e) => {
                            changeClinicianInfo({password2: e.target.value})
                            password2Handler(e.target.value)
                          }}                    
                          />
                      </div>
                      <div className="col-xl-6">
                  <label className="form-label text-dark fs-6">
                    <span className="">Practice Name</span>
                  </label>
                  <input
                    className="form-control form-control-lg form-control-solid"
                    type="text"
                    placeholder="Practice01"
                    name="practice_name"
                    autoComplete="off"
                    value={ClinicianInfo.practice_name}
                    readOnly={true}
                    onChange={(e) => changeClinicianInfo({practice_name: e.target.value})}
                  />
                </div>
                      <div className="fv-plugins-message-container invalid-feedback" />
                      { passwordMismath && <em className="error">Password does't match!!</em>}
                      </>                      
                    }
                </div>                                        

              <div className="row fv-row mb-2">                
                
                <div className="col-xl-12">
                  <label className="form-label text-dark fs-6">
                    <span>Signature</span>
                    <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderTooltip(tooltipInfo.signature)} >                    
                        <i class="fa fa-info-circle" style={{ marginLeft: "10px", color: "#017EAD", fontSize: "15px" }} aria-hidden="true"></i>
                    </OverlayTrigger>  
                    <span className='fw-bold text-gray-700 fs-6'> (This is how your documents  will be signed)</span>
                  </label>
                  <input
                    className="form-control form-control-lg form-control-solid"
                    type="text"
                    placeholder="Susan Smith, LCP, PHD"
                    name="signature"
                    autoComplete="off"
                    value={ClinicianInfo.signature}
                    onChange={(e) => changeClinicianInfo({signature: e.target.value})}
                  />
                </div>
              </div>                                
              <div className="row fv-row mb-2">                
                <div className="col-xl-6">
                  <label className="form-label text-dark fs-6">
                    <span className="required">Email</span>
                  </label>
                  <input
                    className="form-control form-control-lg form-control-solid"
                    type="text"
                    placeholder="SusanSmith@gmail.com"
                    name="email"
                    autoComplete="off"
                    value={ClinicianInfo.email}
                    onChange={(e) => changeClinicianInfo({email: e.target.value})}
                  />
                </div>                                
                <div className="col-xl-6">
                  <label className="form-label text-dark fs-6">
                    Mobile Phone
                  </label>
                  <input
                    className="form-control form-control-lg form-control-solid"
                    type="text"
                    placeholder="7165533333"
                    name="mobileNumber"
                    value={ClinicianInfo.phone_number}
                    onChange={(e) => changeClinicianInfo({phone_number: e.target.value})}
                    autoComplete="off"
                  />
                </div>                
              </div>                          
              <div className="row fv-row mb-2">                
                <div className="col-xl-6">
                  <label className="form-label text-dark fs-6">
                    <span>Work Phone</span>
                  </label>
                  <input
                    className="form-control form-control-lg form-control-solid"
                    type="text"
                    placeholder="7165533333"
                    name="work_phone"
                    autoComplete="off"
                    value={ClinicianInfo.work_number}
                    onChange={(e) => changeClinicianInfo({work_number: e.target.value})}
                  />
                </div>                                
                <div className="col-xl-6">
                  <label className="form-label text-dark fs-6">
                    Home Phone
                  </label>
                  <input
                    className="form-control form-control-lg form-control-solid"
                    type="text"
                    placeholder="7165533333"
                    name="home_phone"
                    value={ClinicianInfo.home_number}
                    onChange={(e) => changeClinicianInfo({home_number: e.target.value})}
                    autoComplete="off"
                  />
                </div>                
              </div>                          
              <div className="row fv-row mb-2">                
                <div className="col-xl-12">
                  <label className="form-label text-dark fs-6">
                    <span>Address</span>
                  </label>
                  <textarea class="form-control form-control-solid" placeholder="123 Prairie Road Richmond, VA 23233" name="address" value={ClinicianInfo.address} onChange={(e) => changeClinicianInfo({address: e.target.value})} rows="5"></textarea>                  
                </div>    
              </div>
              <div className="row fv-row mb-2">                             
                <div className="col-xl-6">
                  <label className="form-label text-dark fs-6">
                    State
                  </label>
                  <select name="state" className="select2-selection select2-selection--single form-select form-select-solid" value={ClinicianInfo.state} onChange={(e) => { changeClinicianInfo({state: e.target.value}); loadCity(e.target.value); }}>
                    <option value="">Select State</option>
                    {
                      State.map((e, i) => <option key={e.id+'_'+i} value={e.id}>{e.name}</option> )                      
                    }
                  </select>                  
                </div>                                                                                                                                    
                <div className="col-xl-6">
                  <label className="form-label text-dark fs-6">
                    City
                  </label>
                  <select name="city" className="select2-selection select2-selection--single form-select form-select-solid" value={ClinicianInfo.city} onChange={(e) => changeClinicianInfo({city: e.target.value})}>
                    <option value="">Select City</option>
                    {
                      City.map((e, i) => <option key={e.id+'_'+i} value={e.id}>{e.city}</option> )
                    }
                  </select>                  
                </div>
                </div>
                <div className="row fv-row mb-2">
                <div className="col-xl-6">
                  <label className="form-label text-dark fs-6">
                    <span>Zipcode</span>
                  </label>
                  <input
                    className="form-control form-control-lg form-control-solid"
                    type="text"
                    placeholder="123456"
                    name="zipcode"
                    autoComplete="off"
                    value={ClinicianInfo.zipcode}
                    onChange={(e) => changeClinicianInfo({zipcode: e.target.value})}
                  />
                </div>
                <div className="col-xl-6">
                  <label className="form-label text-dark fs-6">
                    Clinician Type
                  </label><br />         
                  <input
                    className="form-control form-control-lg form-control-solid"
                    type="text"
                    placeholder="ex: Psychologist"
                    name="clinician_type"
                    autoComplete="off"
                    value={ClinicianInfo.clinician_type}
                    onChange={(e) => changeClinicianInfo({clinician_type: e.target.value})}
                  />              
                </div>   
              </div>                          
              <div className="text-center my-5">

                { alertMessage !== '' ? <Alert variant={ alertMessage.status ? 'success' : 'danger' } className="mt-4" onClose={() => setAlertMessage('')} dismissible>
                                          <b>{ alertMessage.message } 
                                            {alertMessage.message == "Email address already registered" ? "" : <Link to='/auth/profile' state={{showPlanPopUp: true}} className="menu-link px-5">Change Plan</Link>} 
                                            </b>
                                      </Alert>
                                      : '' }                
                <button type="button" id="kt_sign_up_submit" className="btn btn-lg btn-primary" onClick={() => SubmitForm()} >
                  <span className="indicator-label">Submit</span>                 
                </button>                
              </div>
            </div>            
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}
