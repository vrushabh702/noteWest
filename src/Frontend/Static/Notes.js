import FrontHeader from '../FrontHeader';
import FrontFooter from '../FrontFooter';
import { Helmet } from 'react-helmet';

function Notes() {
    return (
        <div className="d-flex flex-column flex-root font-fira-sans">
            <Helmet>
                <title>NoteNest - Organize and Access All Your Notes in One Place</title>
                <meta name="description" content="Effortlessly organize, manage, and access your notes with NoteNest's simple and intuitive platform. Create and store notes in one place." />
            </Helmet>

            <FrontHeader />
             <>
                <div
                    className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed font-fira-sans"
                    >
                    <div className="container">
                    <div className="d-flex flex-center flex-column flex-column-fluid">
                        <div className="rounded p-10 p-lg-20 me-auto ">
                        <div className="text-start">
                            <h1 className="fs-2hx fs-lg-4x text-white" id="how-it-works" data-kt-scroll-offset="{default: 100, lg: 150}">
                            Notenest
                            </h1>
                        </div>
                        
                        </div>
                    </div>
                    <div className="d-flex flex-center flex-column flex-column-fluid p-10 pt-0 mb-17">
                        <div className=" bg-body rounded shadow-sm p-10 p-lg-15 mx-auto ">
                        <div className="">
                            <div className="fs-4 text-muted mb-4">Designed specifically for mental health providers including Licensed
                            Counselors, Psychologists,
                            and Licensed Clinical Social Workers, NoteNest creates automated notes for all four of the
                            major documentation types. Assessments, Treatment Plans, Progress Notes, and Discharge
                            summaries can be created easily and quickly, while providers maintain complete control of the
                            content via checkbox selections.
                            </div>
                        
                        </div>
                        <div className="row">
                            <div className="col-lg-5 col-md-6 col-sm-12 pb-5">
                            <div className="about_imgr wow fadeInDown animated" data-wow-delay="500ms" data-wow-duration="1500ms">
                                <img
                                src="/assets/img/image-06.jpg" className="fullwidth" alt='edge NLP technology' />
                                </div>
                            </div>
                            <div className="col-lg-7 col-md-6 col-sm-12 pb-5">
                            <div className="">
                                <div className="fs-4 text-muted mb-4">
                                Our cutting edge NLP technology writes your notes for you. While you navigate our robust (but
                                easy to navigate) content fields and select keywords, your customized documents will include
                                your client’s name and pronouns, sound natural, and be dense with content, themes,
                                interventions, and a detailed MSE. Further providers can customize keywords, add language,
                                add written notes, and pick different note outputs for continued variability.
                
                                </div>
                                <div className="fs-4 text-muted mb-4">
                                Meeting and surpassing the requirements for SOAP notes will not be an issue for those using
                                NoteNest. Further, providers will be able to keep all of their documents in one place. NoteNest
                                allows for downloads and uploads of documents to allow storage options for practices and
                                providers.
                                </div>
                            </div>
                            </div>
                            
                        </div>
                        <div className="fs-4 text-muted">
                            Providers who offer teletherapy may find NoteNest particularly attractive as they can keep notes
                            live without their clients even knowing. NoteNest allows them to document all of their session
                            content (no need to use their memory) and have their note done the second the video ends.
                        </div>                    
                        
                        </div>
                    </div>
                    <div className="container">
                        <div className="py-lg-10">

                        
                    <div className="mb-20 pb-10 pb-lg-20">
                        <div className="text-center mb-5">
                        <h2 className="fs-2hx text-dark mb-5" id="how-it-works" data-kt-scroll-offset="{default: 100, lg: 150}">Type of Notes </h2>
                        
                        </div>
                        <div className="row w-100 gy-10 gx-5 mt-0 mb-5">
                        <div className="col-lg-3 col-md-6 col-sm-12 mb-5">
                        <div className="rounded px-5 py-10 bg-body shadow-sm w-90 mx-auto">
                            <div className="text-center mb-10 mb-md-0"><img src="assets/img/Features.png" className="mb-9" alt="Assessments" />
                            <div className="d-flex flex-center"><span
                                className="badge badge-circle badge-light-success fw-bolder p-5 me-3 fs-3">1</span>
                                <div className="fs-5 fs-lg-3 fw-bolder text-dark">Assessments</div>
                            </div>
                            
                            </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12 mb-5">
                        <div className="rounded px-5 py-10 bg-body shadow-sm w-90 mx-auto">
                            <div className="text-center mb-10 mb-md-0"><img src="assets/img/Features.png" className="mb-9" alt="Treatment
                                Plans" />
                            <div className="d-flex flex-center"><span
                                className="badge badge-circle badge-light-success fw-bolder p-5 me-3 fs-3">2</span>
                                <div className="fs-5 fs-lg-3 fw-bolder text-dark">Treatment
                                Plans</div>
                            </div>
                            
                            </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12 mb-5">
                        <div className="rounded px-5 py-10 bg-body shadow-sm w-90 mx-auto">
                            <div className="text-center mb-10 mb-md-0"><img src="/assets/img/Features.png" className="mb-9" alt="Progress Notes" />
                            <div className="d-flex flex-center"><span
                                className="badge badge-circle badge-light-success fw-bolder p-5 me-3 fs-3">3</span>
                                <div className="fs-5 fs-lg-3 fw-bolder text-dark">Progress Notes</div>
                            </div>
                            
                            </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12 mb-5">
                        <div className="rounded px-5 py-10 bg-body shadow-sm w-90 mx-auto">
                            <div className="text-center mb-10 mb-md-0"><img src="/assets/img/Features.png" className="mb-9" alt="Discharge Summaries" />
                            <div className="d-flex flex-center"><span
                                className="badge badge-circle badge-light-success fw-bolder p-5 me-3 fs-3">4</span>
                                <div className="fs-5 fs-lg-3 fw-bolder text-dark"> Discharge Summaries</div>
                            </div>
                            
                            </div>
                            </div>
                        </div>
                        
                        </div>
                        <div className=" bg-body rounded shadow-sm p-10 p-lg-15 mx-auto ">
                        <div className="text-center">
                            <div className="fs-4 text-muted mb-5">NoteNest is set up to fully compose the four major types of notes- Assessments, Treatment
                            Plans, Progress Notes, and Discharge Summaries. All of these documents are customized with
                            the client’s preferred name and pronouns throughout</div>
                            <div className="fs-4 text-muted mb-5">Integrated into the Assessment and Progress Notes is a full MSE with a single click “all normal”
                            button for rapid notes.</div>
                            <div className="fs-4 text-muted mb-5">Progress notes have some additional features including a “replicate note” button allowing
                            providers to pull up all of the keywords from a previous session and make changes as-needed.
                            Additionally, providers are prompted to pick “who was present.” The language throughout the
                            note changes based on this selection, i.e. if a family is present the language will sound different
                            than if it is just the client.</div>
                            <div className="fs-4 text-muted mb-5">NoteNest includes a complete list of diagnoses with ICD10 codes to pick from which is included
                            in each note.
                            </div>
                            <div className="fs-4 text-muted mb-5">Information is pulled from the assessment and imputed into the treatment plan and from the
                            treatment plan to progress notes and discharge summaries, saving providers additional time.
                            Documents don’t only build on themselves and previous documents but they pull information
                            from one another.
                            </div>
                        </div>
                        
                        </div>
                        
                        </div>
                    </div>
                    </div>

                    

                    </div>
                </div>
             </>
            <FrontFooter />
        </div>
    );
}

export default Notes;