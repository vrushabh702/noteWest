import React, { useRef, useState } from 'react';
import { useContext } from 'react';
import CustModal from '../../../../HOC/CustModal';
import { UserInformation } from './MyProfile';
import UserRole from '../../clinician/AccessLevel';
import { postRequest } from '../../CustomHttp';
import { Link } from 'react-router-dom';
import { editAccount, editClinician } from '../../../../Routes/RouterPage';
import { getUser } from '../../Session';

function TopComponent() {
	const {userDetail, setUserDetail} = useContext(UserInformation);      	
	const getuserData = getUser()
	const autoFocusField = useRef('');	
	const [sueprvisorState, setSupervisorState] = useState({supervisor: userDetail.supervisor_id ?? 0, supervisorList: [],supervisor_name:userDetail.supervisor_name ?? ""})
	const initData = {
		accessLevel: userDetail.role,
		comment: userDetail.comment,
		alertMessage: false,
		accessModal: false		
	}	

	const [TCData, setTCData] = useState(initData);	

    const ProfileImg = (userDetail?.first_name?.split('')[0])+(userDetail?.last_name?.split('')[0]);
    const FullName = userDetail.first_name+' '+userDetail.last_name;
    const Role = userDetail.role_name;   
	
	const changeTCData = (e) => {
		setTCData({...TCData, ...e});
	}

	const getSupervisorList = async () => {
		const postData = await postRequest('/clinician-supervisor-list', {}, true)
		if(postData){			
			if(postData.status){
				setSupervisorState({...sueprvisorState, supervisorList: postData.data})
			}
		}
	}
	
	const postSelectedSupervisor = async (value) => {
		const postData = await postRequest('/save-clinician-supervisor', {profile_id: userDetail.id, supervisor_id: value}, true)
		if(postData){						
			setSupervisorState({...sueprvisorState, supervisor: value})
		}
	}

	const changeRoleAndComment = async () => {
		const URL = '/update-role'
		const params = {id: userDetail.id, role: TCData.accessLevel, comment: TCData.comment}
		const postData = await postRequest(URL, params, true)
		if(postData){
			changeTCData({alertMessage: postData})
			if(postData.status){
				setUserDetail({...userDetail, role: TCData.accessLevel, role_name: postData.data.role_name });
				setTCData({...TCData, accessModal: false});
			}
		}

	}
		
	React.useEffect(() => {
		if(userDetail.role == 'clinician' || 'supervisor'){
			getSupervisorList()
		}
	}, [])	
    return (
      <div className="card mb-5 mb-xxl-8">
        <div className="card-body pt-9 pb-5">
          <div className="d-flex flex-wrap flex-sm-nowrap">
            <div className="me-7 mb-4">
              <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                <div className="profile-text">
                  <p className="text-uppercase">
                    {userDetail ? ProfileImg : ""}
                  </p>
                </div>
                <div className="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px"></div>
              </div>
            </div>
            <div className="flex-grow-1">
              <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                <div className="d-flex flex-column">
                  <div className="d-flex align-items-center mb-2">
                    <div className="text-gray-900 text-hover-primary fs-2 fw-bolder me-1">
                      {FullName}
                    </div>
                  </div>
                </div>
                {/* {
									TCData.accessLevel == 'account'
									?	<div>									
											<Link to={editClinician.link+"/"+userDetail.id} className='pointer'>
												<i className="fas fa-pencil-alt" />
											</Link>
										</div>
									: 	""
								}								 */}
              </div>
              <div className="d-flex flex-wrap flex-stack">
                <div className="d-flex flex-column flex-grow-1 pe-8">
                  <div className="d-flex flex-wrap space-between">
                    {TCData.accessLevel == "account" ? null : (
                      <div className="border border-gray-300 border-dashed rounded py-3 px-4 me-6 d-flex align-items-center mb-2">
                        <div className="fw-bolder fs-6 text-dark">
                          Role:<span className="text-normal px-1">{Role}</span>
                          {userDetail.role == "clinician" ? "" : <i
                            className="fas fa-pencil-alt px-3 c-pointer"
                            onClick={() => changeTCData({ accessModal: true })}
                          ></i>}
                          
                        </div>
                      </div>
                    )}
                    {getuserData.slug == userDetail.role ?
					getuserData.slug == "account" ? "" :
					(
                      <div className="border border-gray-300 border-dashed rounded py-3 px-4 me-6 mb-2">
                        <div className="fw-bolder fs-6 d-flex text-dark align-items-center">
                          <span>Supervisor: </span>&nbsp;{" "}
                          <span className="text-gray-600 fw-normal">
                            {sueprvisorState.supervisor_name}
                          </span>
                          {/* <select className='w-100 py-0 fw-bolder form-select form-select-solid m-0' value={sueprvisorState.supervisor} onChange={(e) => postSelectedSupervisor(e.target.value)}>
														<option value={0}>No Supervisor</option>
														{
															sueprvisorState.supervisorList.map((e, i) => (																	
																 <option key={i+"_"} value={e.id}>{e.first_name} {e.last_name}</option>
															))
														}
													</select> */}
                        </div>
                      </div>
                    )  : userDetail.role == "clinician" || "supervisor" ? 
				
					(
						<div className="border border-gray-300 border-dashed rounded py-3 px-4 me-6 mb-2">
						  <div className="fw-bolder fs-6 d-flex text-dark align-items-center">
							<span>Supervisor: </span>&nbsp;
							<select
							  className="w-100 py-0 fw-bolder form-select form-select-solid m-0"
							  value={sueprvisorState.supervisor}
							  onChange={(e) =>
								postSelectedSupervisor(e.target.value)
							  }
							>
							  <option value={0}>No Supervisor</option>
							  {sueprvisorState.supervisorList.map((e, i) => (
								<option key={i + "_"} value={e.id}>
								  {e.first_name} {e.last_name}
								</option>
							  ))}
							</select>
						  </div>
						</div>
					  )
					  :
					  (
						<div className="border border-gray-300 border-dashed rounded py-3 px-4 me-6 mb-2">
						  <div className="fw-bolder fs-6 d-flex text-dark align-items-center">
							<span>Supervisor: </span>&nbsp;{" "}
							<span className="text-gray-600 fw-normal">
							  {sueprvisorState.supervisor_name}
							</span>
							{/* <select className='w-100 py-0 fw-bolder form-select form-select-solid m-0' value={sueprvisorState.supervisor} onChange={(e) => postSelectedSupervisor(e.target.value)}>
														  <option value={0}>No Supervisor</option>
														  {
															  sueprvisorState.supervisorList.map((e, i) => (																	
																   <option key={i+"_"} value={e.id}>{e.first_name} {e.last_name}</option>
															  ))
														  }
													  </select> */}
						  </div>
						</div>
					  )
				}
                    <div className="border border-gray-300 border-dashed rounded cust__width-521 py-3 px-4 me-6 mb-2">
                      <div className="fw-bolder fs-6 d-flex text-dark align-items-baseline">
                        Comments:{" "}
                        <input
                          type={"text"}
                          name="comment"
                          className="text-gray-400 w-100 border-0"
                          style={{ outline: "none" }}
                          placeholder="Enter Comments"
                          ref={autoFocusField}
                          value={TCData.comment}
                          onChange={(e) =>
                            changeTCData({ comment: e.target.value })
                          }
                          onBlur={() => changeRoleAndComment()}
                        />{" "}
                        <i
                          className="fas fa-pencil-alt px-3 c-pointer"
                          onClick={() => autoFocusField.current.focus()}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-column mt-10"></div>
              </div>
            </div>
          </div>
        </div>
        <CustModal
          show={TCData.accessModal}
          close={() => changeTCData({ accessModal: false })}
          header={"Edit Access Level"}
          size={"md"}
          showAlert={TCData.alertMessage}
          alertMessage={TCData.alertMessage}
          closeAlert={() => changeTCData({ alertMessage: false })}
        >
          <UserRole
            checkedValue={TCData.accessLevel}
            onChangeHandler={(e) => {
              changeTCData({ accessLevel: e });
            }}
          />
          <div className="modal-footer flex-center">
            <button
              type="reset"
              className="btn btn-light me-3"
              onClick={() => changeTCData({ accessModal: false })}
            >
              Discard
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => changeRoleAndComment()}
            >
              <span className="indicator-label">Submit</span>
            </button>
          </div>
        </CustModal>
      </div>
    );
}

export default TopComponent
