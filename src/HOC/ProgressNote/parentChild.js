import React, { useContext, useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap';
import { postRequest } from '../../Back/pages/CustomHttp';
import Child from './Child';
import { changeFuns } from './Pare';
import { Switch } from '@mui/material';
import $ from "jquery";

export function AutoSelectToggle(data, checkSelectedKeys, editMode) {
    const [changeSwitch, setChangeSwitch] = useState(false);
    const checkedSwitch = (checked) => {
        checkSelectedKeys(data.keys, checked.target.checked);
        setChangeSwitch(checked.target.checked);
    }

    useEffect(() => {
        // console.log(')>', changeSwitch, editMode[data.key]);
        if (editMode[data.key]) {
            setChangeSwitch(true);
        }
    }, [editMode])

    return <div className='d-inline-block'>
        <Switch
            name={data.key}
            checked={changeSwitch}
            onChange={checkedSwitch}
            inputProps={{ 'aria-label': 'controlled' }}
        />
        {data.name}
    </div>
}

function ParentChild({ data, parentName,accordionStatus }) {
    const [CollapseStatus, setCollapseStatus] = React.useState(false);
    const [AddNewNotes, setAddNewNotes] = React.useState([{ name: data.key }]);
    const [addAdditional, setAddAdditional] = useState([]);
    const defaultValRef = React.useRef();
    const Intervention = require('../../Back/pages/client/Interventions.json');
    const newAdditional = require('../../Back/pages/client/AssessmentAddAdditional.json');
    const reportedByAssessment = require('../../Back/pages/client/reportedByAssessment.json');

    // useEffect(() => {
    //   if (accordionStatus !== null) {
    //     setCollapseStatus(false);
    //   }
    // }, [accordionStatus]);

    const { checkedFun, editMode, userId, checkSelectedKeys, CheckForm } = useContext(changeFuns);
    const pName = parentName + "_" + data.key;
    const addNewNewFields = () => {
        let field = {
            name: data.key
        }
        setAddNewNotes([...AddNewNotes, field]);
    }

    const id = parentName + "_" + data.key;
    const radioName = parentName + "_" + 0;

    const CheckRadioComp = (type, id, pname, collpaseStatus = false) => {
        let previousChecked = false;
        const clickFun = (g) => {
            if (g.target.type === 'radio') {
                g.target.checked = !previousChecked;
                checkedFun(g);
                previousChecked = !previousChecked;
            } else {
                checkedFun(g);
            }

            if(collpaseStatus){
                setCollapseStatus(g.target.checked)
            }
        }
        return <input
            className={'form-check-input widget-9-check'}
            type={type}
            id={id}
            onMouseOver={(e) => previousChecked = e.target.checked}
            name={type === "checkbox" ? pname : (data.same_name ? pname + data.same_name : radioName)}
            placeholder={data.placeholder ?? 'Option'}
            onClick={clickFun}
        />
    }

    const notesField = (pname, name) => {
        return (
            name.map((e, i) => {
                return <div className={'my-2 ' + (data.inline ? 'd-inline-block' : '')}>
                    {
                        e.type === 2
                            ? <span>{e.text}</span>
                            : ""
                    }
                    <input type={"text"}
                        onKeyDown={(e) => e.key === "Enter" ? checkedFun(e) : ""}
                        onBlur={(e) => checkedFun(e)}
                        name={pname + "_notes" + (name.length > 1 ? i : "")}
                        ref={data.default_value ? defaultValRef : null}
                        className='d-inline-block form-control form-control-solid'
                        placeholder="Notes"
                        defaultValue={(e.show_text && e.type !== 2) ? e.text : ""} />
                </div>
            })
        )
    }

    const setDefaulValue = async (url) => {
        const getData = await postRequest(url, url === '/latest-PI' ? { client_id: userId } : {userId}, true)
        if (getData) {
            if(url === '/latest-PI'){
                CheckForm.current[id+'_notes'].value  = getData.data.latest_PI ?? null;
            }else{
                defaultValRef.current.value = getData
            }
        }
    }

    const addNewNotes = () => {
        return <div className="form-check form-check-sm form-check-custom form-check-solid d-block mb-2">
            {
                AddNewNotes.map((e, i) => (
                    <>
                        {
                            i > 0
                                ? <hr />
                                : ""
                        }
                        <div className={'m-2 w-100 d-block'}>
                            <div className='my-2'>
                                <span className='d-inline-block'> Goal : </span> <input type={"text"}
                                    onKeyDown={(e) => e.key === "Enter" ? checkedFun(e) : ""}
                                    onBlur={(e) => checkedFun(e)}
                                    name={e.name + "_notes_goal_" + i}
                                    className='form-control form-control-solid d-inline-block w-75 mw-100'
                                    placeholder="Add Custom Goal"
                                    defaultValue={""} />
                            </div>
                            <div className='my-2'>
                                <span className='d-inline-block'> Objective: </span> <input type={"text"}
                                    onBlur={(e) => checkedFun(e)}
                                    onKeyDown={(e) => e.key === "Enter" ? checkedFun(e) : ""}
                                    name={e.name + "_notes_objective_" + i}
                                    className='form-control form-control-solid d-inline-block mw-100 w-75'
                                    placeholder="Add Custom Objective"
                                    defaultValue={""} />
                            </div>
                            <div className="my-2">
                                <Child data={{ "name": "add new", "key": "add-new", "type": "checkbox", "for": "addnew" }} parentName={e.name + "_objective_" + i} currentKey={i} InputKey={i} />
                            </div>
                            <div>
                                {Intervention.map((f, j) => {
                                    return <div className="accordion-collapse collapse show" key={'_' + j + '_'}>
                                        <ul>
                                            <li>
                                                <Child data={f} parentName={e.name + "_goal_" + i} />
                                            </li>
                                        </ul>
                                    </div>
                                })}
                            </div>
                        </div>
                    </>
                ))
            }
            <hr />
            <button type='button' className="btn btn-md btn-primary d-block"
                style={{ borderRadius: "5px", padding: "10px 15px" }}
                onClick={() => AddNewNotes.length < 26 ? addNewNewFields() : ""}>
                Add New
            </button>
        </div>
    }

    const aditional = () => {
        return <button type="button" className='btn btn-primary' onClick={() => setAddAdditional([...addAdditional, addAdditional.length + 1])}>Add Additional</button>
    }

    const forDropDown = () => {
        return <div className="c-pointer form-check form-check-sm d-inline-block form-check-solid">
            {
                data.with_checkbox
                    ? CheckRadioComp(data.type, id+"Checkbox", pName) 
                    : ""
            }
            <label htmlFor={id}>{data.name}</label>
            <select ref={data.default_value ? defaultValRef : null} className='w-100 mb-0 fw-bolder form-select form-select-solid' type="select" name={id} id={id} onChange={(e) => {
                // if($("#"+id+"Checkbox").prop('checked')){
                //     document.getElementById(id+"Checkbox").checked = true;
                // }
                checkedFun(e);
                document.getElementById(id+"Checkbox").checked = true;
                // console.log("Checkbox",$("#"+id+"Checkbox"))
                // setTimeout(() => {
                //     $("#"+id+"Checkbox").attr('checked',true) 
                // }, 6000);
                // $("#"+id+"Checkbox").attr('checked',true)
            }}>
                {
                    data.options.map((e, i) => <option key={i} value={e}>{e}</option>)
                }
            </select>
        </div>
    }

    const inlineNoteField = () => {
        return <div className={`my-2 pr-2 ${data.textArea ? 'w-100' : ''}`}>
            {
                data.with_checkbox
                    ? <div className="form-check form-check-sm form-check-custom form-check-solid d-inline-block">
                        {
                            CheckRadioComp(data.type, id, pName, true) 
                        }                       
                    </div>
                    : ""
            }
            {
                data.start_text
                    ? <span style={{ marginLeft: "10px" }} className='d-inline-block me-2'>{data.start_text}</span>
                    : ""
            }
            {
                data.textArea
                    ? <textarea type="text" name={id + "_notes"} alt={id} className='d-inline-block w-100 form-control form-control-solid' placeholder={`${data.placeholder ?? ''}`} onBlur={(e) => checkedFun(e)}></textarea>
                    : <input type={"text"}
                        onKeyDown={(e) => e.key === "Enter" ? checkedFun(e) : ""}
                        placeholder={`${data.placeholder ?? ''}`}
                        name={
                            id + "_notes"
                        }
                        onBlur={(e) => checkedFun(e)}
                        ref={data.default_value ? defaultValRef : null}
                        className='d-inline-block form-control form-control-solid' />
            }
            {
                data.end_text
                    ? <span>{data.end_text}</span>
                    : ""
            }
        </div>
    }

    // const autoSelectToggle = () => {
    //     return <div className='d-inline-block'>
    //         <Switch
    //             name={data.key}
    //             onChange={(e) => checkSelectedKeys(data.keys, e.target.checked)}
    //             inputProps={{ 'aria-label': 'controlled' }}
    //         />
    //         {data.name}
    //     </div>
    // }

    React.useLayoutEffect(() => {
        if (data.default_value && !editMode) {
            setDefaulValue(data.default_value);
        }
    }, [])
    React.useEffect(() => {
if(data.for == 'inline-notes'){
    // id + "_notes"
    // $(`textarea[name=${id + "_notes"}]`).val("value_to_be_set");




    for (let i in editMode) {
        if (CheckForm.current[i]) {
            if (i.includes('notes')) {
                // console.log('if notes',CheckForm.current[i],editMode[i])
                if( CheckForm.current[i].name == id + "_notes"){
                    CheckForm.current[i].value = editMode[i]
                }
            }
        }
    }
}
    },[])

    return (
        <>
            {
                data.devider
                    ? <hr />
                    : ""
            }
            {
                data.for == 'addNew_notes'
                    ? addNewNotes()
                    : (data.for == 'fetch_differentData'
                        ? ""
                        : data.for == 'dropDown'
                            ? forDropDown()
                            : data.for == "toggle-checked-key"
                                ? AutoSelectToggle(data, checkSelectedKeys, editMode)
                                : <div>
                                    <div className="form-check form-check-sm form-check-custom form-check-solid parentCollapsibleCheckbox">
                                        {data.for == 'inline-notes'
                                            ? inlineNoteField()
                                            : <><input
                                                type={(data.type ?? "checkbox")}
                                                name={data.type === "checkbox" ? pName : (parentName + "_" + data.same_name ?? radioName)}
                                                id={pName}
                                                className={'form-check-input widget-9-check'}
                                                onChange={(e) => { checkedFun(e); setCollapseStatus(e.target.checked) }}
                                            />
                                                <label htmlFor={pName} className="c-pointer align-items-center fs-6 text-dark fw-bold form-label mb-2 customCheckValue fw-bolder">{data.name}{data.key == 'whoWasPresent' && <span style={{color:"red"}}> (Required, please select)</span>}</label>
                                                {data.child?.length > 0 &&
                                                <button type='button' className='btn btn-sm btn-primary text-center' style={{borderRadius: "5px", padding:'2px 2px 2px 7px', marginRight:"10px"}} onClick={() => {
                                                    setCollapseStatus(!CollapseStatus)
                                                }}>
                                                <i class={ CollapseStatus ? "fa fa-angle-up" :"fa fa-angle-down"}></i>
                                                </button>
                                                }
                                            </>}
                                        {
                                            data.parent_with_note
                                                ? <div>
                                                    <input type={"text"}
                                                        onKeyDown={(e) => e.key === "Enter" ? checkedFun(e) : ""}
                                                        onBlur={(e) => checkedFun(e)}
                                                        name={
                                                            pName + "_parentnotes"
                                                        }
                                                        className='d-inline-block form-control form-control-solid'
                                                        placeholder=""
                                                        ref={data.default_value ? defaultValRef : null}
                                                    />
                                                </div>
                                                : ""
                                        }
                                    </div>
                                    {
                                        data.child && data.child.length > 0
                                            ?
                                            <Collapse id={pName + "Collapse"} in={CollapseStatus}>
                                                <div className="px-6 py-4 collapsible">
                                                    {
                                                        data.reported_by_assessment && !(data.reported_by_position < 0)
                                                            ? reportedByAssessment.map((e, i) => <Child data={e} parentName={pName} currentKey={i} InputKey={i} />)
                                                            : ""
                                                    }
                                                    {
                                                        data.child.map((e, i) => (
                                                            <div id={data.name} className="accordion-collapse collapse show">
                                                                <ul>
                                                                    {
                                                                        e.map((f, j) => <Child key={j} data={f} parentName={pName} currentKey={i} InputKey={i} />)
                                                                    }
                                                                </ul>
                                                            </div>
                                                        ))
                                                    }
                                                    {

                                                        data.intervention
                                                            ? Intervention.map((f, j) => {
                                                                return <li>
                                                                    <Child data={f} parentName={pName} />
                                                                </li>
                                                            })
                                                            : ""
                                                    }
                                                    {
                                                        data.reported_by_assessment && data.reported_by_position < 0
                                                            ? reportedByAssessment.map((e, i) => <Child data={e} parentName={pName} currentKey={i} InputKey={i} />)
                                                            : ""
                                                    }
                                                    {
                                                        data.notes !== undefined
                                                            ? notesField(pName, data.notesText)
                                                            : ""
                                                    }
                                                    {
                                                        addAdditional.map((e, i) => {
                                                            return <><hr /><div> {
                                                                data.additional_with_reportedBy
                                                                    ? reportedByAssessment.map((l, m) => <Child data={l} parentName={pName + "_" + (i + 1)} currentKey={i} InputKey={i} />)
                                                                    : ""
                                                            } {
                                                                    newAdditional.filter((l) => l.for == data.additional_id)[0].child.map((f, j) => {
                                                                        return <div>
                                                                            {f.map((h, k) => <Child data={h} parentName={pName + "_" + (i + 1)} currentKey={i} InputKey={i} />)}
                                                                        </div>
                                                                    })
                                                                }
                                                            </div></>
                                                        })
                                                    }
                                                    {
                                                        data.additional
                                                            ? aditional()
                                                            : ""
                                                    }
                                                    { }
                                                </div>
                                            </Collapse>
                                            : null
                                    }
                                </div>
                    )
            }
            {
                data.inline_child
                    ? <div className='d-inline-block mx-2'>
                        {data.inline_child.map((e, i) => <ParentChild data={e} parentName={parentName} currentKey={i} InputKey={i} />)}
                    </div>
                    : ""
            }
        </>
    )
}
export default ParentChild