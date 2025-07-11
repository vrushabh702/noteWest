import React, { useContext, useEffect, useRef, useState } from 'react'
import { Collapse } from 'react-bootstrap';
import AddNewComp from './AddNewComp';
import { changeFuns } from './Pare';
import $ from "jquery";
import Loader from 'react-loader-spinner';

function Child({ data, parentName, currentKey, InputKey }) {
    const [addNewValue, setAddNewValue] = useState("");
    const [openMAE, setOpenMAE] = useState(false);
    const [openAdditionalCollapse, setOpenAdditionalCollapse] = useState(false);
    const [addAdditional, setAddAdditional] = useState([]);

    const newAdditional = require('../../Back/pages/client/AssessmentAddAdditional.json');
    const substanceUseAbuse_with_addnew = require('../../Back/pages/client/substanceUseAbuse_with_addnew.json');

    const measurementAndEvidenced = require('../../Back/pages/client/measurementAndEvidenced.json');
    const reportedByAssessment = require('../../Back/pages/client/reportedByAssessment.json');

    const { checkedFun, checkSelectedKeys, tmpAllAddNewData, selectAllData,setCheckboxLoader } = useContext(changeFuns);
    const [addNew, setaddNew] = useState([]);
    const radioName = parentName + "_" + currentKey;

    const addNewItem = (name) => {
        let value = addNewValue;
        if (value.trim() === '') return false;
        const id = name + "_" + (value.split(' ').join('_'));
        const newElement = { name: name, type: data.type, id, value, addNewChild: data.addnew_child };
        setAddNewValue("");
        // console.log("value",id)
        // console.log("[...addNew, newElement]",[...addNew, newElement])
        setaddNew([...addNew, newElement]);
        setTimeout(() => {
            checkedFun({ target: { id: id, name: (data.type === "radio" ? (name + "_" + data.same_name ?? radioName) : (name + value + (addNew.length))), checked: true } }, true)
            // checkedFun({ target: { id: JSON.stringify({ name: value, checked: true, index: InputKey }), name: (data.type === "radio" ? (name + "_" + data.same_name ?? radioName) : (name + value + (addNew.length))), checked: true } }, true)
        }, 100);
    }

    const pName = parentName + '_' + (data.type === 'checkbox' ? data.key : '');
    // For selecting "Select All" checkbox dynamically  
    useEffect( ()=>{
        const SelectAllpName = parentName + '_' + (data.type === 'checkbox' ? data.key : data.type === "radio" ? data.key : '');
        const selectAll = selectAllData[SelectAllpName]
        // if(data.type === "radio"){
        //     console.log(parentName,SelectAllpName,selectAll,data)
        // }
        // console.log(SelectAllpName);
        // console.log(selectAllData);
        // console.log(parentName)
        // console.log(data.type,data.key)
        if(selectAllData[parentName]){
            $(`input:checkbox[name=${parentName}]`).prop('checked',true);
        }
        if(selectAll){
            $(`input:checkbox[name=${SelectAllpName}]`).prop('checked',true);
            $(`input:radio[id=${SelectAllpName}]`).prop('checked',true);

            // console.log("selectAllData",selectAllData[pName]);
        }
        
    },[selectAllData,parentName])

    const name = data.name;
    const id = parentName + "_" + data.key;

    const notesField = (pname, name) => {
        return (
            name.map((e, i) => {
                return <div className={'my-2 ' + (data.inline ? 'd-inline-block' : '')}>
                    {
                        e.type === 2 && e.align_text_start
                            ? <span>{e.text}</span>
                            : ""
                    }
                    <input type={"text"}
                        onBlur={(e) => checkedFun(e)}
                        onKeyDown={(e) => e.key === "Enter" ? checkedFun(e) : ""}
                        name={
                            pname + (e.prefix_name ?? "") + (data.type === "checkbox" ? "_notes" : "notes" + (name.length > 1 ? i : ""))
                        }
                        className='d-inline-block form-control form-control-solid'
                        placeholder=""
                        defaultValue={(e.show_text && e.type !== 2) ? e.text : ""} />
                        {(e.type === 2 && !e.align_text_start && e.end_text) ? <span className='end_text me-2 d-inline-block'>{e.end_text}</span>
                            : ""}
                    {
                        e.type === 2 && !e.align_text_start
                            ? <span>{e.text}</span>
                            : ""
                    }
                    {
                        (e.type === 2 && e.align_text_start && e.end_text)
                            ? <span className='end_text mx-2 d-inline-block'>{e.end_text} g</span>
                            : ""
                    }
                </div>

            })
        )
    }

    /* 25-09-22 : 
        we just need an reference of current element for figure out its previous value, 
        we take an let variable and onMouseOver event just store current checked value in it, 
        so on click event we easily figure out current checked value for radio button.
    */
    const CheckRadioComp = (type, id, pname, name, showText = true) => {
        let previousChecked = false;
        const clickFun = (g) => {
            if (g.target.type === 'radio') {
                g.target.checked = !previousChecked;
                checkedFun(g);
                previousChecked = !previousChecked;

                // console.log("g.target",g.target.checked)
            } else {

                checkedFun(g);
                // console.log('Hii1')
            }
            if (data.collapse) {
                // console.log('Hii2')
                setOpenAdditionalCollapse(g.target.checked);
            }
            setOpenMAE(g.target.checked);
            // console.log(pname,pname + data.same_name,data.same_name)
        }
        return <div className={`c-pointer form-check form-check-sm form-check-custom form-check-solid d-block me-2`}>
            <input
                className={'form-check-input widget-9-check'}
                type={type}
                id={id}
                onMouseOver={(e) => previousChecked = e.target.checked}
                name={type === "checkbox" ? pname : (data.same_name ? pname + data.same_name : radioName)}
                placeholder={data.placeholder ?? 'Option'}
                onClick={clickFun}
            />
            {
                showText ? <label htmlFor={id} className="align-items-center fs-6 text-dark fw-bold form-label mb-2 customCheckValue">{name}</label> : ""
            }
            {data.child && data.child.length > 0 && <>
                <button type='button' className='btn btn-sm btn-primary text-center' id={`${id}CollapseBtn`} style={{borderRadius: "5px", padding:'2px 2px 2px 7px', marginRight:"10px"}} onClick={() => {
                // setOpenAdditionalCollapse(!openAdditionalCollapse)
                const ids = id+'Collapse';
                const btnIds = id+'CollapseBtn';
                // console.log(btnIds,$(`.${btnIds} .fa`).hasClass( "fa-angle-up" ))
                if($(`#${btnIds} .fa`).hasClass( "fa-angle-up" )){
                    $(`#${btnIds} .fa`).removeClass("fa-angle-up");
                    $(`#${btnIds} .fa`).addClass("fa-angle-down");
                } else {
                    $(`#${btnIds} .fa`).addClass("fa-angle-up");
                    $(`#${btnIds} .fa`).removeClass("fa-angle-down");
                }
                if($(`.${ids}`).hasClass( "show" )){
                    $(`.${ids}`).removeClass("show");
                    
                } else {
                    $(`.${ids}`).addClass("show");
                }
            }}><i class={$(`.${id+'Collapse'}`).hasClass( "show" ) ? "fa fa-angle-up" :"fa fa-angle-down"}></i></button>
            </>}
            {data.measurementAndEvidenced && <>
                <button type='button' className='btn btn-sm btn-primary text-center' id={`${parentName}CollapseBtn`} style={{borderRadius: "5px", padding:'2px 2px 2px 7px', marginRight:"10px"}} onClick={() => {
                // setOpenAdditionalCollapse(!openAdditionalCollapse)
                const ids = parentName+'Collapse';
                const btnIds = parentName+'CollapseBtn';
                // console.log(btnIds,$(`.${btnIds} .fa`).hasClass( "fa-angle-up" ))
                if($(`#${btnIds} .fa`).hasClass( "fa-angle-up" )){
                    $(`#${btnIds} .fa`).removeClass("fa-angle-up");
                    $(`#${btnIds} .fa`).addClass("fa-angle-down");
                } else {
                    $(`#${btnIds} .fa`).addClass("fa-angle-up");
                    $(`#${btnIds} .fa`).removeClass("fa-angle-down");
                }
                if($(`.${ids}`).hasClass( "show" )){
                    $(`.${ids}`).removeClass("show");
                    
                } else {
                    $(`.${ids}`).addClass("show");
                }
            }}><i class={$(`.${parentName+'Collapse'}`).hasClass( "show" ) ? "fa fa-angle-up" :"fa fa-angle-down"}></i></button>
            </>}
            {
                name == 'Interventions' ?
                    <>
                        {/* <input
                            className={'form-check-input widget-9-check'}
                            type={type}
                            id={id + "_all"}
                            onMouseOver={(e) => previousChecked = e.target.checked}
                            name={type === "checkbox" ? pname : (data.same_name ? pname + data.same_name : radioName)}
                            placeholder={data.placeholder ?? 'Option'}
                            onClick={() => {
                                setCheckboxLoader(true)
                                setTimeout(() => checkAllChild(data, id),30)
                            }}
                        />
                        <label htmlFor={id + "_all"} className="align-items-center fs-6 text-dark fw-bold form-label mb-2 customCheckValue">Select All</label> */}
                    </>
                    : ""
            }
        </div>
    }

    function checkAllChild(data, id) {
        setTimeout(() =>{
            setCheckboxLoader(false)
        },2000)
        let selectAllStatus = $("#" + id + "_all").prop('checked')
        let childList = data.child[0]
        for (let i = 0; i < childList.length; i++) {
            const element = id + "_" + childList[i].key;
            const isChecked = $("#" + element).prop('checked', selectAllStatus);
            if (isChecked && isChecked[0]) {
                checkedFun({ target: isChecked[0] })
            }
        }
            const isChecked = $("#" + id).prop('checked', selectAllStatus);
            if (isChecked && isChecked[0]) {
                checkedFun({ target: isChecked[0] })
            }

        // CheckRadioComp(type, id, pname, name)
    }


    const createAddNewField = (name, id, type, value, count, addNewChild = [], defaultCheck, editModeName) => {
        return (
            <li className={'d-inline-block'}>
                <AddNewComp InputKey={InputKey}
                    data={data}
                    name={editModeName ?? (type === "radio" ? name : name + value + count)}
                    parentName={parentName}
                    type={type}
                    value={value}
                    checkedFun={checkedFun}
                    setOpenMAE={setOpenMAE}
                    i={count}
                    radioName={radioName}
                    defaultCheck={defaultCheck ?? true} />
                {
                    addNewChild
                        ? addNewChild.map((e, i) => <ul><li> {e.map((f, j) => <Child data={f} parentName={parentName + "_" + value} currentKey={j} InputKey={j} />)}</li></ul>)
                        : ""
                }
                {
                    data.measurementAndEvidenced
                        ? measurementAndEvidencedFun(value)
                        : ""
                }
                {
                    data.substanceUseAbuse_with_addnew
                        ? substanceUseAbuse_with_addnew.map((e, i) => <ul><li>{e.map((f, j) => <Child data={f} parentName={parentName + "_" + value} currentKey={i} InputKey={j} />)} </li></ul>)
                        : ""
                }
            </li>
        )
    }

    const checkradioField = (pname, id, name, type) => {
        return (
            <>
                {
                    CheckRadioComp(type, id, pname, name)
                }
                {
                    data.measurementAndEvidenced
                        ? measurementAndEvidencedFun()
                        : ""
                }
            </>
        )
    }

    const addnewField = (name) => {

        return (
            <>
                {
                    addNew
                        ? addNew.map((e, i) => createAddNewField(e.name, e.id, e.type, e.value, i, e.addNewChild, e.checked, e.editModeName))
                        : ""
                }
                <div className="d-inline-block form-check form-check-sm form-check-custom d-inline form-check-solid">
                    <div className="position-relative">
                        <input
                            type="text"
                            className='form-control form-control-solid'
                            name={name}
                            onChange={(e) => setAddNewValue(e.target.value)}
                            value={addNewValue}
                            placeholder="Add New"
                            style={{ maxWidth: "150px" }}
                        />
                        <button type='button' className="position-absolute btn btn-sm btn-primary"
                            style={{ right: "2px", top: "2px", borderRadius: "5px", padding: "5px 10px" }}
                            onClick={() => addNewItem(name)}>
                            <b className='h4 text-white'>+</b>
                        </button>
                    </div>
                </div>
            </>
        )
    }

    const measurementAndEvidencedFun = (addNew = false) => {
        return measurementAndEvidenced.map((e, i) => (
            <Collapse id={parentName + "Collapse"} in={openMAE}>
                <div className={`ml-4 ${parentName + "Collapse"}`}>
                    {
                        e.map((f, j) => <Child data={f} parentName={addNew ? parentName + "_" + addNew : id} currentKey={i} InputKey={i} />)
                    }
                </div>
            </Collapse>
        ))
    }

    const radioGroup = () => {
        return (
            <div className="d-inline-block form-check form-check-sm form-check-custom d-inline form-check-solid">
                <label className="align-items-center fs-6 fw-bold form-label mb-2 customCheckValue">{name}</label>
            </div>
        )
    }

    const inlineNoteField = () => {
        return <div className={'my-2 mx-2 pr-2'}>
            {
                data.with_checkbox
                    ? CheckRadioComp(data.type, id, pName, data.type === "checkbox" ? pName : (pName + "_" + data.same_name ?? radioName), false)
                    : ""
            }
            {
                data.start_text
                    ? <span className='d-inline-block me-2'>{data.start_text}</span>
                    : ""
            }
            <input type={"text"}
                onBlur={(e) => checkedFun(e)}
                onKeyDown={(e) => e.key === "Enter" ? checkedFun(e) : ""}
                name={
                    id + "_notes"
                }
                placeholder={data.placeholder ?? ''}
                className='d-inline-block form-control form-control-solid'
                defaultValue={""} />
            {
                data.end_text
                    ? <span className='end_text'>{data.end_text}</span>
                    : ""
            }
        </div>
    }


    const aditional = () => {
        return <button type="button" className='btn btn-primary' onClick={() => setAddAdditional([...addAdditional, addAdditional.length + 1])}>Add Additional</button>
    }

    const isCollapse = (e, i) => {
        // if (data.collapse) {
        // console.log(pName);
        // console.log($("#" + pName).length);
        let selectAllStatus = $("#" + pName).prop('checked');
        if(pName + data.same_name== 'emotional_reducedDepression_improvedMood_measurementTools_measurementTools_repeat&repeatation'){
        // console.log("$('#' + pName)",$("#" + id))
        // console.log("$('#' + pName)",$("#" + id).prop('checked'))
    }
        if (data.type == "radio") {
            selectAllStatus = $("#" + id).prop('checked')
        } else 
        if ($("#" + pName).length === 0 && data.type !== "radio") {
            selectAllStatus = true;
        }
        return <>
        
        <Collapse id={pName + "Collapse"} className={id+'Collapse'} in={selectAllStatus}>
                <div className='ml-4 my-2 collapsible'>
                {
                data.notes_first
                    ?
                    data.notes !== undefined
                        ? <>
                        {notesField(pName, data.notesText)}
                        <br/>
                        </>
                        : ""
                    : ""
            }
                    {
                        e.map((f) => <Child data={f} parentName={id} currentKey={i} InputKey={i} />)
                    }
                </div>
            </Collapse>
            </>
        // } else {
        //     return <div className='ml-4 my-2'>
        //         {
        //             e.map((f) => <Child data={f} parentName={id} currentKey={i} InputKey={i} />)
        //         }
        //     </div>
        // }
    }

    React.useEffect(() => {
        if (tmpAllAddNewData && tmpAllAddNewData[id.replace('_add-new', '')]) {
            setaddNew(tmpAllAddNewData[id.replace('_add-new', '')])
        }
    }, [tmpAllAddNewData])


    return (
        <li className={`${(data.child && data.child.length > 0) ? "d-block" : "d-inline-block"}`}>
            {
                data.for === "normal"
                    ? checkradioField(pName, id, name, data.type)
                    : (
                        data.for === "radio-group" || data.for == "inline-text"
                            ? radioGroup()
                            : (data.for === 'addnew'
                                ? addnewField(pName + (data.type == 'radio' ? 'add-new' : ''))
                                : (data.for === "inline-notes"
                                    ? inlineNoteField()
                                    : ""
                                )
                            )
                    )
            }
            {
                data.notes_first && !data.child
                    ?
                    data.notes !== undefined
                        ? notesField(pName, data.notesText)
                        : ""
                    : ""
            }
            {
                data.child && data.child.length > 0
                    ? data.child.map((e, i) => {
                        return isCollapse(e, i)
                    })
                    : null
            }
            {
                // data.child !== undefined
                //     ? data.child.map((e, i) => {
                //         return isCollapse(e, i)
                //     })
                //     : ''
            }

            {
                !data.notes_first
                    ?
                    data.notes !== undefined
                        ? notesField(pName, data.notesText)
                        : ""
                    : ""
            }
            {
                addAdditional.map((e, i) => {
                    return <ul><hr /><li>
                        {
                            data.additional_with_reportedBy
                                ? reportedByAssessment.map((l, m) => <Child data={l} parentName={pName + "_" + (i + 1)} currentKey={i} InputKey={i} />)
                                : ""
                        }
                        {
                            newAdditional.filter((l) => l.for == data.additional_id)[0].child.map((f, j) => {
                                return <div>
                                    {
                                        f.map((h, k) => <Child data={h} parentName={id + "_" + (i + 1)} currentKey={i} InputKey={i} />)
                                    }
                                </div>
                            })
                        }
                    </li></ul>
                })
            }
            {
                data.additional || data.for == 'add_additional'
                    ? aditional()
                    : ""
            }
        </li>
    )
}
export default Child