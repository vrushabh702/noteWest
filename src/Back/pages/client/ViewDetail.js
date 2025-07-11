import React, { useEffect, useReducer, useState } from 'react'
import { createContext } from 'react';
import { postRequest } from '../CustomHttp';
import ProfileHeader from './ProfileHeader';
import { useNavigate, useParams } from 'react-router-dom';
import ProgressNote from './ProgressNote';
import ClientDocument from './ClientDocument';
import FileManager from './FileManager';
import TreatmentPlan from './TreatmentPlan';
import Assessment from './Assessment';
import DischargeSummary from './DischargeSummary';
import Loader from 'react-loader-spinner';
import { TourProvider } from '@reactour/tour';
import replaceWords1 from "./replaceWords1.json";
import { getAuthData } from '../Session';

export const userData = createContext();
const steps = [
    {
        selector: '.clientDetail__tour__step-one',
        content: 'You can create a note for your client directly from this screen by clicking one of the buttons on the right. But for your first time, please select your client’s name in order to access their profile.',
    },
    {
        selector: '.clientDetail__tour__step-two',
        content: 'this is your client’s profile page, where you will be able to see all of their documentation. You can edit their pronouns, preferred name, and diagnosis directly from this screen. You can also upload and download files here.',
    },
    {
        selector: '.clientDetail__tour__step-three',
        content: 'You can search through our list of diagnoses by typing in the search area and scrolling down or you can type your own custom diagnosis, add as many diagnoses as you want and when you are done, you are ready to write a note!',
    },
    {
        selector: '.clientDetail__tour__step-four',
        content: 'We recommend you begin by creating an Assessment and then a Treatment Plan, as some of this information is integrated into later documents and the documents work together, however you can start with a Treatment Plan (you will just have to type the presenting problem manually).',
    },
    {
        selector: '.clientDetail__tour__step-five',
        content: 'And this is where the magic is made! Take a look at the keywords on the left. We recommend you look around the different sections and keywords of each document and familiarize yourself with them a bit before making selections. When you are ready, you can start clicking and watch as your note writes itself in real time. Your documents are saved automatically, in real time. You can leave this document at any time and find it in the document list on the Client profile page',
    },
    {
        selector: '.clientDetail__tour__step-six',
        content: 'When you have made all of your selections, take a look over your finished document. You can view, manually edit, or sign off on this document by making a selection on the right side of the screen',
    },
    {
        selector: '.clientDetail__tour__step-seven',
        content: 'That’s it! Enjoy using NoteNest and please contact us with any feedback or questions via the “contact us” tab.',
    }
  ]

function ViewDetail() {      
    const AuthData = getAuthData();
    const navigate = useNavigate()
    useEffect(() => {
      if(!AuthData.notes.read){
        navigate('/auth/profile')
      }
    },[])     
    const paramData = useParams();
    const initialPage = <ClientDocument changePage={(e) => dispatch(e)}/>;    

    const pageReducer = (state = 1, number) => { 
        // console.log('page reducer called', number);
        const editId = number.editId ?? 0;
        switch (number.id) {
            case 1:
                return { id: 1, page: <ProgressNote />, editId: editId }
            case 2:
                return { id: 2, page: <FileManager />, editId: editId }
            case 3:
                return { id: 3, page: <Assessment />, editId: editId }
            case 4:
                return { id: 4, page: <TreatmentPlan />, editId: editId }
            case 5:
                return { id: 5, page: <DischargeSummary />, editId: editId }
            default:
                return { id: 6, page: initialPage }
        }
    }

    const [pageState, dispatch] = useReducer(pageReducer, initialPage);
    
    const userId = paramData.id;
    const [UserInfo, setUserInfo] = useState(false);

    const getUserDetail = async () => {
        const Url = '/client-info';
        const postData = { client_id: userId };
        const getUser = await postRequest(Url, postData, true);
        if (getUser) {
            setUserInfo(getUser.data);
        }

    }  
    
    const [step, setStep] = useState(0);

    const setCurrentStepFun = (step) => {        
        switch (step) {        
            case 1 || 2 || 3:
                dispatch({id: 0})
                break;                                                
            case 4 || 5 || 6:                          
                // console.log("steps",step)
                dispatch({id:3})
                break;                           
            default:
            break;
        }
        setStep(step);
    };


    useEffect(() => {        
        dispatch({id: parseInt(paramData.pageId)});            
    }, []);

    useEffect(getUserDetail, [pageState]);

    return (
        <>
        <TourProvider steps={steps} currentStep={step} setCurrentStep={setCurrentStepFun}>
            {
                UserInfo
                    ? <userData.Provider value={{ userInfo: UserInfo, changeInfo: setUserInfo, changePage: dispatch, editId: pageState.editId,getUserDetail:getUserDetail }}>
                        <div className="content flex-row-fluid paddingZero" id="kt_content">
                            <ProfileHeader currentPage={pageState.id} changePage={(e) => dispatch(e)} />
                            <div className="clientDetail__tour__step-two clientDetail__tour__step-five">
                                {pageState.page}
                            </div>
                        </div>
                    </userData.Provider>
                    : <div className='card w-100'><center><Loader
                        type="ThreeDots"
                        color="#017EAD"
                        height={100}
                        width={100}
                        timeout={30000} />
                    </center></div>
            }
        </TourProvider>
        </>
    )
}

export default React.memo(ViewDetail);
