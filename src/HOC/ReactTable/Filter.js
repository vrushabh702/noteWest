import React, { useState } from 'react'
import CustModal from '../CustModal';
import FilterModal from './Modal/FilterModal';

function Filter() {
    const [ShowModal, setShowModal] = useState(false);
    return (
        <>
            <button type="button" className="btn btn-light-primary me-3" onClick={() => setShowModal(true)}>                        
                <span className="svg-icon svg-icon-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                        <path d="M19.0759 3H4.72777C3.95892 3 3.47768 3.83148 3.86067 4.49814L8.56967 12.6949C9.17923 13.7559 9.5 14.9582 9.5 16.1819V19.5072C9.5 20.2189 10.2223 20.7028 10.8805 20.432L13.8805 19.1977C14.2553 19.0435 14.5 18.6783 14.5 18.273V13.8372C14.5 12.8089 14.8171 11.8056 15.408 10.964L19.8943 4.57465C20.3596 3.912 19.8856 3 19.0759 3Z" fill="black" />
                    </svg>
                </span>
                Filter
            </button>  
            <CustModal show={ShowModal} header={'Filter'} size={'md'} close={() => setShowModal(false)}>  
                <FilterModal close={() => setShowModal(false)}/>
            </CustModal>
        </>
    )
}

export default Filter
