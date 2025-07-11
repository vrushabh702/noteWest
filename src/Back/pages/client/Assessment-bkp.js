import React, { useContext, useState } from 'react'
import CustModal from '../../../HOC/CustModal'
import Pare from '../../../HOC/ProgressNote/Pare'
import { userData } from './ViewDetail'
import { postRequest } from '../CustomHttp'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { debounce } from 'lodash'
import Loader from 'react-loader-spinner'

function Assessment() {
    let checkSigned = 0;
    let supervisorSigned = 0;
    let showSigned = 0;

    const [commonData, setCommonData] = useState({ date_of_service: '', showError: false, count: 0 })
    const { userInfo, changePage, editId } = useContext(userData);
    const [Statement, setStatement] = useState('');
    const [viewEdit, setViewEdit] = useState({ confirmChange: false, diagnosis: userInfo.client_diagnosis ?? [], changeId: false, showModal: false, client_document_id: 0, confirmSave: false, editData: false, viewStatement: false, editBy: '', editTime: '', signed: 1, supervisorSigned: 1 });
    const [Data, setData] = useState('');
    const [SignOff, setSignOff] = useState({ signOff: false, signOffConfirm: false, signed: 1, supervisor_signed: 1 });

    const TestJson = require('./Assessment.json');
    const URL = '/assessment-sentence-builder';

    const saveStatement = async () => {
        const postData = await postRequest("/store-client-document", { Statement, data: { ...Data, client_document_id: viewEdit.client_document_id, view_edit_flag: 1 }, 'document_type': 'assessment', 'client_id': userInfo.id, client_document_id: viewEdit.client_document_id }, true);
        if (postData) {
            setViewEdit({ ...viewEdit, client_document_id: postData.client_document_id, confirmSave: true })
        }
    }
    const signOffFun = async () => {
        const postData = await postRequest("/client-document-update-status", { client_document_id: viewEdit.client_document_id, 'document_type': 'assessment', 'client_id': userInfo.id, signed: SignOff.signed, supervisor_signed: SignOff.supervisor_signed }, true);
        if (postData) {
            changePage({ id: 6 })
        }
    }

    const setEditableCheckBox = async () => {
        const postData = await postRequest("/client-document-info", { client_document_id: editId }, true);
        if (postData) {
            setStatement(postData.data.paragraph)
            setViewEdit({ ...viewEdit, confirmChange: postData.data.view_edit_flag ? true : false, client_document_id: editId, editData: JSON.parse(postData.data.front_json), diagnosis: postData.data.client_document_diagnosis ?? [], editBy: postData.data.statusUpdatedUserName, editTime: postData.data.statusUpdatedDateTime, signed: postData.data.signed, supervisorSigned: postData.data.supervisor_signed, statusSuperVisorSigned: postData.data.statusUpdatedSupervisorUserName, signature: postData.data.signature })
            setCommonData({ ...commonData, date_of_service: postData.data.date_of_service, count: 1 })
        }
    }


     //call date submit function
     const submitDatefunction = debounce(async () => {        
        setCommonData({ ...commonData, showError: false, isLoading: true });
        const postData = await postRequest("/set-date-of-service", { client_document_id: viewEdit.client_document_id, date_of_service: commonData.date_of_service, client_id: userInfo.id, document_type: 'assessment' }, true);
        if (postData) {            
            setViewEdit({ ...viewEdit, client_document_id: postData.client_document_id })
            setCommonData({ ...commonData, showError: false, isLoading: false, count: 1 });
        }
    }, 100)

    //changeCommon data
    const changeCommonData = () => {
        if (!commonData.date_of_service) {
            setCommonData({ ...commonData, showError: true })
        }
    }

    //check role and signed    
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
                    checkSigned = 0
                    supervisorSigned = 0
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
            showSigned = 11
        }
    } else if (userInfo.user_role_slug == 'supervisor') {
        if (viewEdit.signed == 3) {
            checkSigned = 4
            supervisorSigned = 2
            showSigned = 1
        } else if (viewEdit.signed == 1) {
            checkSigned = 2
            supervisorSigned = 2
            showSigned = 1
        } else {
            checkSigned = 0
            supervisorSigned = 0
            showSigned = 0
        }
    } else if (userInfo.user_role_slug == 'account') {
        if (viewEdit.signed == 1 && viewEdit.supervisorSigned == 1) {
            checkSigned = 2
            supervisorSigned = 2
            showSigned = 1
        } else {
            checkSigned = 0
            supervisorSigned = 0
            showSigned = 0
        }
    }

    React.useEffect(() => {
        if (editId > 0) {
            setEditableCheckBox()
        }        
    }, [])

    React.useEffect(() => {
        const scrollDiv = document.getElementsByClassName('statementComponent__div')[0];
        scrollDiv.scrollTo(0, scrollDiv.offsetTop)         
    }, [Statement])

    return (
        <React.Fragment>
            <div className="row g-6 g-xl-9">               
                {
                    !viewEdit.confirmChange
                        ? <>
                            <div className="col-lg-8 col-xxl-8 customUl">
                                <div className="card h-100">
                                    <div className="card-body p-9">
                                        <div className="col-lg-6 customUi mb-3">
                                            <div className="px-4 py-2 row">
                                            <div className="col-sm-12 col-md-6 pr-0">
                                                    <label htmlFor='treatmentPlan_date_of_service' className="form-label fw-bolder text-dark fs-6"><span className="required">Date of service</span></label>
                                                    <input className="form-control form-control-lg form-control-solid" type="date" value={commonData.date_of_service} name="serviceDate" id='discharge_date_of_service' onChange={(e) => setCommonData({...commonData, date_of_service: e.target.value})} autoComplete="off" />

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
                                                        : <button className="btn btn-primary allNotes__dateOfServices__btn" onClick={submitDatefunction} disabled={!commonData.date_of_service}><i className={ commonData.count > 0 ? 'fas fa-pencil-alt' : 'fas fa-plus' } /></button>

                                                    }                                                    
                                                </div>
                                                {
                                                    commonData.showError
                                                        ? <b className='text-danger'>Please Enter Date Of Service</b>
                                                        : ""
                                                }
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column fv-row mb-7">
                                            <Pare
                                                setStatement={(e) => setStatement(e)}
                                                viewEdit={viewEdit}
                                                setViewEdit={(e) => setViewEdit({ ...viewEdit, client_document_id: e })}
                                                setAllData={setData}
                                                data={TestJson}
                                                URL={URL}
                                                editMode={viewEdit.editData}
                                                commonData={{ commonData, changeCommonData }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                        : ""
                }
                <div className={`clientDetail__tour__step-six col-lg-${!viewEdit.confirmChange ? 4 : 12} col-xxl-${!viewEdit.confirmChange ? 4 : 12}`}>
                    <div className="card h-100" style={{ position: "sticky", top: "70px" }}>
                        <div className="card-body p-9">
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
                            </div>
                            <div className="d-flex flex-column statementComponent__div scroll_statement_div fv-row mb-7">
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
                                            <div dangerouslySetInnerHTML={{ __html: Statement }} />
                                        </p>
                                }
                            </div>
                            <div className="d-flex fv-row mb-7">
                                {
                                    viewEdit.confirmChange
                                        ? <button className="btn btn-warning btn-sm me-3" onClick={() => saveStatement()}>Save</button>
                                        : <button className="btn btn-danger btn-sm me-3" disabled={Statement == '' ? true : false} onClick={() => setViewEdit({ ...viewEdit, showModal: true })}>Edit</button>
                                }
                                {
                                    Statement !== ''
                                        ? <button className="btn btn-primary btn-sm me-3" onClick={() => { setViewEdit({ ...viewEdit, viewStatement: true }) }}>View</button>
                                        : ""
                                }
                                {
                                    (Statement !== '' && showSigned !== 0)
                                        ? <button className="btn btn-success btn-sm"
                                            onClick={() => setSignOff({ ...SignOff, signOff: true, supervisor_signed: supervisorSigned, signed: checkSigned })}>
                                            {
                                                checkSigned === 3
                                                    ? 'Sign Request'
                                                    : 'Sign Off'
                                            }
                                        </button>
                                        : ""
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CustModal show={viewEdit.showModal} close={() => setViewEdit({ ...viewEdit, showModal: false })} header="Are you sure you would like to manually edit your text now?">
                <div className="row">
                    <div className="col-xs-12">
                        <div className='h5'>
                            Once you type changes in your text,
                            further changes made via keyword selections will not work properly. We recommend that you
                            use the “notes” boxes to add information.
                            We will keep your keyword selections and associated text to duplicate for future notes, however.
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

            <CustModal show={SignOff.signOff} close={() => setSignOff({ ...SignOff, signOff: false })} header="Warning!" size="sm">
                <div className="row">
                    <div className="col-xs-12">
                        <h4>
                            Are you sure you would like to {checkSigned === 3 ? 'Sign Off Request' : 'Sign Off'} ?
                        </h4>
                    </div>
                    <div className="col-xs-12 mt-4">
                        <div className="">
                            <button className="btn btn-primary mx-2" onClick={() => signOffFun()}>Sign Off</button>
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