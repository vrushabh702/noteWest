import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import { Button, FormControl, InputGroup, OverlayTrigger, Popover } from 'react-bootstrap';
import { ApplyFilter } from "../TableIndex";

function FilterModal(props) { 
  const {fetchUser, roleFilter, dateFilter} = useContext(ApplyFilter);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const [startDateVal, setStartDateVal] = useState(false);
  const [endDateVal, setEndDateVal] = useState(false);
  const [userRole, setUserRole] = useState(0);
  const [DateRangeValue, setDateRangeValue] = useState('Select Start To End Date');
  
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end); 

    setStartDateVal(moment(start).format('YYYY-MM-DD'));
    if(end){
      setEndDateVal(moment(end).format('YYYY-MM-DD'));
    }    
  };
  
  const FilterAppply = () => {
    if((startDateVal && endDateVal) || userRole){
      fetchUser({from_date: startDateVal, to_date: endDateVal, user_role: userRole});
      props.close();
    }
  }

  const ClearFilter = () => {
    window.location.reload();
  }


  useEffect(() => {
    let start = startDateVal ? startDateVal : 'Start Date';
    let end = endDateVal ? endDateVal : 'End Date'
    setDateRangeValue(start+' - '+end)
    return () => {
      //cleanup
    }
  }, [startDateVal, endDateVal])

  const popoverDate = (
          <Popover id="popover-basic">
              <DatePicker       
                selected={startDate}         
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
              />
          </Popover>
  );
  return (
    <>
      {
        dateFilter 
        ?
          <div>                
                <InputGroup className="mb-3">
                  <OverlayTrigger trigger="click" placement="right" overlay={popoverDate} rootClose>                    
                          <FormControl                   
                            style={{ color: '#a1a5b7' }}
                            placeholder="Select Date Range"
                            aria-label="Select Date Range"
                            value={DateRangeValue}
                            readOnly
                          />                                        
                </OverlayTrigger>
              </InputGroup>
          </div> 
        : ""
      }
      {
        roleFilter
        ? <div className="my-2">        
          <select className="w-100 mb-0 fw-bolder form-select form-select-solid" name="filter_by_role" id="filter_by_role" value={userRole} onChange={(e) => setUserRole(e.target.value)}>
              <option value="0">Select Role</option>
              <option value="4">Clinician</option>
              <option value="5">Supervisor</option>
              <option value="3">Practice Administrator</option>
          </select>
        </div>
        : ""
      }      
      <div>
        <div className="btn btn-primary" onClick={() => FilterAppply()}>Apply</div>    
        &nbsp;
        <div className="btn btn-warning" onClick={() => ClearFilter()}>Clear Filter</div>
      </div>
    </>
  );
}

export default FilterModal;
