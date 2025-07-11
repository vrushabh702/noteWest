import React, {useEffect, useRef, useState} from 'react'
import {postRequest} from "../CustomHttp";
import {Alert} from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams} from "react-router-dom";
import PronounceList from '../other/PronounceList';
import { clientDocuments, clients } from '../../../Routes/RouterPage';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import CustModal from '../../../HOC/CustModal';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField } from '@mui/material';
import moment from 'moment';
import { getAuthData, getSession } from '../Session';

export default function AddClient(props) {
    const refClientForm = useRef(null)

    //get update Status
    const urlParams = useParams();   
    const location = useLocation(); 
    useEffect(() => {
      if(location.state){
        if(location.state.clinician_id){
          // console.log("clinician_id : " + location.state.clinician_id);
          setClientData(prev => {
            return {...prev, creator_id:location.state.clinician_id}
          })
        }
      }
    },[])  
    const updateStatus = urlParams.id == '00' ? 0 : urlParams.id; /* I use this method because if someone add something else behind current url so it autometically takes 0 = new client */
    // 0 = add, 1 = edit = userId
    const AuthData = getAuthData();
    const navigate = useNavigate()
    useEffect(() => {
      if(urlParams.id == '00'){
        if(!AuthData.clinic.write){
          navigate('/auth/profile')
        }
      } else {
        if(!AuthData.clinic.modify){
          // navigate('/auth/profile')
        }
      }
      
    },[])
    //history
    const history = useNavigate();

    //alert config
    const InitAlertMessage = {'status' : false, 'message' : 'Something Went Wrong'};
    const [alertShow, setAlertShow] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const [alertMessage, setAlertMessage] = useState(InitAlertMessage);
    
    var initClientInput = {
        first_name: '',
        last_name: '',
        preferred_name: '',
        dob: '',
        pronouns1: '',
        pronouns2: '',
        pronouns3: '',
        legal_guardian: '',
        address: '',
        gender: '',
        phone_number: '',
        email: '',
        insurance_company: '',
        member_id: '',
        group_number: '',
        insurance_carrier_name: '',
        insurance_carrier_dob: '',
        additional_note: '',
        deleteButton:'',
        creator_id:getSession('userData').id,
    }

    const [ClientData, setClientData] = useState(initClientInput);

    const getUserData = async () => {
        const Url = '/client-info';
        const postData = {client_id: updateStatus};        
        const getUser = await postRequest(Url, postData, true);
        if(getUser){            
            setClientData(getUser.data);              
        }  
    }

    const submitClient = async () => {
        let isValidate = window.clientFormValidation();
        const URL = updateStatus !== 0 ? '/update-client' : '/create-client';
        if(isValidate) {         
            var myData = await postRequest(URL, ClientData, true);
            if(myData) {
                setAlertMessage(prevData => prevData = myData);
                setAlertShow(true);
                if(myData.status) {
                    history(urlParams.id && urlParams.id !== '00' ? clientDocuments.link+urlParams.id+'/6' : clients.link)                    
                }
            }
        }
    }

    const changeClientData = (e) => {
        setClientData({...ClientData, ...e});
    }

    const changePronounce = (e, i) => { 
        const value = e.target.value;
        const checked = e.target.checked;        
        const pronounceTmpLiar = {0:ClientData.pronouns1, 1: ClientData.pronouns2, 2: ClientData.pronouns3};
        let selectedData = [];
        if(checked){
            selectedData = {...pronounceTmpLiar, [i]: value};  
        }                 
        
        setClientData({...ClientData, pronouns1: selectedData[0], pronouns2: selectedData[1], pronouns3: selectedData[2]});             
     }     
     const deleteClientHandler = async () => {
        const Url = '/delete-client';
        const postData = {client_id: updateStatus};        
        const deleteCLient = await postRequest(Url, postData, true);
        if(deleteCLient){            
            history('/auth/clients');              
        }  
    }

    //React: hooks
    useEffect(() => {
        if(updateStatus !== 0){
            getUserData();
        }        
        return () => {
            //
        }
    }, []);

    return (
      <>
        <CustModal
          show={confirmModal}
          close={() => setConfirmModal(false)}
          header={`Delete client`}
          size="sm"
        >
          <div>Are you sure you want to delete this client?</div>
          <br />
          <div>
            <button
              className="btn btn-primary mx-2"
              onClick={deleteClientHandler}
            >
              Confirm
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setConfirmModal(false)}
            >
              Cancel
            </button>
          </div>
        </CustModal>
        <div className="content flex-row-fluid">
          <form
            className="form w-100"
            id="clientForm"
            method="post"
            ref={refClientForm}
          >
            <div className="card card-xxl-stretch mb-5 mb-xl-8">
              <div className="card-header border-0 pt-5">
                <h3 className="card-title align-items-start flex-column">
                  <span className="card-label fw-bolder fs-3 mb-1">
                    Client Information
                  </span>
                </h3>
              </div>
              <div className="card-body py-3 tour__step-four--two">
                {alertShow ? (
                  <div className="row mb-10">
                    {" "}
                    <Alert
                      variant={alertMessage.status ? "success" : "danger"}
                      onClose={() => setAlertShow(false)}
                      dismissible
                    >
                      <b>{alertMessage.message}</b>
                    </Alert>{" "}
                  </div>
                ) : (
                  ""
                )}
                <div className="row fv-row mb-2">
                  <div className="col-xl-6">
                    <label className="form-label fw-bolder text-dark fs-6">
                      <span className="required">First Name</span>
                    </label>
                    <input
                      className="form-control form-control-lg form-control-solid"
                      type="text"
                      placeholder="Susan"
                      name="firstName"
                      value={ClientData.first_name ?? ""}
                      onChange={(e) =>
                        changeClientData({ first_name: e.target.value })
                      }
                      autoComplete="off"
                    />
                  </div>
                  <div className="col-xl-6">
                    <label className="form-label fw-bolder text-dark fs-6">
                      <span className="required">Last Name</span>
                    </label>
                    <input
                      className="form-control form-control-lg form-control-solid"
                      type="text"
                      placeholder="Smith"
                      name="lastName"
                      autoComplete="off"
                      value={ClientData.last_name ?? ""}
                      onChange={(e) =>
                        changeClientData({ last_name: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="row fv-row mb-2">
                  <div className="col-xl-6">
                    <label className="form-label fw-bolder text-dark fs-6">
                      <span className="required">Preferred Name</span>
                    </label>
                    <input
                      className="form-control form-control-lg form-control-solid"
                      type="text"
                      placeholder="Susan"
                      name="preferredName"
                      autoComplete="off"
                      value={ClientData.preferred_name ?? ""}
                      onChange={(e) =>
                        changeClientData({ preferred_name: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-xl-6">
                    <label className="required fs-6 fw-bolder text-dark form-label mb-2">
                      Date of Birth
                    </label>
                    {/* <input
                      className="form-control form-control-lg form-control-solid"
                      type="date"
                      placeholder="Date Of Birth"
                      name="dob"
                      autoComplete="off"
                      value={ClientData.dob ?? ""}
                      onChange={(e) =>{
                        console.log("dob",moment(e). format('YYYY-MM-DD'))
                        
                        changeClientData({ dob: e.target.value })
                      } 
                    }
                    /> */}
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        style={{ width: "100%" }}
                        // inputFormat="dd-MM-yyyy"
                        inputFormat="MM-dd-yyyy"
                        InputProps={{
                          disableUnderline: true,
                        }}
                        value={moment.utc(moment(ClientData.dob)).format() ?? ""}
                        onChange={(e) =>
                          changeClientData({ dob: moment(e). format('YYYY-MM-DD') })
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="standard"
                            className="form-control form-control-lg form-control-solid"
                            style={{
                              width: "100%",
                              padding: "0.825rem 1.5rem"
                            }}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </div>
                </div>
                <div className="row fv-row mb-2">
                  <label className="required fs-6 fw-bolder text-dark form-label">
                    Pronouns:
                  </label>
                  {alertShow ? (
                    <em id="pronouns-error" class="error">
                      {alertMessage.message}
                    </em>
                  ) : (
                    ""
                  )}
                  <span id="pronounsError" />
                  <div className="row fv-row mt-4">
                    <PronounceList
                      changeFun={changePronounce}
                      selected={{
                        0: ClientData.pronouns1,
                        1: ClientData.pronouns2,
                        2: ClientData.pronouns3,
                      }}
                      size={4}
                    />
                  </div>
                </div>
                <div className="fv-row row mb-2">
                  <div className="col-sm-12 col-md-6 col-xl-6">
                    <label className="align-items-center fs-6 text-dark fw-bolder form-label mb-2">
                      Legal Guardian
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-solid"
                      placeholder="Max Doe"
                      name="legalGuardian"
                      value={ClientData.legal_guardian ?? ""}
                      onChange={(e) =>
                        changeClientData({ legal_guardian: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-sm-12 col-md-6 col-xl-6">
                    <label className="required align-items-center fs-6 text-dark fw-bolder form-label mb-2">
                      Gender
                    </label>
                    <select
                      name="gender"
                      className="form-select form-select-solid"
                      value={ClientData.gender}
                      onChange={(e) =>
                        changeClientData({ gender: e.target.value })
                      }
                    >
                      <option value="">Select Gender</option>
                      <option value="female">female</option>
                      <option value="male">male</option>
                      <option value="woman">woman</option>
                      <option value="man">man</option>
                      <option value="trans woman">trans woman</option>
                      <option value="trans man">trans man</option>
                      <option value="person of non-binary gender">
                        person of non-binary gender
                      </option>
                      <option value="other">other</option>
                    </select>
                  </div>
                </div>
                <div className="fv-row mb-7">
                  <label className="align-items-center fs-6 text-dark fw-bolder form-label mb-2">
                    Address
                  </label>
                  <textarea
                    className="form-control form-control-solid"
                    placeholder="123 Prairie Road Richmond, VA 23233"
                    name="address"
                    rows="1"
                    value={ClientData.address ?? ""}
                    onChange={(e) =>
                      changeClientData({ address: e.target.value })
                    }
                  />
                </div>
                <div className="row fv-row mb-2">
                  <div className="col-xl-6">
                    <label className="form-label fw-bolder text-dark fs-6">
                      Phone Number
                    </label>
                    <input
                      className="form-control form-control-lg form-control-solid"
                      type="text"
                      placeholder="716-553-3333"
                      name="phoneNumber"
                      autoComplete="off"
                      value={ClientData.phone_number ?? ""}
                      onChange={(e) =>
                        changeClientData({ phone_number: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-xl-6">
                    <label className="form-label fw-bolder text-dark fs-6">
                      Email
                    </label>
                    <input
                      className="form-control form-control-lg form-control-solid"
                      type="text"
                      placeholder="SusanSmith@gmail.com"
                      name="email"
                      autoComplete="off"
                      value={ClientData.email ?? ""}
                      onChange={(e) =>
                        changeClientData({ email: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="row fv-row mb-2">
                  <div className="col-xl-6">
                    <label className="form-label fw-bolder text-dark fs-6">
                      Insurance Company
                    </label>
                    <input
                      className="form-control form-control-lg form-control-solid"
                      type="text"
                      placeholder="Anthem"
                      name="insuranceCompany"
                      autoComplete="off"
                      value={ClientData.insurance_company ?? ""}
                      onChange={(e) =>
                        changeClientData({ insurance_company: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-xl-6">
                    <label className="form-label fw-bolder text-dark fs-6">
                      Member ID:
                    </label>
                    <input
                      className="form-control form-control-lg form-control-solid"
                      type="text"
                      placeholder="123365244"
                      name="memberId"
                      autoComplete="off"
                      value={ClientData.member_id ?? ""}
                      onChange={(e) =>
                        changeClientData({ member_id: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="row fv-row mb-2">
                  <div className="col-xl-6">
                    <label className="form-label fw-bolder text-dark fs-6">
                      Group Number:
                    </label>
                    <input
                      className="form-control form-control-lg form-control-solid"
                      type="text"
                      placeholder="564321"
                      name="groupNumber"
                      autoComplete="off"
                      value={ClientData.group_number ?? ""}
                      onChange={(e) =>
                        changeClientData({ group_number: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-xl-6">
                    <label className="form-label fw-bolder text-dark fs-6">
                      Insurance Carrier's name:
                    </label>
                    <input
                      className="form-control form-control-lg form-control-solid"
                      type="text"
                      placeholder="John doe PVT"
                      name="insuranceCarrierName"
                      autoComplete="off"
                      value={ClientData.insurance_carrier_name ?? ""}
                      onChange={(e) =>
                        changeClientData({
                          insurance_carrier_name: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-md-12 fv-row">
                    <label className="form-label fw-bolder text-dark fs-6">
                      Insurance Carrier's DOB:
                    </label>
                    <input
                      className="form-control form-control-lg form-control-solid"
                      type="date"
                      placeholder="Insurance Carrier's Date Of Birth"
                      name="insuranceCarrierDob"
                      autoComplete="off"
                      value={ClientData.insurance_carrier_dob ?? ""}
                      onChange={(e) =>
                        changeClientData({
                          insurance_carrier_dob: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="fv-row mb-2">
                  <label className="form-label fw-bolder text-dark fs-6">
                    Addition Info/Notes
                  </label>
                  <textarea
                    className="form-control form-control-solid"
                    placeholder="Client was referred by PCP Bryan Green 555-6789 Client insurance changing 6/6/21 to cigna"
                    name="additionalNote"
                    rows="5"
                    onChange={(e) =>
                      changeClientData({ additional_note: e.target.value })
                    }
                    value={ClientData.additional_note}
                  ></textarea>
                </div>
                <div
                  className="text-center mb-10 mt-5"
                  style={{ position: "relative" }}
                >
                  {updateStatus !== 0 && <button
                    type="button"
                    className="btn btn-lg btn-danger"
                    style={{ position: "absolute", left: "0" }}
                    disabled={ClientData.deleteButton !== 1}
                    onClick={() => setConfirmModal(true)}
                  >
                    Delete
                  </button>}
                  {urlParams.id && urlParams.id !== "00" ? (
                    <Link to={clientDocuments.link + urlParams.id + "/6"}>
                      <button className="btn btn-lg btn-secondary">Back</button>{" "}
                    </Link>
                  ) : null}
                  <button
                    type="button"
                    onClick={submitClient}
                    id="kt_sign_up_submit"
                    className="btn btn-lg btn-primary"
                  >
                    <span className="indicator-label">Submit</span>
                    <span className="indicator-progress">
                      Please wait...
                      <span className="spinner-border spinner-border-sm align-middle ms-2" />
                    </span>
                  </button>
                  { updateStatus !== 0 &&
                   ( ClientData.deleteButton !== 1 ? (
                    <p class="note-delete">Please delete all the notes first.</p>
                  ) : null)
                  }
                </div>
              </div>
            </div>
          </form>
        </div>
      </>
    );
}
