import React, { useEffect, useRef, useState } from 'react'
import { createContext } from 'react'
import Loader from 'react-loader-spinner'
import ReactIndex from '../../../HOC/ReactTable/TableIndex'
import { postRequest } from '../CustomHttp'
import { addClient, clientDocuments } from '../../../Routes/RouterPage'
import { ClientColumns } from './ClientColumns'
import { useNavigate, useParams } from 'react-router-dom'
import { getAuthData, getSession } from '../Session'
import { Alert, Modal } from 'react-bootstrap'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { TextField } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import moment from 'moment'
import PronounceList from '../other/PronounceList'

export const downloadTokenContext = createContext();

export default function Client() {
    const AuthData = getAuthData();
    const navigate = useNavigate()
    // useEffect(() => {
    //   if(!AuthData.clinic.read){
    //     navigate('/auth/profile')
    //   }
    // },[])
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
//alert config
    const InitAlertMessage = {'status' : false, 'message' : 'Something Went Wrong'};
    const [alertShow, setAlertShow] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const [alertMessage, setAlertMessage] = useState(InitAlertMessage);
    const [ClientData, setClientFormData] = useState(initClientInput);
    const refClientForm = useRef(null)
    const [clientData, setClientData] = useState(false);
    const [downloadToken, setDownloadToken] = useState('');
    const id = useParams();
    const [limit, setLimit] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [tableData, setTableData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchParam, setSearchParam] = useState({search:""});
    const [startupModal, setStartupModal] = useState(false);
    const [modalStep, setModalStep] = useState(0);

    const changeClientData = (e) => {
        setClientFormData({...ClientData, ...e});
    }
    const changePronounce = (e, i) => { 
        const value = e.target.value;
        const checked = e.target.checked;        
        const pronounceTmpLiar = {0:ClientData.pronouns1, 1: ClientData.pronouns2, 2: ClientData.pronouns3};
        let selectedData = [];
        if(checked){
            selectedData = {...pronounceTmpLiar, [i]: value};  
        }                 
        
        setClientFormData({...ClientData, pronouns1: selectedData[0], pronouns2: selectedData[1], pronouns3: selectedData[2]});             
     }  
     const submitClient = async () => {
             let isValidate = window.clientFormValidation();
             const URL = '/create-client';
             if(isValidate) {         
                 var myData = await postRequest(URL, ClientData, true);
                 if(myData) {
                   console.log("myData", myData);
                     setAlertMessage(prevData => prevData = myData);
                     setAlertShow(true);
                     setModalStep(1)
                     if (myData.status) {
                       //  history(urlParams.id && urlParams.id !== '00' ? clientDocuments.link+urlParams.id+'/6' : clients.link)
                       let params = {};
                       params.limit = limit;
                        params.page = currentPage+1;
                       var clientData = await postRequest(
                         "/clients",
                         { clinician_id: id.id, ...params },
                         true
                       );
                       if (clientData) {
                         if (clientData.status) {
                        //    console.log("myData.data", clientData.data);
                           navigate(`/auth/client-documents/${clientData.data[0].id}/6`)
                         }
                       }
                     }
                 }
             }
         }

    const fetchData = async (params = {}, ID) => {
        setLoading(true);
        params.limit = limit;
        params.page = currentPage+1;
        var myData = await postRequest('/clients', {clinician_id: ID, ...params}, true);
        if(myData) {
            if(myData.status) {
                setClientData(myData.data);                
                setDownloadToken(myData.download_token);
                setTableData({
                    limit: limit,
                    currentPage: currentPage,
                    totalCount: myData.total_count,
                    data: myData.data,
                    search: params.search,
                    from_date: params.from_date,
                    to_date: params.to_date
                });
                }else{
                if(myData.data.length === 0 && params?.search === "") setStartupModal(true)
            setClientData([]);
                setTableData({
                    limit: limit,
                    currentPage: currentPage,
                    totalCount: myData.total_count,
                    data: [],
                    search: params.search,
                    from_date: params.from_date,
                    to_date: params.to_date
                });
            }
            setLoading(false);
        }
    }
    // pageIndex, pageSize
    const handlePageChange = (event) => {
        setCurrentPage(event.pageIndex);
        setLimit(event.pageSize);
    };

    const fetchUser = (event) => {
      console.log('event',event)
        setSearchParam(event);
        fetchData(event, id.id);
    };

    useEffect(() => {
        fetchData(searchParam, id.id);
    }, [currentPage, limit]);

    useEffect(() => {
        fetchData(searchParam, id.id);        
        return () => {}
    }, [id]);

    return (
      <React.Fragment>
        <div
          className="content flex-row-fluid tour__step-four--one tour__step-four--three"
          id="kt_content"
        >
          {clientData && tableData ? (
            <ReactIndex
              loader={loading}
              columnData={ClientColumns}
              tableDetail={{
                name: addClient.name,
                link: addClient.link + "00",
                clinician_id: id.id,
              }}
              exportData={{ url: "client-export", downloadToken }}
              fetchUser={fetchUser}
              dateFilter={true}
              TableData={tableData}
              handlePageChange={(e) => handlePageChange(e)}
            />
          ) : null}
          {/* {loading ? (
                    <center>
                        <Loader
                            type="ThreeDots"
                            color="#017EAD"
                            height={100}
                            width={100}
                            timeout={300000} />
                    </center>
                    ) : null
                }                   */}
          <Modal
            show={startupModal}
            size={"lg"}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={() => setStartupModal(false)}
            // backdrop="static"
            // keyboard={false}
          >
             <Modal.Header closeButton style={{borderBottom:"none"}}>
          {/* <Modal.Title>Modal title</Modal.Title> */}
        </Modal.Header>
            <Modal.Body
              style={{ minHeight: "50vh" }}
              className="d-flex align-items-center"
            >
              {modalStep === 0 && (
                <div>
                  <div className="row">
                    <div className="col-md-6">
                      <div>
                        <h1>Welcome! 👋</h1>
                        <p className='mb-5 pb-5'>We are thrilled to have you here!</p>
                        <p className='h6'>Add your first client</p>
                        <div>
                          <input
                            className="form-control form-control-lg form-control-solid"
                            type="text"
                            placeholder="Enter First name"
                            name="firstName"
                            value={ClientData.first_name ?? ""}
                            onChange={(e) =>
                              changeClientData({ first_name: e.target.value })
                            }
                            autoComplete="off"
                          />
                        </div>
                      </div>
                      <div className="text-center mt-10">
                    <button
                      type="button"
                      onClick={() => setModalStep(1)}
                      disabled={ClientData.first_name === ""}
                      // id="kt_sign_up_submit"
                      className="btn btn-lg btn-primary"
                    >
                      Get Started
                    </button>
                  </div>
                    </div>
                    <div className="col-md-6">
                      <img
                        src="/assets/img/welcome.jpg"
                        className="img-fluid"
                      />
                    </div>
                  </div>
                  
                </div>
              )}
              {modalStep !== 0 && (
                <form
                  className="form w-100"
                  id="clientForm"
                  method="post"
                  ref={refClientForm}
                >
                  <div className="card card-xxl-stretch">
                    <div className="card-header border-0">
                      <h3 className="card-title align-items-start flex-column">
                        <span className="card-label fw-bolder fs-3 mb-1">
                          Client Information
                        </span>
                      </h3>
                    </div>
                    <div className="card-body py-3 tour__step-four--two">
                      {alertShow ? (
                        <div className="row">
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
                      {modalStep === 1 && (
                        <>
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
                                  changeClientData({
                                    first_name: e.target.value,
                                  })
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
                                  changeClientData({
                                    last_name: e.target.value,
                                  })
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
                                  changeClientData({
                                    preferred_name: e.target.value,
                                  })
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
                              <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                              >
                                <DesktopDatePicker
                                  style={{ width: "100%" }}
                                  // inputFormat="dd-MM-yyyy"
                                  inputFormat="MM-dd-yyyy"
                                  InputProps={{
                                    disableUnderline: true,
                                  }}
                                  value={
                                    moment
                                      .utc(moment(ClientData.dob))
                                      .format() ?? ""
                                  }
                                  onChange={(e) =>
                                    changeClientData({
                                      dob: moment(e).format("YYYY-MM-DD"),
                                    })
                                  }
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      variant="standard"
                                      className="form-control form-control-lg form-control-solid"
                                      style={{
                                        width: "100%",
                                        padding: "0.825rem 1.5rem",
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
                                  changeClientData({
                                    legal_guardian: e.target.value,
                                  })
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
                        </>
                      )}
                      {modalStep === 2 && (
                        <>
                          
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
                                  changeClientData({
                                    phone_number: e.target.value,
                                  })
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
                                  changeClientData({
                                    insurance_company: e.target.value,
                                  })
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
                                  changeClientData({
                                    member_id: e.target.value,
                                  })
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
                                  changeClientData({
                                    group_number: e.target.value,
                                  })
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
                                changeClientData({
                                  additional_note: e.target.value,
                                })
                              }
                              value={ClientData.additional_note}
                            ></textarea>
                          </div>
                        </>
                      )}

                      <div
                        className="text-end mt-5"
                        style={{ position: "relative" }}
                      >
                        {modalStep === 2 && (
                          <button
                            type="button"
                            onClick={() => setModalStep(1)}
                            className="btn btn-lg btn-secondary mx-3"
                          >
                            Back
                          </button>
                        )}
                        {modalStep === 1 && (
                          <button
                            type="button"
                            onClick={() => setModalStep(2)}
                            className="btn btn-lg btn-secondary mx-3"
                          >
                            Add more Info
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={submitClient}
                          id="kt_sign_up_submit"
                          className="btn btn-lg btn-primary mx-3"
                        >
                          <span className="indicator-label">Create</span>
                          <span className="indicator-progress">
                            Please wait...
                            <span className="spinner-border spinner-border-sm align-middle ms-2" />
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </Modal.Body>
          </Modal>
        </div>
      </React.Fragment>
    );
}
