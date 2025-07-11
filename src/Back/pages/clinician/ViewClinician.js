import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import MyProfile from '../other/userProfile/MyProfile'
import { getAuthData } from '../Session';

export default function ViewClinician() {
  const AuthData = getAuthData();
    const navigate = useNavigate()
    useEffect(() => {
      if(!AuthData.clinic.read){
        navigate('/auth/profile')
      }
    },[])
  const userId = useParams();
    return (
        <React.Fragment>
          <MyProfile userId={userId.id} from="clinician" />                               
      </React.Fragment>
    )
}
