import React, { useContext, useState } from 'react';
import Loader from 'react-loader-spinner';
import { postRequest, Url } from '../CustomHttp';
import ReactIndex from '../../../HOC/ReactTable/TableIndex'
import { userData } from './ViewDetail';
import { checkAuth, getSession } from '../Session';
import CustModal from '../../../HOC/CustModal';
import DownloadAll from '../../../HOC/ReactTable/DownloadAll';
import { Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import moment from 'moment';
import DiagnosisComp from './Diagnosis';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField } from '@mui/material';
import { debounce } from 'lodash'

const renderTooltip = (props) => (
    <Tooltip id="button-tooltip">
        {props}
    </Tooltip>
);

export default function ClientDocument(props) {
    const creator_id = getSession('userData').id;
    let ClientColumnsState = [
        {
            Header: 'Document Type',
            accessor: 'document_type.name',
            Cell: ({ cell }) => ((cell.row.original.created_by == creator_id || cell.row.original.supervisor_id == creator_id ) ? <a href='javascript:void(0)' onClick={() => { changeInfo({ ...userInfo, client_diagnosis: cell.row.original.diagnosis }); changePage({ id: cell.row.original.document_type.id, editId: cell.row.original.id }); return true; }}>{cell.row.original.document_type.name}</a> :
            <a href='javascript:void(0)'>{cell.row.original.document_type.name}</a>
        )
        },
        {
            Header: 'Date',
            accessor: 'date_of_service',
            Cell: ({ cell }) => <div className="text-dark">{moment(cell.row.original.date_of_service, 'DD.MM.Y').format('MM/DD/Y')}</div>
        },
        {
            Header: 'Signed',
            accessor: 'last_service_date',
            Cell: ({ cell }) => (<div className={`rounded-lg px-2 py-1 w-fitContent badge badge-light-${cell.row.original.signed.color}`}> {cell.row.original.signed.name} </div>)
        },
        {
            Header: 'Supervisor Signed',
            accessor: 'supervisor_status',
            Cell: ({ cell }) => (<div className={`text-dark rounded-lg px-2 py-1 w-fitContent badge badge-light-${cell.row.original.supervisor_signed.color}`}> {cell.row.original.supervisor_signed.name} </div>)
        },
        {
            Header: () => <div style={{ textAlign: "center" }}>Action</div>,
            accessor: 'create_new',
            Cell: ({ cell }) => {
                return <div className='w-100 text-center'>
                    {
                        ((cell.row.original.signed.name === 'Sign Off') && userInfo.creator_id !== checkAuth().id)
                            ? ""
                            : (cell.row.original.created_by == creator_id || cell.row.original.supervisor_id == creator_id) ?
                            <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={renderTooltip('Edit')} >
                                <button onClick={() => { changeInfo({ ...userInfo, client_diagnosis: cell.row.original.diagnosis }); changePage({ id: cell.row.original.document_type.id, editId: cell.row.original.id }) }} className="btn btn-xs btn-icon btn-bg-light btn-active-color-primary">
                                    <span className="svg-icon svg-icon-2">
                                        <i className='fas fa-pen'></i>
                                    </span>
                                </button>
                            </OverlayTrigger>
                            : ""
                    }
                    <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={renderTooltip('View')} >
                        <button onClick={() => getDocumentDetail(cell.row.original.id, cell.row.original.document_type.name, cell.row.original.created_at)} className="btn btn-xs btn-icon btn-bg-light btn-active-color-primary mx-2">
                            <span className="svg-icon svg-icon-2">
                                <i className='fas fa-eye'></i>
                            </span>
                        </button>
                    </OverlayTrigger>
                    <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={renderTooltip('Download')}>
                        <button onClick={() => downloadDocument(cell.row.original.id)} className="btn btn-xs btn-icon btn-bg-light btn-active-color-primary">
                            <span className="svg-icon svg-icon-2">
                                <i className='fa fa-file-download'></i>
                            </span>
                        </button>
                    </OverlayTrigger>
                    <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={renderTooltip('Delete')}>
                        <button onClick={() => setViewStatement({ ...viewStatement, showDeleteWarning: true, deleteDocId: cell.row.original.id })} className="btn btn-xs btn-icon btn-bg-light btn-active-color-primary mx-2">
                            <span className="svg-icon svg-icon-2">
                                <i className='fas fa-trash'></i>
                            </span>
                        </button>
                    </OverlayTrigger>
                </div>
            },
        },
    ];

    let diagnosisList = [];
    const { userInfo, changePage, changeInfo } = useContext(userData);
    const [documentData, setDocumentData] = React.useState(false);
    const [viewStatement, setViewStatement] = React.useState({ viewModal: false, diagnosis: [], statement: '', signed: '',signed_at:"", editBy: '', editTime: '', loading: false, userSupervisor: false, showDeleteWarning: false, deleteDocId: 0, clientFullName: '',date_of_service: '', signature: '', docDate: '', docType: '', statusSuperVisorSigned: '', supervisorSigned: '',supervisor_signature:"",supervisor_signed_at:""  })
    const [ClientColumns, setClientColumns] = useState(ClientColumnsState)
    const [limit, setLimit] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [tableData, setTableData] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const [startupModal, setStartupModal] = useState(false);
    const [modalStep, setModalStep] = useState(0);
    const [commonData, setCommonData] = useState({ 
            // date_of_service: moment().format('Y-MM-DD'), 
            date_of_service: new Date(), 
            showError: false, count: 0 })
    if (userInfo.client_diagnosis) {
        userInfo.client_diagnosis.map((e) => {
            diagnosisList = [...diagnosisList, e.diagnosis]
        })
    }
const [viewEdit, setViewEdit] = useState({ confirmChange: false, diagnosis: userInfo.client_diagnosis ?? [], changeId: false, showModal: false, client_document_id: 0, confirmSave: false, editData: false, viewStatement: false, editBy: '', editTime: '', signed: 1, supervisorSigned: 1, is_updated: 0 });
    function changeDateForService(e) {


        setCommonData({ ...commonData, date_of_service: moment(e).format('MM/DD/Y') })
        setTimeout(() => {
            // $("#assesstmentStart").trigger('click');
            submitDatefunction()
        }, 500);
    }
    const submitDatefunction = debounce(async () => {
            setCommonData({ ...commonData, showError: false, isLoading: true });
            if (commonData.date_of_service != "Invalid date") {
                // getLatestPiData()
                const postData = await postRequest("/set-date-of-service", { client_document_id: viewEdit.client_document_id, date_of_service: commonData.date_of_service, client_id: userInfo.id, document_type: 'assessment' }, true);
                if (postData) {
                    setViewEdit({ ...viewEdit, client_document_id: postData.client_document_id })
                    setCommonData({ ...commonData, showError: false, isLoading: false, count: 1 });
                    const docData = await postRequest("/client-document-data", { client_id: userInfo.id, limit: limit, page: currentPage+1 }, true);
                    if (docData) {
                        if(docData.data.length > 0){
                            // setStartupModal(true)
                            changePage({ id: docData.data[0].document_type.id, editId: docData.data[0].id })
                        }
                    }
                }
            } else {
                setCommonData({ ...commonData, showError: true, isLoading: false, count: 22 });
            }
    
        }, 100)

    const getClientDocument = async () => {
        setLoading(true);
        const postData = await postRequest("/client-document-data", { client_id: userInfo.id, limit: limit, page: currentPage+1 }, true);
       
        if (postData) {
            if(postData.data.length == 0){
                setStartupModal(true)
            }
            setDocumentData(postData.data);
            setTableData({
                limit: limit,
                currentPage: currentPage,
                totalCount: postData.total_count,
                data: postData.data
            });
            setLoading(false);
        }
    }

    const downloadDocument = async (cdid) => {
        const postData1 = await postRequest("/client-document-info", { client_document_id: cdid }, true);
        if (postData1) {
            const updatedData = postData1.data;

            setViewStatement({
                ...viewStatement,
                diagnosis: updatedData.client_document_diagnosis,
                statement: updatedData.paragraph,
                editBy: updatedData.statusUpdatedUserName,
                editTime: updatedData.statusUpdatedDateTime,
                signed: updatedData.signed,
                signed_at:updatedData.signed_at,
                supervisorSigned: updatedData.supervisor_signed,
                statusSuperVisorSigned: updatedData.statusUpdatedSupervisorUserName,
                signature: updatedData.signature,
                date_of_service: updatedData.date_of_service,
                clientFullName: updatedData.client_first_name+' '+updatedData.client_last_name,
                supervisor_signature:updatedData.supervisor_signature,
                supervisor_signed_at:updatedData.supervisor_signed_at
            });

            let signatureText = "<hr />";
            if (Number(updatedData.signed) === 2 && (updatedData.statusUpdatedUserName || updatedData.supervisor_signed)) {
                signatureText += `<div class='col-xs-12 mt-4'>
                        <p>${updatedData.signature ?? updatedData.statusUpdatedUserName}, signed this note and declared this information to be accurate and complete on ${updatedData.signed_at}</p>
                    </div>`;
            }
            if (updatedData.statusUpdatedUserName && updatedData.supervisor_signature && Number(updatedData.supervisor_signed) === 2) {
                signatureText += `<div class="col-xs-12 mt-4">
                        <p>${updatedData.supervisor_signature}, signed this note and declared this information to be accurate and complete on ${updatedData.supervisor_signed_at}</p>
                    </div>
                    `;
            }
    
            const postData = await postRequest("/download-client-document-pdf", { 
                client_document_id: cdid,
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
    }

    const deleteDocument = async () => {
        const deleteData = await postRequest('/delete-document', { id: viewStatement.deleteDocId, client_id: userInfo.id }, true);
        if (deleteData) {
            if (deleteData.status) {
                getClientDocument()
            }
            setViewStatement({ ...viewStatement, showDeleteWarning: false, deleteDocId: 0 })
        }
    }

    const getDocumentDetail = async (id, docName, docDate) => {
        setViewStatement({ ...viewStatement, viewModal: true, loading: true })
        const postData = await postRequest("/client-document-info", { client_document_id: id }, true);
        if (postData) {
            setViewStatement({
                ...viewStatement,
                viewModal: true,
                loading: false,
                diagnosis: postData.data.client_document_diagnosis,
                statement: postData.data.paragraph,
                editBy: postData.data.statusUpdatedUserName,
                editTime: postData.data.statusUpdatedDateTime,
                signed: postData.data.signed,
                signed_at:postData.data.signed_at,
                supervisorSigned: postData.data.supervisor_signed,
                statusSuperVisorSigned: postData.data.statusUpdatedSupervisorUserName,
                docType: docName,
                docDate,
                signature: postData.data.signature,
                date_of_service: postData.data.date_of_service,
                clientFullName: postData.data.client_first_name+' '+postData.data.client_last_name,
                supervisor_signature:postData.data.supervisor_signature,
                supervisor_signed_at:postData.data.supervisor_signed_at
            })
        }
    }

    const getUserData = async () => {
        const Url = '/profile';
        const postData = { id: getSession('userData').id };
        const getData = await postRequest(Url, postData, true);
        if (getData) {
            if (getData.data.supervisor_id == null) {
                setClientColumns(ClientColumns.filter((e) => e.accessor !== "supervisor_status"))
            }
        }
    }

    // pageIndex, pageSize
    const handlePageChange = (event) => {
        setCurrentPage(event.pageIndex);
        setLimit(event.pageSize);
    };

    React.useEffect(() => {
        // setDocumentData(false);
        getClientDocument();
    }, [currentPage, limit]);

    React.useEffect(() => {
        getUserData()
        getClientDocument()
        return () => { }
    }, []);

    return (
      <React.Fragment>
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
          <Modal.Body>
            <h2>Create your first Note with NoteNest!</h2>
            <p>
              <em>with just a few clicks...</em>
            </p>
            {userInfo ? (
              <DiagnosisComp
                key={"0_1"}
                DiagnosisList={diagnosisList}
                userId={userInfo.id}
                fromModal={true}
              />
            ) : null}
            {/* {userInfo.client_diagnosis.length !== 0 && (
              <div className="row">
                <div className="col-lg-6 customUi mb-3">
                  <div className="px-4 py-2 row">
                    <div className="col-sm-12 col-md-6 pr-0">
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                          label="Date Of Service"
                          inputFormat="MM/dd/yyyy"
                          value={moment
                            .utc(moment(commonData.date_of_service))
                            .format()}
                          onChange={changeDateForService}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </div>
                    <div className="col-md-6 startEndDiv pl-0">
                      {commonData.isLoading ? (
                        <Loader
                          type="ThreeDots"
                          color="#017EAD"
                          height={50}
                          width={50}
                          timeout={300000}
                        />
                      ) : (
                        <button
                          className="btn btn-primary allNotes__dateOfServices__btn mx-2"
                          id="assesstmentStart"
                          onClick={submitDatefunction}
                          disabled={
                            !commonData.date_of_service ||
                            userInfo.client_diagnosis.length === 0
                          }
                        >
                          {commonData.count === 1 ? (
                            <i className="fas fa-pencil-alt" />
                          ) : (
                            "Start Assessment"
                          )}
                        </button>
                      )}
                    </div>

                    {commonData.count == 22 ? (
                      <b className="text-danger h3">Please Start Assessment</b>
                    ) : commonData.count > 1 ? (
                      <b className="text-danger h3">Please Start Assessment</b>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="col-lg-6 customUi mb-3  d-flex align-items-center">
                  {userInfo.client_diagnosis.length === 0 && (
                    <b className="text-danger h3 mb-0">
                      Please add diagnosis to create Note
                    </b>
                  )}
                </div>
              </div>
            )} */}
            {userInfo.client_diagnosis.length !== 0 && (
              <>
 <h4 className='mt-5'>Create your first Note</h4>
              <div className="d-flex flex-row w-100 flex-wrap clientDetail__tour__step-one">                                        
              <button className={`btn border border-info ${props.currentPage === 1 ? "text-info" : "btn-info"} my-1`} onClick={() => props.changePage({ id: 1 })}>
                  New Progress Note
              </button>&nbsp;
              <button className={`btn border border-success ${props.currentPage === 4 ? "text-success" : "btn-success"} my-1`} onClick={() => props.changePage({ id: 4 })}>
                  New Treatment Plan
              </button>&nbsp;
              <button className={`btn border clientDetail__tour__step-four border-warning ${props.currentPage === 3 ? "text-warning" : "btn-warning"} my-1`} onClick={() => props.changePage({ id: 3 })}>
                  New Assessment
              </button>&nbsp;
              <button className={`btn border border-primary ${props.currentPage === 5 ? "text-primary" : "btn-primary"} my-1`} onClick={() => props.changePage({ id: 5 })}>
                  New Discharge Summary
              </button>
              {/* <div className="d-flex" style={{ justifyContent: "space-between", flexGrow: 1 }}>
                  <div></div>
                  <button className="btn btn-secondary my-1 " onClick={() => props.changePage({ id: 2 })}>
                      Upload/View files
                  </button>
              </div> */}
          </div>
          </>
            )}
          </Modal.Body>
        </Modal>
        <div className="card mb-5 mb-xxl-8">
          {/*begin::Body*/}
          <div className="card-body pb-0">
            <div
              className="w-100 d-flex"
              style={{ justifyContent: "space-between" }}
            >
              <div></div>
              <DownloadAll />
            </div>
            <div className="table-responsive ">
              <div className="content flex-row-fluid" id="kt_content">
                {documentData && tableData && !loading ? (
                  <ReactIndex
                    TableData={tableData}
                    columnData={ClientColumns}
                    download_all={true}
                    handlePageChange={(e) => handlePageChange(e)}
                  />
                ) : null}
                {loading ? (
                  <center>
                    <Loader
                      type="ThreeDots"
                      color="#017EAD"
                      height={100}
                      width={100}
                      timeout={300000}
                    />
                  </center>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <CustModal
          show={viewStatement.showDeleteWarning}
          close={() =>
            setViewStatement({ ...viewStatement, showDeleteWarning: false })
          }
          header={`Delete Document`}
          size="md"
        >
          <div>Are you sure you want to delete this note?</div>
          <br />
          <div>
            <button
              className="btn btn-primary mx-2"
              onClick={() => deleteDocument()}
            >
              Confirm
            </button>
            <button
              className="btn btn-secondary"
              onClick={() =>
                setViewStatement({ ...viewStatement, showDeleteWarning: false })
              }
            >
              Cancel
            </button>
          </div>
        </CustModal>

        <CustModal
          show={viewStatement.viewModal}
          close={() => setViewStatement({ ...viewStatement, viewModal: false })}
          header={`${viewStatement.clientFullName}`}
          size="lg"
          centerHeader={viewStatement.docType}
        >
          {!viewStatement.loading ? (
            <div className="row">
              {/* <div className="col-xs-12">                            
                            <h4>{viewStatement.docType}</h4>
                            {Moment(viewStatement.date_of_service).format('DD-MM-YYYY')}
                            <hr />
                        </div>
                        {viewStatement.diagnosis.length > 0
                            ? <div className="col-xs-12">
                                <h4>Diagnosis</h4>
                                {
                                    viewStatement.diagnosis.map((e) => <div className='d-inline-block bg-grey rounded selected_diagnosis m-2'>
                                        <div className='d-flex selected_diagnosis__div'>
                                            <p>{e.diagnosis.name}  </p>
                                        </div>
                                    </div>
                                    )
                                }
                                <hr />
                            </div>
                            : ""
                        } */}
              <div className="col-xs-12">
                <div
                  dangerouslySetInnerHTML={{ __html: viewStatement.statement }}
                />
              </div>
              {(viewStatement.signed == 2 ||
                viewStatement.supervisorSigned == 2) && <hr className="mb-0" />}
              {viewStatement.signed == 2 ? (
                <div className="col-xs-12 mt-4">
                  {viewStatement.editBy || viewStatement.supervisorSigned ? (
                    <p className="mb-0">
                      {(viewStatement.signature ?? viewStatement.editBy) +
                        ", signed this note and declared this information to be accurate and complete on " +
                        viewStatement.signed_at}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}
              {viewStatement.supervisor_signature == null ? (
                ""
              ) : viewStatement.supervisorSigned == 2 ? (
                <div className="col-xs-12 mt-4">
                  {viewStatement.editBy || viewStatement.supervisorSigned ? (
                    <p className="mb-0">
                      {viewStatement.supervisor_signature +
                        ", signed this note and declared this information to be accurate and complete on " +
                        viewStatement.supervisor_signed_at}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}
              <div className="col-xs-12 mt-4">
                <hr className="mt-0" />
                <div className="">
                  <button
                    className="btn btn-primary rounded-sm mx-2"
                    onClick={() =>
                      setViewStatement({ ...viewStatement, viewModal: false })
                    }
                  >
                    Ok
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <center>
              <Loader
                type="ThreeDots"
                color="#017EAD"
                height={100}
                width={100}
                timeout={30000}
              />
            </center>
          )}
        </CustModal>
      </React.Fragment>
    );
}
