import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { postRequest } from '../CustomHttp';
import { UserInformation } from '../other/userProfile/MyProfile';

export default function ViewActivityLog({close}) {
    const { userDetail } = useContext(UserInformation);
    const [ActivityLog, setActivityLog] = useState([]);

    const getLog = async () => {
        const URL = '/activity';
        const Params = {id: userDetail.id};
        const postData = await postRequest(URL, Params, true);
        if(postData){
            if(postData.status){
                setActivityLog(postData.data);
            }else{
                setActivityLog([]);
            }
        }

    }
    useEffect(() => {
        getLog();
        return () => {
            //cleanup
        }
    }, [])
    return (        
        <form className="form" action="#" id="kt_modal_add_customer_form" data-kt-redirect="list.html">                                                           
            <div className="scroll-y me-n7 pe-7" id="kt_modal_add_customer_scroll" data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto" data-kt-scroll-dependencies="#kt_modal_add_customer_header" data-kt-scroll-wrappers="#kt_modal_add_customer_scroll" data-kt-scroll-offset="300px">
                <div className="table-responsive">
                {/*begin::Table*/}
                <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
                    {/*begin::Table body*/}
                    <thead>
                    {/*begin::Table row*/}
                    <tr className="fw-bolder text-muted">
                        <th className="min-w-150px text-dark fw-bolder text-center">Last Login</th>
                        <th className="min-w-150px text-dark fw-bolder text-center">IP Address</th>
                        <th className="min-w-100px text-dark fw-bolder text-left">Web Browser</th>
                    </tr>
                    {/*end::Table row*/}
                    </thead>
                    <tbody>
                        {
                            ActivityLog.length > 0 
                            ? ActivityLog.map((e, i) => {
                                return <tr key={i+'_'}>
                                            <td className="text-dark text-end customWidthTd">
                                            { e.last_login }
                                            </td>
                                            <td className="text-normal fs-6 text-dark text-center ">
                                            { e.ip }
                                            </td>
                                            <td>{ e.web_browser }</td>
                                        </tr>
                            })
                            : 'No Activity Log Available'
                        }                            
                    </tbody>
                    {/*end::Table body*/}
                </table>
                {/*end::Table*/}
                </div>
            </div>                    
            <div className="modal-footer flex-center">
            <button type="button" id="kt_modal_add_customer_submit" className="btn btn-primary" onClick={close}>
                <span className="indicator-label">Ok</span>                        
            </button>                    
            </div>
        </form>                               
    )
}
