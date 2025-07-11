import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import MyProfile from '../other/userProfile/MyProfile'
import { getAuthData } from '../Session';

export default function ViewAccount() {
    const AuthData = getAuthData();
    const navigate = useNavigate()
    useEffect(() => {
      if(!AuthData.account.read){
        navigate('/auth')
      }
    },[]) 
    const getParams = useParams();    
    return (
        <React.Fragment>
            <MyProfile userId={getParams.id} />
        </React.Fragment>
    )
}
