import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { postRequest } from "../CustomHttp";
import DragAndDropFile from "../other/DragAndDropFile";
import UploadedFile from "../other/UploadedFile";

export default function FileManager(props) {    
    const [UploadedFiles, setUploadedFiles] = useState([]);   
    const [GetFilesLoading, setGetFilesLoading] = useState(false);    
    const params = useParams()    
    const userId = params.id; 

    const getUserFiles = async (searchString = '') => {
        setGetFilesLoading(true);
        const Url = '/client-document';
        const postData = {client_id: userId, search: searchString}
        let getFiles = await postRequest(Url, postData, true);
        if(getFiles){
          if(getFiles.status){
            setUploadedFiles(getFiles.data ?? []);            
          }
          setGetFilesLoading(false);
        }
    }    

    const deleteFile = async (fileId) => {
        // console.log('fileid',fileId)
        const Url = '/delete-upload-document';
        const postData = { client_id: userId, id: fileId }
        let deleteEvent = await postRequest(Url, postData, true);
        if(deleteEvent){
          if(deleteEvent.status){
            getUserFiles();
          }
        }
    }

    const SearchFiles = (searchString) => {
        if(searchString.trim() !== ''){
            getUserFiles(searchString);
        }else{
            getUserFiles()
        }
    }

    useEffect(() => {
      //
      getUserFiles();
      return () => {
        //
      }
    }, [])    
    
  // console.log('uploaded file',UploadedFiles);
  return (
    <React.Fragment>           
        <DragAndDropFile syncFiles={getUserFiles}  userId={userId} />       
        <div className="d-flex flex-wrap flex-stack mb-6">
          <h3 className="fw-bolder my-2">
            Total Uploads
            <span className="fs-6 text-gray-400 fw-bold ms-1">
                { UploadedFiles.length ?? 0 }
            </span>
          </h3>
          <div className="d-flex my-2">
            <div className="d-flex align-items-center position-relative me-4">
              <span className="svg-icon svg-icon-3 position-absolute ms-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <rect
                    opacity="0.5"
                    x="17.0365"
                    y="15.1223"
                    width="8.15546"
                    height={2}
                    rx={1}
                    transform="rotate(45 17.0365 15.1223)"
                    fill="black"
                  />
                  <path
                    d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z"
                    fill="black"
                  />
                </svg>
              </span>
              <input
                type="text"
                id="kt_filter_search"
                className="form-control form-control-white form-control-sm w-150px ps-9 py-4"
                placeholder="Search"
                onChange={(e) => SearchFiles(e.target.value) }
              />
            </div>            
          </div>
        </div>
        <div className="row g-6 g-xl-9 mb-6 mb-xl-9">
            {
              GetFilesLoading 
              ? <center><Loader type="ThreeDots" color="#009EF7" height={100} width={100} timeout={300000}/></center>
              : (                        
                  UploadedFiles.length > 0                 
                  ? (UploadedFiles.reverse()).map((e, i) => (
                          <UploadedFile key={'key_no_'+i} fileDetail={e} deleteFun={deleteFile} />
                      ))
                  : <h3 className="text-center">No Files Available</h3>
                )
          }        
        </div>      
    </React.Fragment>
  );
}
