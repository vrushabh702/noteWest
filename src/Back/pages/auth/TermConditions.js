import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../../Frontend/Header';
import Footer from '../../../Frontend/Footer';
import TermAndConditions from './TermAndConditions';

export default function TermConditions(props) {
    return (
        <>
            <Header />

            <div className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed" style={{ backgroundImage: 'url(/metronic8/demo2/assets/media/illustrations/sigma-1/14.png' }}>
                <div className="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
                    <div className="container card">
                    <div className='my-8'>
                   <TermAndConditions/>
                    </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}
