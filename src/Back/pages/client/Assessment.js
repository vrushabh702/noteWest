import React, { useContext, useEffect, useState } from 'react'
import CustModal from '../../../HOC/CustModal'
import Pare from '../../../HOC/ProgressNote/Pare'
import { userData } from './ViewDetail'
import { postRequest, Url } from '../CustomHttp'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { debounce } from 'lodash'
import Loader from 'react-loader-spinner'
import moment from 'moment'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField'
import $ from "jquery";
function Assessment(props) {
    let checkSigned = 0;
    let supervisorSigned = 0;
    let showSigned = 0;

    const [commonData, setCommonData] = useState({ 
        // date_of_service: moment().format('Y-MM-DD'), 
        date_of_service: new Date(), 
        showError: false, count: 0 })
    const { userInfo, changePage, editId } = useContext(userData);
    const [Statement, setStatement] = useState('');
    const [viewEdit, setViewEdit] = useState({ confirmChange: false, diagnosis: userInfo.client_diagnosis ?? [], changeId: false, showModal: false, client_document_id: 0, confirmSave: false, editData: false, viewStatement: false, editBy: '', editTime: '', signed: 1, supervisorSigned: 1, is_updated: 0 });
    const [Data, setData] = useState('');
    const [SignOff, setSignOff] = useState({ signOff: false, signOffConfirm: false, signed: 1, supervisor_signed: 1 });
    // const [latestPiData, setLatestPiData] = useState()
    const [payloadData, setPayloadData] = useState()
    const [selectAllData, setSelectAllData] = useState({})
    const [sentenceLoader, setSentenceLoader] = useState(false)
    const [checkboxLoader, setCheckboxLoader] = useState(false)

    const TestJson = require('./Assessment.json');
    const URL = '/assessment-sentence-builder';

    const saveStatement = async () => {
        const postData = await postRequest("/store-client-document", { Statement, data: { ...Data, client_document_id: viewEdit.client_document_id, view_edit_flag: 1 }, 'document_type': 'assessment', 'client_id': userInfo.id, client_document_id: viewEdit.client_document_id }, true);
        if (postData) {
            setViewEdit({ ...viewEdit, client_document_id: postData.client_document_id, confirmSave: true })
        }
    }

    const signOffFun = async () => {
        // console.log(userInfo);
        const resq = { 
            client_document_id: viewEdit.client_document_id, 
            'document_type': 'assessment',
            'client_id': userInfo.id,
            signed: SignOff.signed,
            supervisor_signed: SignOff.supervisor_signed,
        };
        //supervisor_signed: userInfo.user_supervisor_id ? SignOff.supervisor_signed : 0 
        // console.log(resq);
        const postData = await postRequest("/client-document-update-status", resq, true);
        if (postData) {
            changePage({ id: 6 })
        }
    }
    const [loading, setLoading] = useState(false)
    const setEditableCheckBox = async () => {
        setLoading(true);
        const postData = await postRequest("/client-document-info", { client_document_id: editId }, true);
        if (postData) {
            setStatement(postData.data.paragraph)
            setViewEdit({ ...viewEdit, confirmChange: postData.data.view_edit_flag ? true : false, client_document_id: editId, editData: JSON.parse(postData.data.front_json), diagnosis: postData.data.client_document_diagnosis ?? [], editBy: postData.data.statusUpdatedUserName, editTime: postData.data.statusUpdatedDateTime, signed: postData.data.signed, supervisorSigned: postData.data.supervisor_signed, statusSuperVisorSigned: postData.data.statusUpdatedSupervisorUserName, signature: postData.data.signature })
            setSelectAllData(JSON.parse(postData.data.front_json))
            setCommonData({ ...commonData, date_of_service: postData.data.date_of_service, count: 1 })
        }
        setLoading(false)
    }


    //call date submit function
    const submitDatefunction = debounce(async () => {
        setCommonData({ ...commonData, showError: false, isLoading: true });
        if (commonData.date_of_service != "Invalid date") {
            // getLatestPiData()
            const postData = await postRequest("/set-date-of-service", { client_document_id: viewEdit.client_document_id, date_of_service: commonData.date_of_service, client_id: userInfo.id, document_type: 'assessment' }, true);
            if (postData) {
                setViewEdit({ ...viewEdit, client_document_id: postData.client_document_id })
                setCommonData({ ...commonData, showError: false, isLoading: false, count: 1 });
            }
        } else {
            setCommonData({ ...commonData, showError: true, isLoading: false, count: 22 });
        }

    }, 100)
    // latest-PI calling Commented
    // async function getLatestPiData() {
    //     console.log("Function Call", userInfo.id)
    //     const postData = await postRequest('/latest-PI', { client_id: userInfo.id, }, true);
    //     console.log(postData, 'LAtest APi Data')
    //     if (postData) {
    //         setLatestPiData(postData.data.latest_PI)
    //         console.log(latestPiData)
    //     } else {
    //         setCommonData({ ...commonData, showError: true, isLoading: false, count: 22 });
    //     }
    // }
    //changeCommon data
    const changeCommonData = () => {
        if (viewEdit.client_document_id === 0) {
            setCommonData({ ...commonData, count: 2 })
        }
    }

    //check role and signed 
    // console.log(userInfo.user_role_slug);
    // console.log(viewEdit.signed);
    // console.log(viewEdit.supervisorSigned);
    if (userInfo.user_role_slug == 'clinician') {
        if (viewEdit.signed != 2 && viewEdit.supervisorSigned != 2) {
            if (userInfo.user_supervisor_id) {
                if (viewEdit.signed == 1) {
                    checkSigned = 3
                    supervisorSigned = 4
                    showSigned = 1
                    //REQUEST
                } else if (viewEdit.supervisorSigned == 2) {
                    checkSigned = 4
                    supervisorSigned = 2
                    showSigned = 1
                    //SIGNED
                } else {
                    checkSigned = 3
                    supervisorSigned = 4
                    showSigned = 0
                    //NOTHING
                }
                //REQUEST
            } else {
                checkSigned = 2
                supervisorSigned = 2
                showSigned = 1
                //SIGNED
            }
        } else {
            checkSigned = 2
            supervisorSigned = 2
            showSigned = 1
        }
        // console.log(checkSigned);
        // console.log(supervisorSigned);
        // console.log(showSigned);
    } else if (userInfo.user_role_slug === 'supervisor') {
        if (viewEdit.signed == 3) {
            checkSigned = 4
            supervisorSigned = 2
            showSigned = 1
        } else if (viewEdit.signed === 1) {
            checkSigned = 2
            supervisorSigned = 2
            showSigned = 1
        } else {
            checkSigned = 2
            supervisorSigned = 2
            showSigned = 1
        }
    } else if (userInfo.user_role_slug === 'account') {
        // if (viewEdit.signed == 1 && viewEdit.supervisorSigned == 1) {
        //     checkSigned = 2;
        //     supervisorSigned = 2;
        //     showSigned = 1;
        // } else if (viewEdit.supervisorSigned == 2) {
        //     checkSigned = 2;
        //     supervisorSigned = 2;
        //     showSigned = 1;
        // } else {
        //     checkSigned = 0
        //     supervisorSigned = 0
        //     showSigned = 0
        // }
        if (viewEdit.signed == 3) {
            checkSigned = 4;
            supervisorSigned = 2;
            showSigned = 1;
        } else if (viewEdit.signed == 1) {
            checkSigned = 2;
            supervisorSigned = 2;
            showSigned = 1;
        } else {
            checkSigned = 2;
            supervisorSigned = 2;
            showSigned = 1;
        }
    }

    //download
    const downloadDocument = async () => {
        let signatureText = "<div className='col-xs-12 mt-4'><hr />";

        if (Number(viewEdit.signed) === 2 || Number(viewEdit.supervisorSigned) === 2) {
            if (viewEdit.editBy || viewEdit.supervisorSigned) {
                signatureText += `<p>${viewEdit.signature ?? viewEdit.editBy}, signed this note and declared this information to be accurate and complete on ${viewEdit.editTime}</p>`;
            }
        }
        signatureText += `</div>`;
        const postData = await postRequest("/download-client-document-pdf", 
            { 
                client_document_id: viewEdit.client_document_id,
                signature: signatureText
            }, true);
        if (postData) {
            const link = document.createElement('a');
            link.target = "_blank"
            // link.href = Url + (postData.split('/html')[1]);
            link.href = postData;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    function changeDateForService(e) {


        setCommonData({ ...commonData, date_of_service: moment(e).format('MM/DD/Y') })
        setTimeout(() => {
            $("#assesstmentStart").trigger('click');
        }, 500);
    }

    const getDateOfService = () => {
        return commonData.date_of_service;
    }

    React.useEffect(() => {
        if (editId > 0) {
            setEditableCheckBox()
        }
    }, [])

    // React.useEffect(() => {
    //     if(!viewEdit.confirmChange){
    //     const scrollDiv = document.getElementsByClassName('statementComponent__div')[0];
    //     scrollDiv.scrollTo(0, scrollDiv.offsetTop * 100)
    // }
    // }, [Statement])
    useEffect(() => {
        if (!viewEdit.confirmChange) {
          if ($(".scrollTODiv").length) {
            setTimeout(() => {
              $("#statementComponent__div_id_as").animate({
                scrollTop:
                  $("#statementComponent__div_id_as").scrollTop() +
                  ($(
                    '#statementComponent__div_id_as .scrollTODiv'
                  ).offset()?.top -
                    $("#statementComponent__div_id_as").offset()?.top),
              });
            }, 20);
          }
        }
      },[Statement])

    return (
        <React.Fragment>
            <div className="row g-6 g-xl-9">
                {
                    !viewEdit.confirmChange
                        ? <>
                            <div className="col-lg-7 col-xxl-7 customUl">
                                <div className="card h-100">
                                    <div className="card-body p-9">
                                        <div className='row'>
                                        <div className="col-lg-6 customUi mb-3">
                                            <div className="px-4 py-2 row">
                                                <div className="col-sm-12 col-md-6 pr-0">
                                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                        <DesktopDatePicker
                                                            label="Date Of Service"
                                                            inputFormat="MM/dd/yyyy"
                                                            value={moment.utc(moment(commonData.date_of_service)).format()}
                                                            onChange={changeDateForService}
                                                            renderInput={(params) => <TextField {...params} />}
                                                        />
                                                    </LocalizationProvider>
                                                </div>
                                                <div className="col-md-6 startEndDiv pl-0">
                                                    {
                                                        commonData.isLoading
                                                            ? <Loader
                                                                type="ThreeDots"
                                                                color="#017EAD"
                                                                height={50}
                                                                width={50}
                                                                timeout={300000} />
                                                            : <button className="btn btn-primary allNotes__dateOfServices__btn mx-2" id="assesstmentStart" onClick={submitDatefunction} disabled={!commonData.date_of_service || userInfo.client_diagnosis.length === 0}>{commonData.count === 1 ? <i className='fas fa-pencil-alt' /> : "Start Assessment"}</button>

                                                    }
                                                </div>

                                                {
                                                    commonData.count == 22
                                                        ? <b className='text-danger h3'>Please Start Assessment</b> :
                                                        commonData.count > 1
                                                            ? <b className='text-danger h3'>Please Start Assessment</b>
                                                            : ""
                                                }
                                            </div>
                                        </div>
                                        <div className="col-lg-6 customUi mb-3  d-flex align-items-center">
                                        {userInfo.client_diagnosis.length === 0 && <b className='text-danger h3 mb-0'>Please add diagnosis to create Assessment</b>}  
                                        </div>
                                        <div className="col-xs-12 col-md-12 text-center" style={{height:"20px"}}>
                  {loading &&  <Loader
                            type="ThreeDots"
                            color="#017EAD"
                            height={30}
                            width={30}
                            timeout={300000}
                          /> }
                  </div>
                  </div>
                                        {/* {latestPiData || latestPiData === null ? (
                                            <div className="col-xs-12 col-md-12">
                                                <div class="my-2 pr-2 w-100">
                                                    <textarea 
                                                        type="text" 
                                                        name="latestPiData_notes" 
                                                        defaultValue={latestPiData}
                                                        rows={3}
                                                        class="d-inline-block w-100 form-control form-control-solid" 
                                                        placeholder="Add your notes here">
                                                    </textarea>
                                                </div>
                                            </div>
                                        ) : null} */}
                                        <div className="d-flex flex-column fv-row mb-7">
                                            <Pare
                                            selectAllData={selectAllData}
                                                setStatement={(e) => setStatement(e)}
                                                viewEdit={viewEdit}
                                                setViewEdit={(e) => setViewEdit({ ...viewEdit, client_document_id: e.client_document_id, is_updated: e.is_updated })}
                                                setAllData={setData}
                                                data={TestJson}
                                                URL={URL}
                                                editMode={viewEdit.editData}
                                                commonData={{ commonData, changeCommonData }} 
                                                setpayloadsData={setPayloadData}
                                                getDateOfService={getDateOfService}
                                                setSentenceLoader={setSentenceLoader}
                                                setCheckboxLoader={setCheckboxLoader}
                                                />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </>
                        : ""
                }
                <div className={`clientDetail__tour__step-six col-lg-${!viewEdit.confirmChange ? 5 : 12} col-xxl-${!viewEdit.confirmChange ? 5 : 12}`}>
                    <div className="card h-100" style={{ position: "sticky", top: "70px" }}>
                        <div className="card-body p-9">
                            { sentenceLoader && <div style={{
                                        position:'absolute',
                                        top:0,
                                        left:0,
                                        height:"100%",
                                        width:"100%",
                                        "backdrop-filter": "blur(1.5px)" }}>
                                      <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100%", width:"100%",}}>
                                        <Loader
                                          type="ThreeDots"
                                          color="#017EAD"
                                          height={50}
                                          width={50}
                                          timeout={300000} />
                                      </div>
                                </div>
                            }
                            <div className="">
                                {
                                    viewEdit.confirmChange
                                        ? (viewEdit.diagnosis
                                            ? <div>
                                                <h2>Diagnosis</h2>
                                                {
                                                    viewEdit.diagnosis.map((e) => {
                                                        return e.diagnosis !== null
                                                            ? <div className='d-inline-block bg-grey rounded selected_diagnosis m-2'>
                                                                <div className='d-flex selected_diagnosis__div'>
                                                                    <p>{e.diagnosis.name}  </p>
                                                                </div>
                                                            </div>
                                                            : ""
                                                    }
                                                    )
                                                }
                                                <hr />
                                            </div>
                                            : "")
                                        : ""
                                }
                            </div>
                            <div className="cust__diagnosis_addNew_spaceBet fv-row mb-7">
                                <label className="form-label fw-bolder text-dark fs-6 ">{userInfo.full_name}</label>
                                <label className="form-label fw-bolder text-dark fs-6 ">Assessment</label>
                            </div>
                            <div className="d-flex flex-column statementComponent__div scroll_statement_div fv-row mb-7" id="statementComponent__div_id_as" style={{ maxHeight: "500px","scrollPaddingTop":"50px"  }}>
                                {
                                    viewEdit.confirmChange
                                        ? <CKEditor
                                            editor={ClassicEditor}
                                            name="test"
                                            data={Statement}
                                            config={{ toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'] }}
                                            onChange={(event, editor) => setStatement(editor.getData())}
                                        > </CKEditor>
                                        : <p className="fs-6 text-dark form-label mb-0">
                                            <div style={{ fontSize: "16px" }} dangerouslySetInnerHTML={{ __html: Statement }} />
                                        </p>
                                }
                            </div>
                            <div className="d-flex flex-wrap fv-row mb-7">
                                {
                                    Statement !== ''
                                        ? <button className="btn btn-primary btn-sm me-3 mb-3" onClick={() => { setViewEdit({ ...viewEdit, viewStatement: true }) }}>View</button>
                                        : ""
                                }
                                {
                                    viewEdit.confirmChange
                                        ? <button className="btn btn-info btn-sm me-3 mb-3" onClick={() => saveStatement()}>Save</button>
                                        : <button className="btn btn-info btn-sm me-3 mb-3" disabled={Statement == '' ? true : false} onClick={() => setViewEdit({ ...viewEdit, confirmSave: true })}>Save</button>
                                }
                                {
                                    !viewEdit.confirmChange
                                        ? <button className="btn btn-danger btn-sm me-3 mb-3" disabled={Statement == '' ? true : false} onClick={() => setViewEdit({ ...viewEdit, showModal: true })}>Manually edit</button>
                                        : ""
                                }
                                {
                                    (Statement !== '' || (showSigned == 0 || viewEdit.is_updated !== 0))
                                        ? <button className="btn btn-success btn-sm me-3 mb-3"
                                            onClick={() => setSignOff({ ...SignOff, signOff: true, supervisor_signed: supervisorSigned, signed: checkSigned })}>
                                            {
                                                checkSigned === 3
                                                    ? 'Sign Request'
                                                    : 'Sign Doc'
                                            }
                                        </button>
                                        : ""
                                }
                                <button className="btn btn-warning btn-sm me-3 mb-3" onClick={downloadDocument} disabled={Statement === ''}>
                                    <i className='fa fa-file-download' style={{ width: "10px" }}></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <CustModal show={viewEdit.showModal} close={() => setViewEdit({ ...viewEdit, showModal: false })} header="Are you sure you would like to manually edit your text now?">
                <div className="row">
                    <div className="col-xs-12">
                        <div className='h5'>
                            Are you sure you want to manually edit your document? Once you do, you will no longer have access to the keywords.
                        </div>
                    </div>
                    <div className="col-xs-12 mt-4">
                        <div className="">
                            <button className="btn btn-primary mx-2" onClick={() => setViewEdit({ ...viewEdit, showModal: false, confirmChange: true })}>Yes, manually edit</button>
                            <button className="btn btn-danger mx-2" onClick={() => setViewEdit({ ...viewEdit, showModal: false })}>No, return to keyword selections</button>
                        </div>
                    </div>
                </div>
            </CustModal>

            <CustModal show={SignOff.signOff} close={() => setSignOff({ ...SignOff, signOff: false })} header="Ready to sign doc?" size="sm">
                <div className="row">
                    <div className="col-xs-12">
                        <h4>
                            Are you sure you would like to {checkSigned === 3 ? 'send Sign Request' : 'Sign Doc'} ?
                        </h4>
                    </div>
                    <div className="col-xs-12 mt-4">
                        <div className="">
                            <button className="btn btn-primary mx-2" onClick={() => signOffFun()}>Confirm</button>
                            <button className="btn btn-danger mx-2" onClick={() => setSignOff({ ...SignOff, signOff: false })}>Cancel</button>
                        </div>
                    </div>
                </div>
            </CustModal>

            <CustModal show={viewEdit.viewStatement} close={() => setViewEdit({ ...viewEdit, viewStatement: false })} header={userInfo.full_name} size="lg" centerHeader="Assessment">
                <div className="row">
                    {/* <div className="col-xs-12">
                        {
                            commonData.date_of_service
                                ? <div className='mb-2'><h4>Date Of Service</h4><label>{Moment(commonData.date_of_service).format('DD-MM-YYYY')}</label><hr /></div>
                                : ""
                        }
                        {viewEdit.diagnosis
                            ? <div>
                                <h4>Diagnosis</h4>
                                {
                                    viewEdit.diagnosis.map((e) => {
                                        return e.diagnosis !== null
                                            ? <div className='d-inline-block bg-grey rounded selected_diagnosis m-2'>
                                                <div className='d-flex selected_diagnosis__div'>
                                                    <p>{e.diagnosis.name}  </p>
                                                </div>
                                            </div>
                                            : ""
                                    }
                                    )
                                }
                                <hr />
                            </div>
                            : ""
                        }
                    </div> */}
                    <div className="col-xs-12">
                        <div dangerouslySetInnerHTML={{ __html: Statement }} />
                    </div>
                    {
                        (viewEdit.signed == 2 || viewEdit.supervisorSigned == 2)
                            ? <div className="col-xs-12 mt-4">
                                <hr />
                                {(viewEdit.editBy || viewEdit.supervisorSigned) ? <p>{(viewEdit.signature ?? viewEdit.editBy) + ", signed this note and declared this information to be accurate and complete on " + viewEdit.editTime}</p> : ""}
                            </div>
                            : ''
                    }
                    <div className="col-xs-12 mt-4">
                        <hr />
                        <div className="">
                            <button className="btn btn-primary rounded-sm mx-2" onClick={() => setViewEdit({ ...viewEdit, viewStatement: false })}>Ok</button>
                        </div>
                    </div>
                </div>
            </CustModal>

            <CustModal show={viewEdit.confirmSave} close={() => setViewEdit({ ...viewEdit, confirmSave: false })} header="Success" size="sm">
                <div className="row">
                    <div className="col-xs-12">
                        <h4>
                            Document is saved
                        </h4>
                    </div>
                    <div className="col-xs-12 mt-4">
                        <div className="">
                            <button className="btn btn-primary mx-2" onClick={() => changePage({ id: 6 })}>Go to Profile</button>
                            <button className="btn btn-danger mx-2" onClick={() => setViewEdit({ ...viewEdit, confirmSave: false })}>Continue</button>
                        </div>
                    </div>
                </div>
            </CustModal>
        </React.Fragment>
    )
}

export default Assessment