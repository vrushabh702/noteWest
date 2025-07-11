import React, { useContext, useEffect, useRef, useState } from "react";
import CustModal from "../../../../HOC/CustModal";
import { getRequest, postRequest } from "../../CustomHttp";
import ChangePlan from "./ChangePlan";
import { UserInformation } from "./MyProfile";
import { useLocation, useNavigate } from "react-router-dom";
import Toastify from "../../../../component/toast";
import { toast } from "react-toastify";
import { setSession } from "../../Session";
// import ReactPlayer from 'react-player'

function MembershInfo() {
  const history = useNavigate();
  const location = useLocation() 
  const {userDetail, id, setUserDetail} = useContext(UserInformation);  
  const initData = {package_color: 'danger', card_last_digit: '1111', package_status: 'active', person: '1', package_name: ''}
  const reasonRef = useRef("");
  const [OpenModal, setOpenModal] = useState(false);  
  const [OpenModal1, setOpenModal1] = useState(false);  
  const [OpenModal2, setOpenModal2] = useState(false);  
  const membership  = userDetail.membership ? userDetail.membership : initData;
  const [AccountStatus, setAccountStatus] = useState(false);

  const changePlanStatus = (e) => {
    const URL = '/update-account-access'
    const params = {id, status: (e ? 0 : 1) }
    const postData = postRequest(URL, params, true);
    if(postData){
      setAccountStatus(e);      
    }
  }
  useEffect(() => {
    // console.log("location.state",location);
    if(location.state){
      if(location.state.showPlanPopUp){
        setOpenModal(true)
      }
    }
  },[])
  useEffect(() => {
    setAccountStatus(userDetail.account_access === 1 ? false : true)
    return () => {
      //cleanup
    }
  }, [userDetail])

  const getUserData = async () => {
    const Url = '/profile';
    const postData = id ? {id: id} : {};
    const getData = await postRequest(Url, postData,true);                          
    if(getData){
       setUserDetail(getData.data);
    }
}   
  const handleCancelPlan = async () => {
    if(reasonRef.current && reasonRef.current.value === ""){
      reasonRef.current.focus();
    } else {
      const URL = '/cancel-subscription'
      const params = {id:userDetail.id, feedback: reasonRef.current.value}
      const requestData = postRequest(URL, params, true);
      if(requestData){      
          if(requestData.status){
            toast.success(requestData.message) 
            getUserData()
            setSession('userData', null);
            setSession('authData', null);
            history('/login');
            setTimeout(() => {
              toast.success("For security purposes, please log back in to access your account.");
            }, 500);
          } else {
            toast.error(requestData.message) 
          }
          setOpenModal2(false)
      } else {
        toast.error("Something Went Wrong. Try again later!")
      }
      // const requestData = await getRequest('/cancel-subscription/'+userDetail.id,true)
      // if(requestData){
      //   // console.log(requestData) // {status: true, message: 'Your subscription is cancelled', data: Array(0)}
      // }
    }
   
  }

  return (
    <>
      <Toastify autoClose={2000} />
      <CustModal
        show={OpenModal1}
        close={() => setOpenModal1(false)}
        header={"Cancel Subscription"}
      >
        <div className="row">
          <div className="col-xs-12 mb-4">
            <h2 className="text-center mb-5">
              Are you sure you would like to cancel the plan ?
            </h2>
          </div>
          <div className="col-xs-12 mt-5">
            <div className="text-center">
              <button
                className="btn btn-primary mx-2"
                onClick={() => {
                  setOpenModal1(false);
                  setOpenModal2(true);
                }}
              >
                Confirm
              </button>
              <button
                className="btn btn-danger mx-2"
                onClick={() => setOpenModal1(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </CustModal>
      <CustModal
        show={OpenModal2}
        close={() => setOpenModal2(false)}
        header={"We’re sorry to see you go! Your feedback is invaluable."}
      >
        <div className="row">
          <div className="col-xs-12 mb-4">
            {/* <p className="fw-bolder text-dark text-end customWidthTd mb-5">
              Before you finalize, would you be interested in alternative options? We offer subscription adjustments, 
              discounts or a pause feature if you need a break. Let us know how we can better support you, Call Us <b>+1 804-847-0617</b>
            </p> */}
            <p className="fw-bolder text-dark mb-5">
              Before you finalize, would you be interested in alternative options? We offer subscription adjustments, 
              discounts, or a pause feature if you need a break. Let us know how we can better support you, Call Us 
              <a href="tel:+18048470617" className="text-primary fw-bold"> +1 804-847-0617</a>.
            </p>
            <div className="fv-row mb-7">
                  {/* <label className="align-items-center fs-6 text-dark fw-bolder form-label mb-2">
                    Address
                  </label> */}
                  <textarea
                    className="form-control form-control-solid"
                    placeholder="Let us know why you’re canceling and we’ll use it to improve our services for the future."
                    name="address"
                    rows="3"
                    ref={reasonRef}
                    required
                    // value={ClientData.address ?? ""}
                    // onChange={(e) =>
                    //   changeClientData({ address: e.target.value })
                    // }
                  />
                </div>
          </div>
          <div className="col-xs-12 mt-5">
            <div className="text-center">
              <button
                className="btn btn-danger mx-2"
                onClick={handleCancelPlan}
              >
                Cancel Plan
              </button>
              {/* <button
                className="btn btn-danger mx-2"
                onClick={() => setOpenModal2(false)}
              >
                Cancel
              </button> */}
            </div>
          </div>
        </div>
      </CustModal>
      <div class="card card-xxl-stretch mb-5 mb-xl-8">
        <div class="card-header border-0 pt-5">
          <h3 class="card-title align-items-start flex-column">
            <span class="card-label fw-bolder fs-3 mb-1">Membership</span>
          </h3>
        </div>
        <div class="card-body p-9 pt-0">
          <div class="table-responsive">
            <table class="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
              <tbody>
                <tr>
                  <td class="fw-bolder text-dark text-end customWidthTd">
                    Current Plan
                  </td>
                  <td class="text-normal fs-6 text-dark ">
                    <span
                      class={
                        "badge badge-light-" +
                        (membership.package_color ?? "red")
                      }
                    >
                      {membership.package_name} (
                      {membership.remaining_day_plan ?? 0})
                    </span>
                  </td>
                </tr>
                <tr>
                  <td class="fw-bolder text-dark text-end customWidthTd">
                    Monthly Users
                  </td>
                  <td class="text-normal fs-6 text-dark ">
                    {membership.person ?? 1} (
                    {parseInt(membership.remaining_account) > 0
                      ? " " +
                        membership.remaining_account +
                        `${
                          membership.remaining_account == 1 ? " seat" : " seats"
                        } remaining `
                      : "Limit Reached"}
                    )
                  </td>
                </tr>
                <tr>
                  <td class="fw-bolder text-dark text-end customWidthTd">
                    Monthly Cost
                  </td>
                  <td class="text-normal fs-6 text-dark ">
                    <span>{membership.total_price}</span>
                  </td>
                </tr>
                <tr>
                  <td class="fw-bolder text-dark text-end customWidthTd">
                    Status
                  </td>
                  <td class="text-normal fs-6 text-dark ">
                    <span
                      class={`badge badge-light-${
                        membership.status == 1
                          ? "success"
                          : membership.status == 2
                          ? "danger"
                          : membership.status == 3
                          ? "danger"
                          : membership.status == 4
                          ? "danger"
                          : "danger"
                      }`}
                    >
                      {membership.status == 1
                        ? "Active"
                        : membership.status == 2
                        ? "Deactivate"
                        : membership.status == 3
                        ? "Cancel"
                        : membership.status == 4
                        ? "Expired"
                        : "Inactive"}
                    </span>
                    {/* <span class={"badge badge-light-"+(membership.package_color ?? 'red')}>{ membership.package_status }</span> */}
                  </td>
                </tr>
                {membership.card_last_digit ? (
                  <tr>
                    <td class="fw-bolder text-dark text-end customWidthTd">
                      Card Number
                    </td>
                    <td class="text-normal fs-6 text-dark ">
                      **** {membership.card_last_digit}
                    </td>
                  </tr>
                ) : null}

                {id ? (
                  <>
                    <tr>
                      <td class="fw-bolder text-dark text-end customWidthTd">
                        Suspend Access
                      </td>
                      <td class="text-normal fs-6 text-dark ">
                        <label class="form-check form-switch form-check-custom form-check-solid">
                          <input
                            class="form-check-input w-30px h-20px"
                            type="checkbox"
                            onChange={(e) => changePlanStatus(e.target.checked)}
                            value={true}
                            name="notifications"
                            checked={AccountStatus}
                          />
                        </label>
                      </td>
                    </tr>
                    {(membership.status == 1) && (
                      <tr>
                        <td
                          class="fw-bolder text-dark text-end customWidthTd"
                          style={{ "vertical-align": "baseline" }}
                        >
                          {/* Add New Plan */}
                          Subscription
                        </td>
                        <td class="text-normal fs-6 text-primary fw-bolder">
                          <a
                            className="mt-3 d-block"
                            style={{ cursor: "pointer" }}
                            onClick={() => setOpenModal1(true)}
                          >
                            Cancel Plan
                          </a>
                          {/* <a className="d-block"  style={{cursor:"pointer"}} onClick={() => setOpenModal1(true)}>Cancel Plan</a>*/}
                        </td>
                      </tr>
                    )}
                  </>
                ) : (
                  <tr>
                    <td
                      class="fw-bolder text-dark text-end customWidthTd"
                      style={{ "vertical-align": "baseline" }}
                    >
                      {/* Add New Plan */}
                      Subscription
                    </td>
                    <td class="text-normal fs-6 text-primary fw-bolder">
                      <a
                        onClick={() => setOpenModal(true)}
                        style={{ cursor: "pointer" }}
                      >
                        {membership.status === 1 ? 'Change Plan' : 'Reactivate Plan'}
                      </a>
                      {(membership.status === 1) && (
                        <a
                          className="mt-3 d-block"
                          style={{ cursor: "pointer" }}
                          onClick={() => setOpenModal1(true)}
                        >
                          Cancel Plan
                        </a>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {id ? null : (
          <CustModal
            show={OpenModal}
            close={() => setOpenModal(false)}
            header={
              membership.status === 1 ? 'Change Plan' : ['Reactivate Plan',<span className="text-left red-text small ms-3" style={{fontWeight:400}}>
                (Please activate clinicians as per new subscription)                    
                </span>]
            }
          >
            <ChangePlan close={() => setOpenModal(false)} />
          </CustModal>
        )}
      </div>
    </>
  );
}

export default MembershInfo;
