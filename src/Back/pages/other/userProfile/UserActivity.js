import React from 'react'
import { useState } from 'react';
import CustModal from '../../../../HOC/CustModal'
import ChangePassword from '../../modal/ChangePassword';
import ViewActivityLog from '../../modal/ViewActivityLog';
import moment from 'moment';

function UserActivity({lastLogin}) {
    const [ShowActivityLog, setShowActivityLog] = useState(false);
    const [ShowChangePassword, setShowChangePassword] = useState(false);
    
    return (
        <div className="card card-xxl-stretch mb-5 mb-xl-8">
            <div className="card-header border-0 pt-5">
                <h3 className="card-title align-items-start flex-column">
                    <span className="card-label fw-bolder fs-3 mb-1">Security &amp; Activity</span>
                </h3>
            </div>
            <div className="card-body p-9 pt-0">
                <div className="table-responsive">
                    <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
                        <tbody>
                            <tr>
                                <td className="fw-bolder text-dark text-end customWidthTd">
                                    Last Login:
                                </td>
                                <td className="text-normal fs-6 text-dark ">
                                    { moment(lastLogin.last_login).format('DD/MM/Y h:mm:ss') }
                                </td>
                            </tr>
                            <tr>
                                <td className="fw-bolder text-dark text-end customWidthTd">
                                    IP Address:
                                </td>
                                <td className="text-normal fs-6 text-dark ">
                                    { lastLogin.ip }
                                </td>
                            </tr>
                            <tr>
                                <td className="fw-bolder text-dark text-end customWidthTd">
                                    Web Browser:
                                </td>
                                <td className="text-normal fs-6 text-dark ">
                                    { lastLogin.web_browser }
                                </td>
                            </tr>
                            <tr>
                                <td className="fw-bolder text-dark text-end customWidthTd">
                                User Activity:
                                </td>
                                <td className="text-normal fs-6 text-dark ">
                                <span class="text-primary c-pointer" onClick={() => setShowActivityLog(true)}>View Activity Log</span>
                                </td>
                            </tr>
                            <tr>
                                <td className="fw-bolder text-dark text-end customWidthTd">
                                Password:
                                </td>
                                <td className="text-normal fs-6 text-dark ">
                                <span class="text-primary c-pointer" onClick={() => setShowChangePassword(true)}>Change Password</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/**/}
            <CustModal show={ShowActivityLog} close={() => setShowActivityLog(false)} header="View Log">
                <ViewActivityLog close={() => setShowActivityLog(false)} /> 
            </CustModal>

            <CustModal show={ShowChangePassword} close={() => setShowChangePassword(false)} size="md" header="Change Password">
                <ChangePassword close={() => setShowChangePassword(false)} />
            </CustModal>
        </div>
    )
}

export default UserActivity
