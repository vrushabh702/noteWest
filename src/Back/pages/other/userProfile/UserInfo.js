import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import CustModal from "../../../../HOC/CustModal";
import { editClinician } from "../../../../Routes/RouterPage";
import EditUserDetail from "./EditUserDetail";
import { UserInformation } from "./MyProfile";

function UserInfo() {
  const { userDetail, id } = useContext(UserInformation);
  const {
    first_name,
    last_name,
    full_name = first_name + " " + last_name,
    company_name,
    email,
    phone_number,
    phy_address,
    phy_city_name,
    phy_state_name,
    phy_zipcode,    
    role,
    practice_name,
    signature
  } = userDetail;
  
  const [ShowModal, setShowModal] = useState(false);
  const [ShowAlert, setShowAlert] = useState(false);
  const [AlertMessage, setAlertMessage] = useState({});

  return (
    <>
      <div
        className={
          "col-lg-8 col-xxl-8 customUl"
        }
      >
        <div className="card h-100">
          <div className="card-header border-0 pt-5">
            <h3 className="card-title align-items-start flex-column">
              <span className="card-label fw-bolder fs-3 mb-1">
                Personal Information
              </span>
            </h3>
            {
              id 
              ? ((role == "clinician" || role == "supervisor"|| role == "account") ? <div><Link to={editClinician.link+'/'+userDetail.id} className='pointer'>
                <button type="button" class="btn btn-primary">Edit Clinician</button>
                </Link></div> : "")
              : <div className="toprightEdit">
                  <span onClick={() => setShowModal(true)} className="c-pointer">
                    <i className="fas fa-pencil-alt px-3 py-3"></i>
                  </span>
                </div>              
            }                        
          </div>
          <div className="card-body p-9 pt-0">
            <div className="table-responsive">
              <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
                <tbody>
                  <tr>
                    <td className="fw-bolder text-dark text-end customWidthTd">
                      Full Name
                    </td>
                    <td className="text-normal fs-6 text-dark ">
                      {full_name ?? ""}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bolder text-dark text-end customWidthTd">
                      Email
                    </td>
                    <td className="text-normal fs-6 text-dark ">
                      {email ?? ""}
                    </td>
                  </tr>
                  {role == "admin" ? null : (
                    <>
                    {
                      role == 'account'
                      ? <tr>
                          <td className="fw-bolder text-dark text-end customWidthTd">
                            Practice Name
                          </td>
                          <td className="text-normal fs-6 text-dark ">
                            {practice_name ?? ""}
                          </td>
                        </tr>
                      : null
                    }                      
                      <tr>
                        <td className="fw-bolder text-dark text-end customWidthTd">
                          Phone Number
                        </td>
                        <td className="text-normal fs-6 text-dark ">
                          {phone_number ?? ""}
                        </td>
                      </tr>
                      <tr>
                        <td className="fw-bolder text-dark text-end customWidthTd">
                          Signature
                        </td>
                        <td className="text-normal fs-6 text-dark ">
                          {signature ?? ""}
                        </td>
                      </tr>
                      <tr>
                        <td className="fw-bolder text-dark text-end customWidthTd">
                          Physical Address
                        </td>
                        <td className="text-normal fs-6 text-dark ">
                          {phy_address ?? ""}
                        </td>
                      </tr>
                      <tr>
                        <td className="fw-bolder text-dark text-end customWidthTd">
                          City
                        </td>
                        <td className="text-normal fs-6 text-dark ">
                          {phy_city_name ?? ""}
                        </td>
                      </tr>
                      <tr>
                        <td className="fw-bolder text-dark text-end customWidthTd">
                          State
                        </td>
                        <td className="text-normal fs-6 text-dark ">
                          {phy_state_name ?? ""}
                        </td>
                      </tr>
                      <tr>
                        <td className="fw-bolder text-dark text-end customWidthTd">
                          Zip Code
                        </td>
                        <td className="text-normal fs-6 text-dark ">
                          {phy_zipcode ?? ""}
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {
        id 
        ? null
        :  <CustModal
              show={ShowModal}
              close={() => setShowModal(false)}
              size="lg"
              header="Edit Details"
              showAlert={ShowAlert}
              alertMessage={AlertMessage}
              closeAlert={() => setShowAlert(false)}
            >
              <EditUserDetail
                close={() => setShowModal(false)}
                errorMessage={{
                  showAlert: setShowAlert,
                  alertMessage: setAlertMessage,
                }}
              />
            </CustModal>        
      }           
    </>
  );
}

export default UserInfo;
