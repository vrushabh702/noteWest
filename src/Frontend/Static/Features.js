import FrontHeader from '../FrontHeader';
import FrontFooter from '../FrontFooter';
import { Helmet } from 'react-helmet';

function Features() {
    return (
        <div className="d-flex flex-column flex-root font-fira-sans">

            <Helmet>
                <title>NoteNest Features - Powerful Tools to Organize Your Notes</title>
                <meta name="description" content="Explore NoteNest's powerful features like collaboration, cloud storage, and cross-device syncing for seamless note management." />
            </Helmet>

            <FrontHeader />
            <>
                <div
                    className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed font-fira-sans"
                    style={{ backgroundSize: "cover" }}>
                    <div class="container">
                        <div className="d-flex flex-center flex-column flex-column-fluid">
                            <div className="rounded p-10 p-lg-20 me-auto ">
                                <div className="text-start">
                                    <h1 className="fs-2hx fs-lg-4x text-white" id="how-it-works" data-kt-scroll-offset="{default: 100, lg: 150}">
                                        Features
                                    </h1>
                                </div>

                            </div>
                        </div>
                        <div className="d-flex flex-center flex-column flex-column-fluid p-10 pt-0 mb-10">
                            <div className=" bg-body rounded shadow-sm p-10 p-lg-15 mx-auto ">
                                <div className="text-center">
                                    <h3 className="fs-2hx text-dark mb-5" id="how-it-works" data-kt-scroll-offset="{default: 100, lg: 150}">Everything in one place
                                    </h3>
                                    <div className="row align-items-center">
                                        <div className="col-lg-5 col-md-6 col-sm-12 mb-5">
                                            <div className="about_imgr wow fadeInDown animated" data-wow-delay="500ms" data-wow-duration="1500ms">
                                                <img
                                                    src="/assets/img/image-02.jpg" className="fullwidth" alt='EveryThingInOnePlace' />
                                            </div>
                                        </div>
                                        <div className="col-lg-7 col-md-6 col-sm-12 mb-5">
                                            <div className="fs-4 text-muted mb-5">NoteNest allows providers to create their notes, save them, download them, and upload other
                                                documents all into the system. Providers may choose to use NoteNest as the main place to
                                                keep their client files by uploading any other necessary documents to the portal. </div>
                                            <div className="fs-4 text-muted mb-5">Further, NoteNest has an integrated list of DSM-V diagnoses providers have access to</div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="d-flex flex-center flex-column flex-column-fluid p-10 pt-0 mb-10">
                            <div className=" bg-body rounded shadow-sm p-10 p-lg-15 mx-auto ">
                                <div className="text-center mb-5">
                                    <h3 className="fs-2hx text-dark mb-5" id="how-it-works" data-kt-scroll-offset="{default: 100, lg: 150}">Perfect for teletherapy
                                    </h3>
                                    <div className="row align-items-center">

                                        <div className="col-lg-7 col-md-6 col-sm-12 mb-5">
                                            <div className="fs-4 text-muted mb-5">With a growing number of providers doing remote/video sessions, NoteNest provides a way for
                                                them to keep notes in real time, without moving their attention away from the client or needing to
                                                look away/type. Providers just need to minimize the NoteNest window (in which case only the
                                                keywords will be visible) and place the window next to their video session. Providers just need
                                                to scroll down or maximize the window to see written text. This allows for more in-depth note
                                                keeping, so no content is forgotten and for notes to be ready as soon as the provider hangs up
                                                the call.
                                            </div>

                                        </div>
                                        <div className="col-lg-5 col-md-6 col-sm-12 mb-5">
                                            <div className="about_imgr wow fadeInDown animated" data-wow-delay="500ms" data-wow-duration="1500ms">
                                                <img
                                                    src="/assets/img/image-03.jpg" className="fullwidth" alt='Perfect for teletherapy' />
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="d-flex flex-center flex-column flex-column-fluid p-10 pt-0 mb-10">
                            <div className=" bg-body rounded shadow-sm p-10 p-lg-15 mx-auto ">
                                <div className="">
                                    <div className="text-center mb-5">
                                        <h3 className="fs-2hx text-dark mb-5" id="how-it-works" data-kt-scroll-offset="{default: 100, lg: 150}">Admin
                                        </h3>

                                        <div className="row align-items-center">
                                            <div className="col-lg-5 col-md-6 col-sm-12 mb-5">
                                                <div className="about_imgr wow fadeInDown animated" data-wow-delay="500ms" data-wow-duration="1500ms">
                                                    <img
                                                        src="/assets/img/image-04.png" className="fullwidth" alt='NoteNest understands' />
                                                </div>
                                            </div>

                                            <div className="col-lg-7 col-md-6 col-sm-12 mb-5">
                                                <div className="fs-4 text-muted mb-5">NoteNest is designed to meet the needs of all practice sizes, from private practice to companies
                                                    employing thousands of providers. NoteNest allows for various access levels including
                                                    administrators, supervisors, and clinicians.</div>
                                                <div className="fs-4 text-muted mb-5">Administrators can manage accounts, add/remove/activate/deactivate clients and clinicians, and
                                                    monitor everyone’s documentation.
                                                </div>
                                                <div className="fs-4 text-muted mb-5">Supervisors are able to manage their own caseload and monitor, review and sign off on the
                                                    notes and documentation of residents or other clinicians.
                                                </div>
                                                <div className="fs-4 text-muted mb-5">Clinicians need only worry about seeing their clients and managing their own caseload. They
                                                    can add/edit clients for themselves or allow administrators to do this for them.
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="d-flex flex-center flex-column flex-column-fluid p-10 pt-0 mb-10">
                            <div className=" bg-body rounded shadow-sm p-10 p-lg-15 mx-auto ">
                                <div className="">
                                    <div className="text-center">
                                        <h3 className="fs-2hx text-dark mb-5" id="how-it-works" data-kt-scroll-offset="{default: 100, lg: 150}">Customizable</h3>
                                        <div className="fs-4 text-muted mb-5">NoteNest understands that providers' needs vary and offers many options for customization to
                                            best meet the vast needs of users</div>
                                    </div>
                                    <div className="row align-items-center">
                                        <div className="col-lg-7 col-md-6 col-sm-12 pb-5">
                                            <ul className="fs-4 text-muted">
                                                <li className="mb-3"><p> As providers add a client to the portal, they are prompted to include the client’s preferred
                                                    name and pronouns. That information is integrated throughout every document, so that
                                                    the documents are more personalized.</p>
                                                </li>
                                                <li className="mb-3"><p>Providers can pick from three different text options for notes. After keywords are
                                                    selected, they can pick the version of the written note which they like best.</p>
                                                </li>
                                                <li className="mb-3"><p>Providers can pick from three different text options for notes. After keywords are
                                                    selected, they can pick the version of the written note which they like best.</p>
                                                </li>
                                                <li className="mb-3"><p>Every document has text boxes throughout, which providers can use if they want to
                                                    manually type some parts of the note.</p>
                                                </li>
                                                <li className="mb-3"><p>Providers can manually edit the entire note as well, making as many changes as they
                                                    want thanks to the “manual edit” option.</p></li>
                                            </ul>
                                        </div>
                                        <div className="col-lg-5 col-md-6 col-sm-12 pb-5">
                                            <div className="about_imgr wow fadeInDown animated" data-wow-delay="500ms" data-wow-duration="1500ms">
                                                <img
                                                    src="/assets/img/image-01.jpg" className="fullwidth" alt='NoteNest understands that providers' />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="d-flex flex-center flex-column flex-column-fluid p-10 pt-0 mb-10">
                            <div className=" bg-body rounded shadow-sm p-10 p-lg-15 mx-auto ">
                                <div className="text-center mb-5">
                                    <h3 className="fs-2hx text-dark mb-5" id="how-it-works" data-kt-scroll-offset="{default: 100, lg: 150}">Security
                                    </h3>

                                    <div className="row align-items-center">
                                        <div className="col-lg-5 col-md-6 col-sm-12 mb-5">
                                            <div className="about_imgr wow fadeInDown animated" data-wow-delay="500ms" data-wow-duration="1500ms">
                                                <img
                                                    src="/assets/img/image-05.png" className="width70" alt='Security' />
                                            </div>
                                        </div>
                                        <div className="col-lg-7 col-md-6 col-sm-12 mb-5">

                                            <div className="fs-4 text-muted mb-5">NoteNest maintains HIPAA standards as it relates to the storage of documentation. NoteNest
                                                uses AWS, some of the most secure servers trusted by healthcare institutions worldwide.</div>
                                            <div className="fs-4 text-muted mb-5">Further, a Business Associates Agreement (BAA) is integrated into the registration process. We
                                                strive to meet and surpass security standards so practices need not worry about security.
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

export default Features;