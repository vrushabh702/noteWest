import { useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import { postRequest } from "../Back/pages/CustomHttp";

function ContactUs() {
    const ContactUsFormRef = useRef()
    const [alertMessage, setAlertMessage] = useState(false);

    const submitForm = async () => {
        let isValidate = window.contactUsValidation();
        if(isValidate){
            let formData = {}
            Array.from(ContactUsFormRef.current).map((e) => {
                formData = {...formData, [e.name] : e.value}
            });

            const URL = '/contact-us'
            const Params = formData
            const postData = await postRequest(URL, Params);
            if(postData){
                setAlertMessage(postData)
            }
        }
    }
    return (
        <section className="contact_info" id="contact">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 res_mrg">
                        <div className="contact_img wow fadeInDown animated" data-wow-delay="500ms" data-wow-duration="1500ms">
                            <img src="assets/media/img/image-02.jpg" alt="person with phone" className="pr-5" />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className="contact_details wow fadeInRight animated" data-wow-delay="500ms" data-wow-duration="1500ms">
                            <div className="heding">
                                <span>Contact Us</span>
                                <h2>Get In Touch</h2>
                                <p>Consectetur elit sedo eiusmod tempor incididunt ulabor sed <br /> magna aliqua enim
                                    veniam quis adipisicing elit.</p>
                            </div>
                            { alertMessage ? <Alert variant={ alertMessage.status ? 'success' : 'danger' } onClose={() => setAlertMessage(false)} dismissible>
                                            <b>{ alertMessage.message }</b>
                                        </Alert>
                                        : '' 
                            }
                            <form id="ContactUsForm" ref={ContactUsFormRef}>
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <input type="text" name="full_name" placeholder="Full Name" />
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <input type="text" name="email" placeholder="Email Address" />                                       
                                    </div>
                                    <div className="col-12">
                                        <textarea placeholder="Message" name="message" rows={5} defaultValue={""} />
                                        <input type="button" name="button" defaultValue="Send Message" onClick={() => submitForm()} />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactUs