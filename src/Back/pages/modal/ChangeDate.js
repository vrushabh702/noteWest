import React, { useState } from 'react'
import { useContext } from 'react';
import { userData } from '../client/ViewDetail';
import { postRequest } from '../CustomHttp';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField'
import moment from 'moment';

export default function ChangeDate(props) {
    const { changeInfo, userInfo } =  useContext(userData);
    const [Date, setDate] = useState({date: props.date, showError: false});

    const URL = '/update-client';
    const changeDate = async () => {                         
        if(Date.date.trim() !== '') {
            setDate(Date.date);
            const Data = {dob: Date.date, id: props.userId};
            const PostResponse = await postRequest(URL, Data, true);
            if (PostResponse) {
                if (PostResponse.status) {
                    changeInfo({...userInfo, dob: Date.date});
                    props.close();
                }else{
                    setDate({...Date, showError: PostResponse.message})
                }
            }
        }
    }
    
    return (
        <>
        <form className="form p-2" id="changeDOBForm" method="post">
            <div className="me-n7 pe-7 w-100" id="kt_modal_add_customer_scroll">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                    label="Pick A Date"
                    className='w-100'
                    inputFormat="MM/dd/yyyy"
                    value={Date.date}
                    onChange={(e) => setDate({...Date, date: moment(e).format('Y-MM-DD')})}
                    renderInput={(params) => <TextField className='w-100' {...params} />} 
                    />
                </LocalizationProvider>      
                {
                    Date.showError
                    ? <b className='text-danger'>{Date.showError}</b>
                    : ""
                }
            </div>
            <div className="form-group mt-5">
                <button type="button" className="btn btn-primary" onClick={() => changeDate()}>Update</button>
            </div>
        </form>
      </>
    )
}
