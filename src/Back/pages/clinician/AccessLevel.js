import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const renderTooltip = (props) => (
  <Tooltip id="button-tooltip">
    {props}
  </Tooltip>
);

function AccessLevel({onChangeHandler, checkedValue}) {    

    const accessLevelInfo = {
      practice_admin: "The Practice Administrator has access to everything in the platform and can manage clinicians/supervisors, assign supervisors to clinicians, see all of the documentation by every provider, and manage payments. They can write and keep their own documentation as well. This is the default for individual packages.",
      supervisor: "The Supervisor has access to their own documentation and the documentation of any assigned clinician as well as the ability to review/sign off on clinician documentation.",
      clinician: "The Clinician can access and manage their own notes. Clinicians can sign off on their notes with or without an assigned supervisor reviewing them first. Supervisors can be assigned/changed on the Clinician’s profile page after they are in the system.",
      signature: "This is how the clinicians signature will appear on their signed documentation. This can be updated at any time and is in real time.",
    }
    return (
        <div className="card-body py-3 customUl">
        <ul className="label">
          <li>
            <label className="form-label fw-bolder text-dark fs-6">
              Practice Administration
            </label>
          </li>
        </ul>
        <ul className="mb-5">
          <li>
            <div className="form-check form-check-sm form-check-custom form-check-solid">
              <input className="form-check-input widget-9-check" name="clinical_access" id='practice_administrator' type="radio" defaultValue={'practice_administrator'} onChange={(e) => onChangeHandler(e.target.value)} checked={checkedValue == 'practice_administrator' ? true  : checkedValue == '' ? true : false } />
              <label className="align-items-center fs-6 text-dark fw-bold form-label mb-2 customCheckValue" htmlFor='practice_administrator'>
                Practice Administrator
              </label>
              <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderTooltip(accessLevelInfo.practice_admin)} >                    
                  <i class="fa fa-info-circle" style={{ marginLeft: "10px", color: "#017EAD", fontSize: "20px" }} aria-hidden="true"></i>
              </OverlayTrigger>  
            </div>
          </li>
        </ul>
        <ul className="label">
          <li>
            <label className="form-label fw-bolder text-dark fs-6 ">
              Clinical Access
            </label>            
          </li>
        </ul>
        <ul className="mb-5">
          <li>
            <div className="form-check form-check-sm form-check-custom form-check-solid">
              <input  className="form-check-input widget-9-check"  type="radio"  defaultValue={'clinician'} id='clinician' name="clinical_access"  onChange={(e) => onChangeHandler(e.target.value)} checked={checkedValue == 'clinician' ? true : false} />
              <label className="align-items-center fs-6 text-dark fw-bold form-label mb-2 customCheckValue" htmlFor='clinician'>
                Clinician
              </label>
              <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderTooltip(accessLevelInfo.clinician)} >                    
                  <i class="fa fa-info-circle" style={{ marginLeft: "10px", color: "#017EAD", fontSize: "20px" }} aria-hidden="true"></i>
              </OverlayTrigger>  
            </div>
          </li>
          <li>
            <div className="form-check form-check-sm form-check-custom form-check-solid">
              <input  className="form-check-input widget-9-check"  type="radio"  defaultValue={'supervisor'} name="clinical_access" id='supervisor' onChange={(e) => onChangeHandler(e.target.value)} checked={checkedValue == 'supervisor' ? true : false}  />
              <label className="align-items-center fs-6 text-dark fw-bold form-label mb-2 customCheckValue" htmlFor='supervisor'>
                Supervisor
              </label>
              <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderTooltip(accessLevelInfo.supervisor)} >  
                  <i class="fa fa-info-circle" style={{ marginLeft: "10px", color: "#017EAD", fontSize: "20px" }} aria-hidden="true"></i>
              </OverlayTrigger>  
            </div>
          </li>
          {/* <li>
            <div className="form-check form-check-sm form-check-custom form-check-solid">
              <input  className="form-check-input widget-9-check"  type="radio"  defaultValue={'clinical_administrator'} name="clinical_access" id='clinical_administrator'  onChange={(e) => onChangeHandler(e.target.value)} checked={checkedValue == 'clinical_administrator' ? true : false} />
              <label className="align-items-center fs-6 text-dark fw-bold form-label mb-2 customCheckValue" htmlFor='clinical_administrator'>
                Clinical Administrator
              </label>
            </div>
          </li> */}
        </ul>
      </div>  
    )
}

export default AccessLevel
