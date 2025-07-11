import React, { useState } from 'react';
import { useRef } from 'react';
import { Collapse } from 'react-bootstrap';
import ChildNode from './ChildNode';

function ParentNode({ data }) {
    const [CollapseStatus, setCollapseStatus] = useState(false);   
    const CheckedForm = useRef();
    const checkedFunction = (e) => {
        let data = [];
        Array.from(CheckedForm.current).map((e) => {            
            data = [...data, {[e.value]: e.checked}];
        });       
    }
    
    return <>
        <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button" type="button" onClick={() => setCollapseStatus(!CollapseStatus)}>
                    <ul className="label">
                        <li><label className="form-label fw-bolder text-dark fs-6 ">{data.name}:</label></li>
                    </ul>
                </button>
            </h2>
            {
                data.children.length > 0
                    ?
                    <Collapse in={CollapseStatus}>
                        <form action="" ref={CheckedForm}>
                        <div className="px-6 py-4">
                            {
                                data.children.map((e, i) => (
                                    <div id={data.name + '_' + data.children.length} className="accordion-collapse collapse show">
                                        <ul>
                                            <ChildNode key={i} data={e} checkFun={(e) => checkedFunction(e)} />
                                        </ul>
                                    </div>
                                ))
                            }
                        </div>
                        </form>
                    </Collapse>
                    : null
            }
        </div>
    </>;
}

export default ParentNode;