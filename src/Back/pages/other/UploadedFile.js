import moment from 'moment'
import React from 'react'
import { Url } from '../CustomHttp';

function UploadedFile({ fileDetail, deleteFun }) {    
    const from = moment(fileDetail.created_at);
    const humanTime = from.fromNow();    
    const fileIcon = fileDetail.extension+'.png';    

    return (        
        <div className="col-md-6 col-lg-4 col-xl-3">                    
            <div className="card h-100">                        
                <div className="card-body d-flex justify-content-center text-center flex-column p-8">                        
                <a href={Url+fileDetail.url} download className="text-gray-800 text-hover-primary d-flex flex-column">                            
                    <div className="symbol symbol-60px mb-5">
                    <img src={"/assets/media/svg/files/"+fileIcon} alt="File" />
                    </div>                                                        
                    <div className="fs-5 fw-bolder mb-2 long-text-dot-filter">{fileDetail.name}</div>                            
                </a>                                                
                <div className="fs-7 fw-bold text-gray-400">{humanTime}</div>                        
                </div>
                <span className='delete-btn' onClick={() => deleteFun(fileDetail.id)}><i className='fas fa-trash'></i></span>                    
            </div>                    
        </div>          
    )
}

export default UploadedFile
