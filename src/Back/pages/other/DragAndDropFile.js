import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import Loader from 'react-loader-spinner'
import { postRequest } from '../CustomHttp';

function DragAndDropFile(props) {    
    const [Loading, setLoading] = useState(false);
 
    const onDrop = useCallback(acceptedFiles => { 
        let fileArray = [];
        let Data = {}
        acceptedFiles.forEach((file) => {                         
            fileArray = [...fileArray, file];                              
        })
        UploadData(fileArray, Data);        
    }, [])    
    
    const UploadData = async (fileData) => {
        setLoading(true);
        const Url = '/upload-document';
        let fd = new FormData();
        
        fileData.map((file) => {
            fd.append('file[]',file);
        });        

        fd.append('client_id', props.userId);          
        const postData = await postRequest(Url, fd, true, true); 

        if(postData){                                    
            setLoading(false);            
            props.syncFiles();
        }
    }
    
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: 'image/jpeg, image/png, application/pdf'});

    return (
    <div {...getRootProps()}>
        <div className="col-md-12 col-lg-12 col-xl-12">
            <div className="text-hover-primary fs-5 fw-bolder mb-2">
                <div className="card h-100 flex-center bg-light-primary border-primary border border-dashed p-8">
                    {
                        Loading
                        ? <Loader type="ThreeDots" color="#009EF7" height={100} width={100} timeout={300000}/>
                        :    <>
                                <input {...getInputProps()} />
                                {
                                    isDragActive 
                                    ? <Loader type="ThreeDots" color="#009EF7" height={100} width={100} timeout={30000}/> 
                                    : <> 
                                        <b>File Upload</b>
                                        <div className="fs-7 fw-bold text-gray-400"> 
                                            <small>
                                                Drag and drop files here <br />
                                                Accept Only: Jpg, png, pdf
                                            </small>
                                        </div> 
                                     </>
                                }  
                            </>                                    
                    }
                </div>            
            </div>
        </div>        
    </div>
    )
}

export default DragAndDropFile
