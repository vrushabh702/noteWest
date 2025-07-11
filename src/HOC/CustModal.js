import React from 'react'
import { Alert, Modal } from 'react-bootstrap';

function CustModal(props) {
    let Header = props.header ?? 'Enter Details';     
    const Size = props.size || 'lg';
    return (        
            <Modal show={ props.show } size={Size} aria-labelledby="contained-modal-title-vcenter" centered onHide={ props.close }>
                 {
                     props.centerHeader
                     ? <div className='w-100 text-center pt-2 h3'>{props.centerHeader}</div>
                     : ""
                 } 
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter w-100">
                    { Header }
                    </Modal.Title>        
                    {
                        props.headerInfo
                        ? <><br / ><Modal.Header>{props.headerInfo}</Modal.Header></>
                        : ""
                    }            
                </Modal.Header>                
                <Modal.Body>
                { props.showAlert 
                    ? <Alert variant={ props.alertMessage.status ? 'success' : 'danger' } onClose={props.closeAlert} dismissible> 
                            <b>{ props.alertMessage.message }</b>
                        </Alert>
                    : '' }
                    { props.children }
                </Modal.Body>              
            </Modal>        
    )
}

export default CustModal
