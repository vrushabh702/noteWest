import React, { useContext, useState } from 'react'
import { Alert } from 'react-bootstrap';
import { userData } from '../client/ViewDetail';
import { postRequest } from '../CustomHttp';
import PronounceList from '../other/PronounceList';

export default function ChangePronouns(props) {  

    const {userInfo, changeInfo} = useContext(userData);
    const PropArray = { 0: userInfo.pronouns1, 1: userInfo.pronouns2, 2: userInfo.pronouns3};
    const [SelectedArray, setSelectedArray] = useState(PropArray);        
    const [ShowError, setShowError] = useState(false);        

    const checkUncheckFun = (e, i) => {
        const value = e.target.value;
        const checked = e.target.checked;
        if(checked){                              
            setSelectedArray({...SelectedArray, [i]: value});            
        }else{
            let newValue = SelectedArray.filter((e) => e !== value);            
            setSelectedArray(newValue);            
        }                
    }

    const SubmitChanges = async () => {
        let isValidate = window.changePronounsFormValidation();        
        if(SelectedArray[0] == null || SelectedArray[1] == null || SelectedArray[2] == null){
            setShowError('Please select one from each column')
        }else if(isValidate) {
            setShowError(false)
            const URL = '/update-client';
            const postData = {pronouns: SelectedArray, id: props.userId};
            const UploadData = await postRequest(URL, postData, true);            
            if (UploadData) {
                if (UploadData.status) {
                    const updatedData = {...userInfo, ...UploadData.data};
                    changeInfo(updatedData);
                    props.close();
                }else{
                    setShowError(UploadData.message)
                }
            }
        }
    }
    return (
        <>
            <form className="form" id="changePronounsForm" method="post">
                {
                    ShowError
                    ? <Alert variant={ 'danger' }> 
                            <b>{ ShowError }</b>
                        </Alert>
                    : ""                
                }
                <div className="scroll-y me-n7 pe-7" id="kt_modal_add_customer_scroll">
                    <div className="row fv-row mb-7">
                        <div className="row fv-row">
                            <span id="error-pronouns-individual" className="mb-4" />
                            <PronounceList changeFun={checkUncheckFun} selected={SelectedArray} />
                            <div className="col-4">
                                <button type="button" className="btn btn-primary" onClick={() => SubmitChanges()}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
