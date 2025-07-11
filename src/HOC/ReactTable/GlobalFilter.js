import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useAsyncDebounce } from 'react-table';
import Export from './Export';
import Filter from './Filter';
import Loader from 'react-loader-spinner';

function GlobalFilter({ filter, setFilter, tableName, tableLink,loader,tableClinicianId }) {    
    const [Value, setValue] = useState(filter);
    const onChangeHandler = useAsyncDebounce(value => { setFilter(value) }, 250);    
    return (
        <>        
            <div className="card-header border-0 pt-6">
                <div className="card-title">
                    <div className='d-flex align-items-center position-relative my-1'>
                        <span className="svg-icon svg-icon-1 position-absolute ms-6">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                            <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height={2} rx={1} transform="rotate(45 17.0365 15.1223)" fill="black" />
                            <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="black" />
                            </svg>
                        </span> 
                        <input type="text" className='form-control form-control-solid w-250px ps-15' placeholder='Search...' value={Value} onChange={(e) => { setValue(e.target.value); onChangeHandler(e.target.value); }} />
                        {loader && <Loader
                            type="ThreeDots"
                            color="#017EAD"
                            height={25}
                            width={25}
                            timeout={300000} />}
                    </div>
                </div>
                <div className="card-toolbar">                    
                    <div className="d-flex justify-content-end" data-kt-customer-table-toolbar="base">                    
                       <Filter />               
                       {/* <Export />                      */}
                        <Link to={ tableLink } state={tableClinicianId ? {clinician_id:tableClinicianId} : null}>
                            <button type="button" className="btn btn-primary">
                                { tableName }
                            </button>
                        </Link>                    
                    </div>                                        
                    <div className="d-flex justify-content-end align-items-center d-none" data-kt-customer-table-toolbar="selected">
                        <div className="fw-bolder me-5">
                            <span className="me-2" data-kt-customer-table-select="selected_count" />
                            Selected
                        </div>
                        <button type="button" className="btn btn-danger" data-kt-customer-table-select="delete_selected">
                            Delete Selected
                        </button>
                    </div>                        
                </div>                    
            </div> 
        </>
    )
}

export default GlobalFilter
