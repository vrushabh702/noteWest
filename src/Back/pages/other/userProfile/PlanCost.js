import React, { useContext, useEffect, useState } from 'react'
import { getRequest } from '../../CustomHttp';
import { UserInformation } from './MyProfile';

function PlanCost(props) {    
    const membershipPerson  = parseInt(props.minVal);    
    const [Package, setPackage] = useState();
    const [packagePrice, setPackagePrice] = useState(0);  
    const [memberValue , setMemberValue] = useState(membershipPerson ?? 1);      
    const [error,setError] = useState(false)

    //
    const onChangePackage = (value) => {                                              
        let packagePrice = Package[value]; 
        setMemberValue(value);
        setPackagePrice(Package[value]);
        if(value<1 || value > 60){
            setError(true)
        } else {
            setError(false)
            if(props.shareIdAndCost){
                        props.shareIdAndCost(value, Package[value]);
                    }
        }
        // if(value == 0){
        //     setMemberValue(1);
        //     setPackagePrice(Package[1])    
        // } 

        // if(packagePrice === undefined){
        //     setMemberValue(membershipPerson);
        //     setPackagePrice(Package[membershipPerson]);
        //     if(value <= 60 && value >= 1){
        //         setMemberValue(value);
        //         setPackagePrice(Package[value]);
        //     }
        // }else{
        //     setMemberValue(value);
        //     setPackagePrice(prevVal => prevVal = Package[value]); 
        //     if(props.shareIdAndCost){
        //         props.shareIdAndCost(value, Package[value]);
        //     }
        // }            
    }

    //load packages 
    const getpackages = async () => {        
        const getPackage = await getRequest('/packages');
        if(getPackage){
            setPackage(getPackage.data);
            setPackagePrice(getPackage.data['1']);              
        }
    }    

    // React Hook
    useEffect(() => {
        if(!Package){
            getpackages();
        }else{
            onChangePackage(membershipPerson);
        }
        return () => {
            //cleanup
        }
    }, [Package]); 

    return (        
        <>
        <div className="row fv-row mb-7">                            
            <div className="col-xl-4">
                <label className="form-label text-dark fs-6 fw-bolder"><span className="required">Member ( Between 1-60 )</span></label>
                <input className="form-control form-control-lg form-control-solid" type="number" min={1} max="60" name="package" autoComplete="off" value={memberValue} onChange={(e) => onChangePackage(e.target.value)} />
                <em class="error">{error && 'Please enter a value less than or equal to 60.'}</em>
            </div>                                                        
            <div className="col-xl-4">
                <label className="form-label text-dark fs-6 fw-bolder">Monthly Cost</label>                                        
                <input className="form-control form-control-lg form-control-solid" type="text" placeholder="*Will be billed debited monthly from card on file" name="monthlyCost" value={packagePrice} readOnly autoComplete="off" />
            </div>  
            

            { props.children ?? null }

        </div>   
        </>      
    )
}

export default PlanCost
