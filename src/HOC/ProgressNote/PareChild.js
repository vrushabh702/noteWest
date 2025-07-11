import React, { useContext, useState,useEffect } from 'react'
import { Collapse } from 'react-bootstrap';
import { changeFuns } from './Pare';
import ParentChild from './parentChild';

function PareChild({data,accordionStatus}) {        
    const {commonData, changeCommonData} = useContext(changeFuns)
    const [CollapseStatus, setCollapseStatus] = useState(accordionStatus ? accordionStatus : false);    
    const renderUI = (ArrayData) => {
        // console.log("ArrayData",ArrayData.sort(function(a, b){
        //     if(a.name < b.name) { return -1; }
        //     if(a.name > b.name) { return 1; }
        //     return 0;
        // }))
        return ArrayData.map((f, j) => {
            return <div className="accordion-collapse collapse show" key={'_' + j + '_'}>
                <ul>
                    <li>
                        <ParentChild accordionStatus={accordionStatus} data={f} parentName={data.key} />
                    </li>
                </ul>
            </div>
        })
    }
    useEffect(()=>{
        if(accordionStatus === true){
            setCollapseStatus(accordionStatus)
        } else if (accordionStatus !== null){
            setCollapseStatus(accordionStatus)
        }
    },[accordionStatus])
    return (
        <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button" type="button" onClick={() => commonData.count === 1 ? setCollapseStatus((prevState) => !prevState) : changeCommonData()}>
                    <ul className="label">
                        <li><label className="form-label fw-bolder text-dark fs-6 ">{data.name}:</label></li>
                    </ul>
                </button>
            </h2>
            <Collapse id={data.key + "Collapse"} in={CollapseStatus}>
                <div className="px-6 py-4 collapsible">                    
                        {
                           renderUI(data.child)
                        }                                                         
                </div>
            </Collapse>
        </div>
    )
}

export default PareChild