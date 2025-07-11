import React, { useContext, useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import { postRequest } from '../CustomHttp';
import { userData } from './ViewDetail';
import Loader from 'react-loader-spinner';

function DiagnosisComp({ userId, DiagnosisList,fromModal=false }) {       
    const selectRef = useRef();
    const [loading, setLoading] = useState(false);
    const [Diagnosis, setDiagnosis] = useState({ searchText: '', Diagnosis: DiagnosisList, resultDignosis: [{ 'name': "Search Diagnosis.." }], selectedDiagnosis: [], customDiagnosis: ''})
    const {getUserDetail} = useContext(userData)
    const searchDignosis = async (search) => { 
        const URL = '/search-diagnosis';
        const Params = { search, selected: DiagnosisList.length > 0 ? DiagnosisList : Diagnosis.selectedDiagnosis, id: userId };
        const postData = await postRequest(URL, Params, true);
        if(postData){   
            if(postData.length > 0){
                setDiagnosis({...Diagnosis, resultDignosis: postData.map((e) => { return {value: JSON.stringify(e), label: e.ICD_10_CM +" "+e.name }}), selectedDiagnosis: DiagnosisList.length > 0 ? DiagnosisList : []})
            }else{            
                setDiagnosis({...Diagnosis, resultDignosis: []})
            }
        }
    }
    
    const selectDignosis = async (data) => {   
        setLoading(true)         
        const URL = '/insert-diagnosis';
        const Params = { selectedData: JSON.parse(data).id, id: userId };
        const postData = await postRequest(URL, Params, true);
        if(postData){ 
            setDiagnosis({ ...Diagnosis, resultDignosis: Diagnosis.resultDignosis.filter((e) => JSON.parse(e.value).id !== JSON.parse(data).id), selectedDiagnosis: [...Diagnosis.selectedDiagnosis, JSON.parse(data)]})
            getUserDetail()                           
        }
        setLoading(false)           
    }

    const removeDiagnosis = async (id) => {
        const URL = '/remove-diagnosis';
        const Params = { diagnosis: id, id: userId };
        const postData = await postRequest(URL, Params, true);
        if(postData){
             setDiagnosis({...Diagnosis, selectedDiagnosis: Diagnosis.selectedDiagnosis.filter((e) => e.id !== id)}) 
             getUserDetail()            
         }
    }

    const selectedDiagnosisDiv = (data) => {
        if(!data) return ""
        return <div className='d-inline-block bg-grey rounded selected_diagnosis m-2'>
            <div className='d-flex selected_diagnosis__div'>
                <p>{data.ICD_10_CM} {data.name}</p>
                <button className='selected_diagnosis__remove_button' onClick={() => removeDiagnosis(data.id)}><b>x</b></button>
            </div>
        </div>
    }

    const addNewDiagnosis = async () => {
        const postData = await postRequest('/insert-custom-diagnosis', {diagnosis_name: Diagnosis.customDiagnosis, client_id: userId}, true);
        if(postData){
            setDiagnosis({...Diagnosis, selectedDiagnosis: [...Diagnosis.selectedDiagnosis, {id: new Date().getTime(),ICD_10_CM: '', name: Diagnosis.customDiagnosis}], customDiagnosis: ''});
            getUserDetail()  
        }
    }

    useEffect(() => {    
    searchDignosis()      
      return () => {
        //
      }
    }, [DiagnosisList])
    
    return <>
        <div className="d-flex flex-column flex-grow-1 pe-8 clientDetail__tour__step-three">
            <div className="d-flex flex-wrap">
                <div className="border border-gray-300 border-dashed rounded width-100 py-3 px-4 me-6 mt-10">
                    <h4>Diagnosis</h4>
                    <div className='selected_diagnosis'>
                        
                        {
                            Diagnosis.selectedDiagnosis.length > 0 
                            ? Diagnosis.selectedDiagnosis.map((e) => selectedDiagnosisDiv(e))
                            : "No Diagnosis Selected"
                        }
                    </div>
                    <hr />
                    <div className="fw-bolder fs-6 text-gray-400 cust__diagnosis_addNew_spaceBet">
                        <div>
                        <div className='d-flex' style={{ width: '500px' }}>
                            <Select 
                                ref={selectRef}
                                className='w-100'
                                options={Diagnosis.resultDignosis}                                
                                isClearable={true}
                                value={""}
                                placeholder={"Start typing..."}  
                                onChange={(e) => selectDignosis(e.value)} 
                            />
                            {/* <input type="text" 
                                    name="" 
                                    id="" 
                                    className='form-control form-control-solid text-gray-400 w-100 border-0' 
                                    style={{ outline: 'none' }} 
                                    placeholder='Search Diagnosis'                                                                                  
                                    onChange={(e) => {setDiagnosis({...Diagnosis, searchText: e.target.value}); searchDignosis(e.target.value) }} /> &nbsp;                                    */}
                        </div>
                        </div>
                        <div>                                
                            <div className="d-flex">
                                <input 
                                    type="text"   
                                    className=' form-control form-control-solid text-gray-400 w-100 border-0' 
                                    style={{ outline: 'none' }} 
                                    placeholder={"Add Custom Diagnosis"}  
                                    value={Diagnosis.customDiagnosis}  
                                    onChange={(e) => { if(e.target.value.trim() !== '') setDiagnosis({...Diagnosis, customDiagnosis: e.target.value}) }}
                                />
                                <button className='btn btn-primary' style={{ padding: "5px 10px 5px 15px" }} onClick={() => addNewDiagnosis()}><i className='fas fa-plus'></i></button>
                            </div>
                        </div>
                    </div>                   
                </div>
            </div>
        </div>
        {(loading && fromModal) &&  <Loader
                                                    type="ThreeDots"
                                                    color="#017EAD"
                                                    height={30}
                                                    width={30}
                                                    timeout={300000}
                                                  /> }
    </>;
}

export default DiagnosisComp;
