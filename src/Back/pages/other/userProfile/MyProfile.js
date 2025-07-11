import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import Loader from 'react-loader-spinner'
import { postRequest } from '../../CustomHttp'
import MembershInfo from './MembershInfo'
import TopComponent from './TopComponent'
import UserActivity from './UserActivity'
import UserInfo from './UserInfo'

export const UserInformation = createContext();

function MyProfile({userId, from}) {   
    
     const validateMembership = ['account'];
     const initUserData = false; //getUser();     
     const [UserDetail, setUserDetail] = useState(initUserData); 
     const Role = UserDetail.role;         
    
    //  console.log('cust Data ',UserDetail);

     const getUserData = async () => {
         const Url = '/profile';
         const postData = userId ? {id: userId} : {};
         const getData = await postRequest(Url, postData,true);                          
         if(getData){
            setUserDetail(getData.data);
         }
     }          

     useEffect(() => {        
         getUserData()
         return () => {
             //cleanup
         }
     }, []);
    
    return (        
        <UserInformation.Provider value={{userDetail: UserDetail, setUserDetail: setUserDetail, id: userId}}>
            <div id="kt_content_container" className="d-flex flex-column-fluid align-items-start container-xxl">		
                <div className="content flex-row-fluid paddingZero" id="kt_content">
                    {
                        UserDetail
                        ?   <>
                                <TopComponent />
                                <div className="row g-6 g-xl-9">
                                    <UserInfo />
                                    <div className="col-lg-4 col-xxl-4">
                                    {
                                        (!validateMembership.includes(Role) || from === 'clinician') ? null : <MembershInfo />
                                    }      
                                    {  UserDetail.last_login
                                        ? <UserActivity lastLogin={UserDetail.last_login} />
                                        : null
                                    }                                               
                                    </div>
                                </div>
                            </>
                        :   <div className='d-flex w-100 justify-content-center'> 
                                <Loader
                                type="ThreeDots"
                                color="#ffff"
                                height={100}
                                width={100}
                                timeout={30000}/>
                            </div>
                    }               
                </div>                
            </div>                    
        </UserInformation.Provider>
    )
}

export default MyProfile
