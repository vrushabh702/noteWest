import FrontHeader from '../FrontHeader';
import FrontFooter from '../FrontFooter';
import { Helmet } from 'react-helmet';

function About() {
    return (
        <div className="d-flex flex-column flex-root font-fira-sans">
            <Helmet>
                <title>About NoteNest - Your Go-To Solution for Note Organization</title>
                <meta name="description" content="Learn about NoteNest's mission to help you organize, manage, and collaborate on notes easily and effectively with our user-friendly platform." />
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
                        About Us
                        </h1>
                    </div>
                    
                    </div>
                </div>
                <div className="d-flex flex-center flex-column flex-column-fluid p-10 pt-0 mb-17">
                    <div className=" bg-body rounded shadow-sm p-10 p-lg-15 mx-auto ">
                        <div className="row align-items-center">
                        <div className="col-lg-5 col-md-6 col-sm-12 pb-5">
                            <div className="about_imgr wow fadeInDown animated" data-wow-delay="500ms" data-wow-duration="1500ms">
                            <img
                                src="/assets/img/image-07.jpg" className="fullwidth" alt="AboutImage" />
                            </div>
                        </div>
                        <div className="col-lg-7 col-md-6 col-sm-12 pb-5">
                            <div className="text-center">
                            <div className="fs-4 text-muted mb-5">NoteNest was created in 2017 by Chloe Arditi, a Licensed Professional Counselor from
                                Richmond, VA and made available to the public in 2023.</div>
                            <div className="fs-4 text-muted mb-5">Chloe’s frustrations and burnout relating to documentation lead her to test various products on
                                the market, paying hundreds of dollars, and ending up unsatisfied with what was available. She
                                decided that the only way to correctly meet her documentation needs was to build something
                                herself.
                                </div>
                            <div className="fs-4 text-muted mb-5">In 2021, she found a small team of developers who understood her vision and were able to
                                make it a reality. Thanks to the unwavering support of her family and the hard work of this
                                development team, NoteNest became a reality.
                                </div>
                            <div className="fs-4 text-muted mb-5">Chloe continues to use the product now and is able to do her notes in seconds every day. She
                                reports “I got my life back,” and has even had her notes subpoenaed for a court case. The notes
                                were so detailed that the opposing party had no comments about her documentation.
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

export default About;