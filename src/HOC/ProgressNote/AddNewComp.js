import React from 'react'

function AddNewComp({data, value, InputKey, parentName, name, type, checkedFun, setOpenMAE, radioName, defaultCheck }) {       
    
    let previousCheck = defaultCheck ?? false;
    const newName = type === "radio" ? (data.same_name ? parentName + "_" + data.same_name : radioName) : name;
    const [editState, setEditState] = React.useState({editMode: false, name: value});    
    const newIdObj = { name: editState.name, checked: previousCheck, editModeName: newName, index: InputKey, value: editState.name, type, id: (name + "_" + (value.split(' ').join('_'))), addNewChild: data.addnew_child  }; 

    const newId = JSON.stringify(newIdObj);

    const checkedFunction = (e) => {  
        if(!e.target) return false;
        if(e.target.type === "radio"){
            e.target.checked = !previousCheck;
            previousCheck = e.target.checked;
        }
        checkedFun(e, true);
        if (data.measurementAndEvidenced !== undefined) {
            setOpenMAE(e.target.checked);
        }
    }    
    
    return (
        <div className="c-pointer p-relative form-check form-check-sm form-check-custom form-check-solid my-1" style={{paddingRight: '2em', marginRight: '5px'}}>
            <input
                className={'form-check-input widget-9-check'}
                type={type} 
                data-id={name}
                id={newId}
                name={newName}        
                onClick={checkedFunction}
                onMouseOver={(e) => previousCheck = e.target.checked}                     
                defaultChecked={defaultCheck ?? false}
                value={parentName + (data.same_name ? "_" + data.same_name : "") + "_addNewArray"}
            />
            {
                editState.editMode
                ? <input type={'text'} className="form-control form-control-solid" value={editState.name} onKeyDown={(e) => { if(e.key === "Enter"){ checkedFunction({target: document.getElementById(newId)}); setEditState({...editState, editMode: !editState.editMode}) }}} onChange={(e) => setEditState({...editState, name: e.target.value})} />
                : <label htmlFor={newId} className="align-items-center fs-6 text-dark fw-bold form-label mb-2 customCheckValue">{editState.name}</label>            
            }
            <button type='button' className="edit_addNew_elelement" onClick={() => { checkedFunction({target: document.getElementById(newId)}); setEditState({...editState, editMode: !editState.editMode})}}>
                <i className={`text-primary ${editState.editMode ? 'fas fa-check' : 'fas fa-pen'}`}></i>                
            </button>
        </div>
    )
}

export default AddNewComp