import React, { useContext, useState } from 'react'
import Loader from 'react-loader-spinner';
import PaymentLoader from '../../auth/PaymentLoader';
import { postRequest } from '../../CustomHttp';
import { UserInformation } from './MyProfile';
import PlanCost from './PlanCost';
import Toastify from '../../../../component/toast';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { setSession } from '../../Session';

function ChangePlan(props) {
    // let nounce = null;
    const history = useNavigate();
    const [nounce, setNounce] = useState(null)
    const [planId, setplanId] = useState(false)
    const [loader, setLoader] = useState(false)
    // let planId = false;
    // let planCost = false;
    const [planCost, setPlanCost] = useState(false)
    const {userDetail, setUserDetail} = useContext(UserInformation);
    // console.log("userDetail",userDetail)
    //
    const getNonce = (e) => {
        // nounce = e;    
        setNounce(e)    
        if(e && planId){
            chnagePlan(e);
        }

    }
    
    const getPlanIdAndCost = (id, cost) => {
        // console.log(id);
        // console.log(cost);
        // planId = id;
        setplanId(id)
        // planCost = cost;  
        setPlanCost(cost);      
    }

    //
    const chnagePlan = async (e) => {
        setLoader(true)
        const URL = '/change-plan';
        const postData = { package: planId, nonce: e };
        const uploadData = await postRequest(URL, postData, true);
        if(uploadData){
            // console.log(uploadData);
            if(uploadData.status){
                setUserDetail({...userDetail, membership: uploadData.data});
                setLoader(false)
                props.close();
                toast.success(uploadData.message)
                setSession('userData', null);
                setSession('authData', null);
                history('/login');
            setTimeout(() => {
              toast.success("For security purposes, please log back in to access your account.");
            }, 500);
            } else {
                setLoader(false)
                toast.error(uploadData.message)
            }

        }
    }

    return (
        <>
        <Toastify/>
        
        <div>
        {loader && (
             <div className="text-center" style={{
                position:"absolute",top:0,left:0,width:'100%',height:"100%",
                display:"flex",justifyContent:"center",alignItems:"center",zIndex:999,backgroundColor:"rgba(255,255,255,0.9)"}}>
                <div>
                <Loader type="ThreeDots" color="#017EAD" height={100} width={100} timeout={10000}/>                    
                <p>Processing... <br/> Please do not refersh the page.</p>
                </div>
            </div> 
        )}
            
            <>
            <PlanCost shareIdAndCost={getPlanIdAndCost} minVal={userDetail.membership.person ?? 1} /> 
            {/* <div class="text-center">
                <button type="button" id="kt_sign_up_submit" class="btn btn-lg btn-primary" onClick={chnagePlan}>Update</button>
            </div> */}
            {
                planCost ? <PaymentLoader getNonce={getNonce} planCost={planCost} 
                userData={{
                    billingContact: {
                      givenName: userDetail.first_name,
                      familyName: userDetail.last_name,
                      email: userDetail.email,
                      phone: userDetail.phone_number ?? "",
                      addressLines: [userDetail.phy_address??""],
                      city: userDetail.phy_city_name??"",
                      state: userDetail.phy_state_name??"",
                      countryCode: 'US',
                    },
                    amount: planCost,
                    currencyCode: 'USD',
                    intent: 'CHARGE',
                  }}
                /> : null
            }
            
            </>
        </div>
        </>
    )
}

export default ChangePlan
