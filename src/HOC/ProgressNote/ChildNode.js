import React, { useState, useEffect } from 'react';
import { Collapse } from 'react-bootstrap';

function ChildNode({ data, cStatus, checkFun }) {
    const [CollapseStatus, setCollapseStatus] = useState(false);
    const [CheckedStatus, setCheckedStatus] = useState(cStatus ?? false);
    const [ParentCheckedStatus, setParentCheckedStatus] = useState(false);    
    const parentChecked = (e) => {        
        if (data.children.length > 0) {
            setParentCheckedStatus(e);
        } else {
            setCheckedStatus(e);
        }
    }   
    
    useEffect(() => {
        if (cStatus === false) {
            setCheckedStatus(cStatus);
        }
        return () => {
            setCheckedStatus(false);
            setParentCheckedStatus(false);
        };
    }, [cStatus]);

    return <>
        <span>
            <div className="form-check form-check-sm form-check-custom d-inline form-check-solid">
                <input
                    className={data.option_type === 'text' ? 'form-control form-control-solid' : 'form-check-input widget-9-check'}
                    type={data.option_type}
                    placeholder='Notes'
                    onChange={(e) => { setCollapseStatus(e.target.checked); parentChecked(e.target.checked); checkFun(e); }}
                    defaultValue={data.option_type === 'text' ? '' : data.name}
                    checked={data.children.length > 0 ? ParentCheckedStatus : CheckedStatus}
                />
                {
                    data.option_type === 'text'
                        ? null
                        : <label className="align-items-center fs-6 text-dark fw-bold form-label mb-2 customCheckValue">{data.name}</label>
                }
            </div>
            {
                data.children.length > 0
                    ? <Collapse in={CollapseStatus}>
                        <div className='ml-4'>{
                            data.children.map((e, i) => <ChildNode data={e} cStatus={ParentCheckedStatus} key={i} checkFun={checkFun()} />)
                        }
                        </div>
                    </Collapse>
                    : <></>
            }
        </span>
    </>;
}

export default ChildNode;
