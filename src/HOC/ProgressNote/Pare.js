import { debounce } from 'lodash';
import React, { createContext, useEffect, useRef, useState } from 'react'
import { useCallback } from 'react';
import Loader from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import { postRequest } from '../../Back/pages/CustomHttp';
import PareChild from './PareChild';
import $ from "jquery";

export const changeFuns = createContext();

let tmpAllCheckedArray = [];
let tmpAllAddNewData = {};


function Pare({ setStatement, setDurations, setStatusCollapse, setDateOfServices, data, URL, setAllData,selectAllData, viewEdit, setViewEdit, editMode, notes_id, commonData, saveAfterEdit,setpayloadsData,dataChildToParent,setSentenceLoader, setCheckboxLoader }) {
    const CheckForm = useRef();
    const params = useParams();
    const userId = params.id;
    const [selected_notes_ID, setSelected_notes_ID] = useState('');
    const [JsonData, setJsonData] = useState({ isLoading: false, data, clickCount: 0 });
    const postStatement = useCallback(debounce(postData, 350), [viewEdit]);
    var documentContent = $("#progressNote")
    let chData
    // var myVar = $('.searchingTextBG');
// console.log("commonData ===================> In Pare",commonData)
    // useEffect(()=>{        
    // },[commonData,dataChildToParent])

    // var checkData  ;
    const checkUncheckParentChild = (e) => {
        let { name, checked } = e.target;
        let fullName = name;
        if (checked) {
            let splittedName = fullName.split("_");
            while (splittedName.length > 1) {
                let tmpFullName = splittedName.join("_");
                if (!tmpAllCheckedArray.includes(tmpFullName)) {
                    tmpAllCheckedArray = [...tmpAllCheckedArray, tmpFullName];
                    // console.log('tmpAllCheckedArray', tmpAllCheckedArray)

                }
                if (CheckForm.current[tmpFullName]) {
                    CheckForm.current[tmpFullName].checked = true;
                }
                splittedName.pop();
            }
        } else if (e.target.type !== 'text') {
            [true, false].map((e) => {
                let joinedAllCheckedArray = tmpAllCheckedArray.join(",");
                tmpAllCheckedArray.sort();
                let splittedName = (fullName).split("_");
                let tmpFullName = splittedName.join("_");
                if (e) {
                    while (splittedName.length > 1) {
                        joinedAllCheckedArray = tmpAllCheckedArray.join(",");
                        let JoinName = splittedName.join("_");
                        if (tmpAllCheckedArray.includes(JoinName) && !joinedAllCheckedArray.includes(JoinName + "_") && CheckForm.current[JoinName]) {
                            CheckForm.current[JoinName].checked = false;
                            const index = tmpAllCheckedArray.indexOf(JoinName);
                            if (index > -1) {
                                tmpAllCheckedArray.splice(index, 1);
                            }
                        }
                        splittedName.pop();
                    }
                } else {
                    if (joinedAllCheckedArray.includes(tmpFullName)) {
                        let newArray = tmpAllCheckedArray.filter((e) => e.includes(tmpFullName));
                        if (!checked) {
                            newArray.map((e) => {
                                if (CheckForm.current[e]) {
                                    if (CheckForm.current[e].length > 1) {
                                        Array.from(CheckForm.current[e]).map((f) => f.checked = false);
                                    } else {
                                        CheckForm.current[e].checked = false;
                                    }
                                }
                                const index = tmpAllCheckedArray.indexOf(e);
                                if (index > -1) {
                                    tmpAllCheckedArray.splice(index, 1);
                                }
                            });
                        }

                    }
                }
            });
        }
    }
    // function updateBgColor(data){
    //         console.log(data)
    //         console.log(checkData)
    // }
    const checkedFun = (f, isAddNew = false) => {
        let data = [];
        if (!saveAfterEdit) {

            let currentCheckedData = f.target
            let SplitData = $(currentCheckedData)[0].id.split(/[.\_]/)
            chData = SplitData[SplitData.length - 1]
            const element = document.querySelector('#searchContent')

            if (element && element.length > 0) {
                $(element)[0].value = SplitData[SplitData.length - 1]
                if (chData) {
                    //setTimeout(() => {
                    var str1 = documentContent[0].children[0].innerHTML
                    str1 = str1.replaceAll(/<span class="searchingTextBG">/gi, "")
                    str1 = str1.replaceAll(/<\/span>/gi, "")
                    var reg = new RegExp(chData, 'gi');
                    var foundIndex = str1.match(reg);
                    if (foundIndex) {
                        let pattern = new RegExp("(" + chData + ")(?![^<>]*>)", "ig")
                        // var query = new RegExp("("+searchTxtBox.val()+")", "im");       
                        documentContent[0].children[0].innerHTML = str1.replaceAll(pattern, function (str) { return "<span class='searchingTextBG'>" + str + "</span>" });
                    } else {
                        documentContent[0].children[0].innerHTML = str1
                    }
                    let pattern = new RegExp("(" + chData + ")(?![^<>]*>)", "ig")
                    for (let index = 0; index < $('.accordion-item').length; index++) {
                        const element = $('.accordion-item')[index];
                        for (let k = 0; k < $('label', element).length; k++) {
                            const Parentelement = $('label', element)[k];
                            const elementText = $(Parentelement).text()
                            $(Parentelement).html(elementText.replaceAll(pattern, function (str) { return "<span class='searchingTextBG'>" + str + "</span>" }));

                        }
                    }
                }
            }
            checkUncheckParentChild(f);
        }
        // const checkFormArray=Array.from(CheckForm.current);
        // for (let index = 0; index < checkFormArray.length; index++) {
        //     const e = checkFormArray[index];
        //     if (e.name.trim() !== '') {
        //         const { name, value, id, checked, type } = e;
        //         let newAddNewObj = e.id;

        //         if (value.includes('_addNewArray')) {
        //             newAddNewObj = id.replace(/['"\\]/g, '');
        //             e.id = JSON.stringify(newAddNewObj);
        //         }
        //         data = { ...data, [value.includes('_addNewArray') ? value : (type === 'radio' ? id : name)]: value.includes('_addNewArray') ? [...(data[value] ?? []), {id:newAddNewObj,checked:e.checked,index:0,name:chData,type:e.type,value:chData}] : (name.includes('notes') ? value : (type == "select-one" ? value : checked)) }
        //     }
        // }
        Array.from(CheckForm.current).forEach((e) => {
            if (e.name.trim() !== '') {
                const { name, value, id, checked, type } = e;
                let newAddNewObj = e.id;

                if (value.includes('_addNewArray')) {
                    newAddNewObj = { ...(JSON.parse(id)), checked };
                    e.id = JSON.stringify(newAddNewObj);
                }
                data = { ...data, [value.includes('_addNewArray') ? value : (type === 'radio' ? id : name)]: value.includes('_addNewArray') ? [...(data[value] ?? []), newAddNewObj] : (name.includes('notes') ? value : (type == "select-one" ? value : checked)) }
            }
        });

        if (viewEdit.client_document_id < 1) {
            setJsonData({ ...JsonData, isLoading: true })
        }
        if (f.target.checked) {
            postStatement(data, chData, f.target.id);
        } else {
            postStatement(data, "", "");
        }
    }

    async function postData(newData, data, id) {
        // console.log('checkedFun',userId)
        // console.log(newData,'/new Data 186')
        // console.log(data,'/data 186')
        // console.log(id,'/id 188')
        // console.log(newData[selected_notes_ID+'_notes'],'189')
        if (id) {
            setSelected_notes_ID(id.replace(/['"\\]/g, ''))
            // data = 

        } else {
            // console.log(newData[selected_notes_ID + '_notes'], '1992')
            data = newData[selected_notes_ID + '_notes']
            // temperary ID Commented
            // id = newData[selected_notes_ID+'_notes']+'_notes'
            // console.log()

        }
        let sessionDuration = $('#session_duration').val()
        const postRequestData = {
            ...newData, 'client_id': userId,
            client_document_id: viewEdit.client_document_id,
            view_edit_flag: 0,
            notes_id: notes_id ?? 0,
            highlightedWordsId: id,
            highlightedWords: data,
            sessionDuration: sessionDuration
        }
        setpayloadsData(postRequestData)
        setSentenceLoader(true)
        const postdata = await postRequest(URL, postRequestData, true);
        if (postdata) {
            setStatement('');
            setStatement(postdata.paragraph);
            setAllData(data);
            setSentenceLoader(false)
            if (setDurations) {
                setDurations(postdata.session_duration)
            }
            if (setDateOfServices) {
                setDateOfServices(postdata.date_of_service)
            }

            setViewEdit(postdata)
            if (JsonData.clickCount < 1) {
                setJsonData(prevData =>({ ...prevData, clickCount: 1 }))
            }
            setJsonData(prevData =>({ ...prevData, isLoading: false }));
            setSentenceLoader(false)
        }
    }

    //


    const selectEdit = () => {
        tmpAllCheckedArray = []
        tmpAllAddNewData = []

        setJsonData({ ...JsonData, clickCount: 1 })
        setpayloadsData(editMode)
        for (let i in editMode) {
            if (i.includes('_addNewArray')) {
                tmpAllAddNewData = { ...tmpAllAddNewData, [i.replace('_addNewArray', '')]: editMode[i] }
                editMode[i].forEach((e) => {
                    if (e.checked) {
                        tmpAllCheckedArray.push(e.editModeName)
                    }
                })
            }
            if (CheckForm.current[i]) {
                if (i.includes('notes')) {
                    // console.log('if notes',CheckForm.current[i],editMode[i])
                    CheckForm.current[i].value = editMode[i]
                } else {
                    // console.log('else notes',CheckForm.current[i],editMode[i])

                    CheckForm.current[i].checked = editMode[i]
                    if (CheckForm.current[i].checked) {
                        tmpAllCheckedArray.push(i);
                    }
                    if (editMode[i]) {
                        let collapseId = document.getElementById(i + 'Collapse')
                        if (collapseId) {
                            collapseId.classList += 'show';
                        }
                    }
                }
            }
        }
        if (saveAfterEdit) {
            checkedFun()
        }
    }

    const unselectCheck = () => {
        Array.from(CheckForm.current).map((e) => {
            if (e.type == 'text') {
                e.value = ''
            } else if (e.type == 'checkbox' || e.type == 'radio') {
                e.checked = false
            }
        })

        tmpAllCheckedArray = []
        tmpAllAddNewData = []
    }

    // const checkSelectedKeys = (keys, checked) => {

    //     keys.forEach((e, i) => {
    //         CheckForm.current[e].checked = checked;
    //         let collapseId = document.getElementById(e + 'Collapse')
    //         if (collapseId) {
    //             if (checked) {
    //                 collapseId.classList += ' show';
    //             } else {
    //                 collapseId.classList.remove('show');
    //             }
    //         }
    //         if(checked){
    //             tmpAllCheckedArray.push(e);
    //         }else{
    //             tmpAllCheckedArray = tmpAllCheckedArray.filter((f) => f !== e);
    //         }
    //     })
    // }

    const checkSelectedKeys = (keys, checked) => {
        keys.forEach((e, i) => {
            if (CheckForm.current[e]) {

                CheckForm.current[e].checked = checked;
                let collapseId = document.getElementById(e + 'Collapse')
                if (collapseId) {
                    if (checked) {
                        collapseId.classList += ' show';
                    } else {
                        collapseId.classList.remove('show');
                    }
                }
                if (checked) {
                    tmpAllCheckedArray.push(e);
                } else {
                    tmpAllCheckedArray = tmpAllCheckedArray.filter((f) => f !== e);
                }
            }
        });
        // console.log("keys[0]",document.getElementById(keys[0]))
        checkedFun({ target: document.getElementById(keys[0]) })
    }

    React.useEffect(() => {
        console.log(' edit state called', editMode)
        if (editMode) {
            selectEdit()
        } else {
            unselectCheck()
        }
        return () => {
            tmpAllCheckedArray = []
            tmpAllAddNewData = []
        }

    }, [editMode])

    React.useEffect(() => {
        setJsonData(prev => ({ ...prev, data: data }));
    }, [data])


    return (
        <>
        {/* <button onClick={() => console.log(CheckForm.current)}>Console</button> */}
        <form ref={CheckForm}>
            {/* {
                JsonData.isLoading
                    ? <div className='cust__fixed_loading_spinner'><center><Loader
                        type="ThreeDots"
                        color="#017EAD"
                        height={150}
                        width={150}
                        timeout={300000} />
                    </center></div>
                    : ""
            } */}
            {
                JsonData.data.map((e, i) => (
                    <>
                    <changeFuns.Provider value={{ checkedFun, editMode, userId, tmpAllAddNewData, checkSelectedKeys, ...commonData, CheckForm, selectAllData,setJsonData,setCheckboxLoader }}>
                        <PareChild key={i} data={e} accordionStatus={setStatusCollapse} />
                    </changeFuns.Provider>
                    </>
                ))
            }
        </form>
        </>
    )
}

export default Pare