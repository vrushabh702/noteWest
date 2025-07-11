import React, { useState } from 'react'
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import ChangeDate from '../modal/ChangeDate'
import ChangePronouns from '../modal/ChangePronouns'
import { getMyImageName } from '../Session';
import CustModal from "../../../HOC/CustModal";
import { userData } from './ViewDetail';
import DiagnosisComp from './Diagnosis';
import { authPrefix, clients, editClient } from '../../../Routes/RouterPage';
import { useTour } from '@reactour/tour';
import moment from 'moment';

function ProfileHeader(props) {
    const { setIsOpen, setCurrentStep } = useTour()

    let diagnosisList = [];
    const { userInfo } = useContext(userData);
    const userId = userInfo.id;
    const fullName = userInfo.full_name;
    const userProfileImage = getMyImageName(userInfo.first_name, userInfo.last_name);
    const dateOfBirth = userInfo.dob;
    const pronouns = [1, 2, 3].map((e) => userInfo['pronouns' + e]).filter((e) => e).join(', ');

    const [ShowModalDOB, setShowModalDOB] = useState(false);
    const [ShowModalPronouns, setShowModalPronouns] = useState(false);
    let history = useNavigate();
    // console.log('clientInfo', userInfo);
    if (userInfo.client_diagnosis) {
        userInfo.client_diagnosis.map((e) => {
            diagnosisList = [...diagnosisList, e.diagnosis]
        })
    }

    return (
        <React.Fragment>
            <div className="card mb-5 mb-xxl-8 clientDetail__tour__step-two clientDetail__tour__step-seven">
                <div className="card-body pt-9 pb-5">
                    <div className="d-flex flex-wrap flex-sm-nowrap">
                        <div className="me-7 mb-4">
                            <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                                <div className="profile-text">
                                    <p>
                                        {userId ? userProfileImage : ''}
                                    </p>
                                </div>
                                <button className="btn d-block btn-danger mt-2" style={{width: "175px"}} onClick={() => props.changePage({ id: 6 })}>                                    
                                    View Client Profile
                                </button>
                                <button className="btn d-block btn-orange mt-2" style={{width: "175px"}} onClick={() => history(clients.link)}>                                    
                                    View All Clients
                                </button>
                                <button className="btn d-block btn-secondary mt-2" style={{width: "175px"}} onClick={() => history(authPrefix)}>                                    
                                    View Dashboard
                                </button>
                                <div className='floatingActionButton'>
                                    <button className='btn btn-secondary mt-2' style={{ padding: "20px" }} onClick={() => { setIsOpen(true); setCurrentStep(0) }}>Tour</button>
                                </div>
                            </div>
                        </div>
                        <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                                <div className="d-flex flex-column">
                                    <div className="d-flex align-items-center mb-2">
                                        <span className="text-gray-900 text-primary fs-2 fw-bolder me-1">{fullName}</span>
                                        <Link to={editClient.link + userId} className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                                        <i className="fas fa-pencil-alt" />
                                    </Link>
                                    </div>
                                    <div className="d-flex fw-bolder flex-wrap fs-6 mb-4 pe-2">
                                        <div className="d-flex align-items-center me-5 mb-2">
                                            <i className="fas fa-calendar-alt text-black" /> &nbsp; DOB: <span className="text-normal px-1">{moment(dateOfBirth).format('MM/DD/Y')}</span>
                                            <span onClick={() => setShowModalDOB(true)}><i className="fas fa-pencil-alt px-3" /></span>
                                        </div>
                                        <div className="d-flex align-items-center me-5 mb-2">
                                            <i className="fas fa-map-marker-alt text-black" /> &nbsp; Pronouns: <span className="text-normal px-1">{pronouns}</span>
                                            <span onClick={() => setShowModalPronouns(true)}><i className="fas fa-pencil-alt px-3" /></span>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="d-flex align-items-right mb-2">
                                    
                                </div> */}
                            </div>
                            {
                                props.currentPage === 6
                                    ? <div className="d-flex flex-row w-100 flex-wrap clientDetail__tour__step-one">                                        
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
                                        <div className="d-flex" style={{ justifyContent: "space-between", flexGrow: 1 }}>
                                            <div></div>
                                            <button className="btn btn-secondary my-1 " onClick={() => props.changePage({ id: 2 })}>
                                                Upload/View files
                                            </button>
                                        </div>
                                    </div>
                                    : ""
                            }
                            <div className="d-flex flex-wrap flex-stack">
                                {
                                    userInfo
                                        ? <DiagnosisComp key={"0_1"} DiagnosisList={diagnosisList} userId={userId} />
                                        : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <CustModal show={ShowModalDOB} header={'Change Birth Date'} size={'md'} close={() => setShowModalDOB(false)}>
                <ChangeDate close={() => setShowModalDOB(false)} date={dateOfBirth} userId={userId} />
            </CustModal>
            <CustModal show={ShowModalPronouns} header={'Change Pronouns'} size={'lg'} close={() => setShowModalPronouns(false)}>
                <ChangePronouns close={() => setShowModalPronouns(false)} pronouns={pronouns} userId={userId} />
            </CustModal>
        </React.Fragment>
    )
}

export default React.memo(ProfileHeader);