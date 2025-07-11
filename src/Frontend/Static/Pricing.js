import FrontHeader from '../FrontHeader';
import FrontFooter from '../FrontFooter';
import { Helmet } from 'react-helmet';

function Pricing() {
    return (
      <div className="d-flex flex-column flex-root font-fira-sans">
        <Helmet>
            <title>NoteNest Pricing - Flexible Plans to Suit Your Needs</title>
            <meta name="description" content="Discover affordable pricing plans for NoteNest, offering free and premium options to fit your note-taking and organizing needs." />
        </Helmet>

        <FrontHeader />
        <>
          <div className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed font-fira-sans">
            <div className="container">
              <div className="d-flex flex-center flex-column flex-column-fluid">
                <div className="rounded p-10 p-lg-20 me-auto ">
                  <div className="text-start">
                    <h1
                      className="fs-2hx fs-lg-4x text-white"
                      id="how-it-works"
                      data-kt-scroll-offset="{default: 100, lg: 150}"
                    >
                      Pricing
                    </h1>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-center flex-column flex-column-fluid p-10 pt-0 mb-17">
                <div
                  className=" bg-body rounded shadow-sm p-10 p-lg-15 mx-auto"
                  style={{ position: "relative" }}
                >
                  <img
                    src="./assets/media/promo/Get_a_30_day_free_trial-trans1.png"
                    className='offer_pricing'
                    alt='Get a 30 day free trial'
                    
                  />
                  <div className="d-flex flex-column">
                    <div className="mb-13 text-center">
                      <h1
                        className="fs-2hx fw-bolder text-dark mb-5"
                        id="pricing"
                        data-kt-scroll-offset="{default: 100, lg: 150}"
                      >
                        What does it include?{" "}
                      </h1>
                      <div className="text-muted fs-4">
                        Subscriptions to NoteNest, the Revolutionizing Documentation software, include access to and use of
                        <br />
                        Assessment Generator, treatment plan generator, progress
                        note generator, and discharge summary generator
                        <br />
                        Storage of all your documentation in a HIPPA compliant
                        platform
                      </div>
                    </div>
                    <div className="text-center" id="kt_pricing">
                      <div className="spacing"></div>
                      <div className="row g-10">
                        <div className="col-xl-4">
                          <div className="d-flex h-100 align-items-center">
                            <div className="w-100 d-flex flex-column flex-center rounded-3 bg-grey py-15 px-10 planTour">
                              <div className="mb-7 text-center">
                                <h1 className="text-dark mb-5 fw-boldest">
                                  Individual
                                </h1>
                                <div className="text-muted mb-5">
                                  Best Settings for Individual
                                </div>
                                <div className="text-center">
                                  <span className="mb-2 text-primary currency">
                                    $
                                  </span>
                                  <span
                                    className="fs-3x fw-bolder text-primary"
                                    data-kt-plan-price-month="99"
                                    data-kt-plan-price-annual="999"
                                  >
                                    29
                                  </span>
                                  <span
                                    className="fs-7 text-muted"
                                    data-kt-plan-price-month="Mon"
                                    data-kt-plan-price-annual="Ann"
                                  >
                                    / Month
                                  </span>
                                </div>
                              </div>
                              <div className="w-100 mb-10">
                                <div className="d-flex flex-stack mb-5 infobox">
                                  <span className="fs-6 text-gray-800 text-start pe-3">
                                    Includes unlimited access to
                                  </span>
                                </div>
                                <div className="d-flex flex-stack mb-5 infobox">
                                  <span className="fs-6 text-gray-800 text-start pe-3">
                                    Assessment generator{" "}
                                  </span>
                                  <span className="svg-icon svg-icon-1 svg-icon-success">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                    >
                                      <rect
                                        opacity="0.3"
                                        x="2"
                                        y="2"
                                        width="20"
                                        height="20"
                                        rx="10"
                                        fill="black"
                                      ></rect>
                                      <path
                                        d="M10.4343 12.4343L8.75 10.75C8.33579 10.3358 7.66421 10.3358 7.25 10.75C6.83579 11.1642 6.83579 11.8358 7.25 12.25L10.2929 15.2929C10.6834 15.6834 11.3166 15.6834 11.7071 15.2929L17.25 9.75C17.6642 9.33579 17.6642 8.66421 17.25 8.25C16.8358 7.83579 16.1642 7.83579 15.75 8.25L11.5657 12.4343C11.2533 12.7467 10.7467 12.7467 10.4343 12.4343Z"
                                        fill="black"
                                      ></path>
                                    </svg>
                                  </span>
                                </div>
                                <div className="d-flex flex-stack mb-5 infobox">
                                  <span className="fs-6 text-gray-800 text-start pe-3">
                                    Treatment plan generator
                                  </span>
                                  <span className="svg-icon svg-icon-1 svg-icon-success">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                    >
                                      <rect
                                        opacity="0.3"
                                        x="2"
                                        y="2"
                                        width="20"
                                        height="20"
                                        rx="10"
                                        fill="black"
                                      ></rect>
                                      <path
                                        d="M10.4343 12.4343L8.75 10.75C8.33579 10.3358 7.66421 10.3358 7.25 10.75C6.83579 11.1642 6.83579 11.8358 7.25 12.25L10.2929 15.2929C10.6834 15.6834 11.3166 15.6834 11.7071 15.2929L17.25 9.75C17.6642 9.33579 17.6642 8.66421 17.25 8.25C16.8358 7.83579 16.1642 7.83579 15.75 8.25L11.5657 12.4343C11.2533 12.7467 10.7467 12.7467 10.4343 12.4343Z"
                                        fill="black"
                                      ></path>
                                    </svg>
                                  </span>
                                </div>
                                <div className="d-flex flex-stack mb-5 infobox">
                                  <span className="fs-6 text-gray-800 text-start pe-3">
                                    Progress note generator{" "}
                                  </span>
                                  <span className="svg-icon svg-icon-1 svg-icon-success">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                    >
                                      <rect
                                        opacity="0.3"
                                        x="2"
                                        y="2"
                                        width="20"
                                        height="20"
                                        rx="10"
                                        fill="black"
                                      ></rect>
                                      <path
                                        d="M10.4343 12.4343L8.75 10.75C8.33579 10.3358 7.66421 10.3358 7.25 10.75C6.83579 11.1642 6.83579 11.8358 7.25 12.25L10.2929 15.2929C10.6834 15.6834 11.3166 15.6834 11.7071 15.2929L17.25 9.75C17.6642 9.33579 17.6642 8.66421 17.25 8.25C16.8358 7.83579 16.1642 7.83579 15.75 8.25L11.5657 12.4343C11.2533 12.7467 10.7467 12.7467 10.4343 12.4343Z"
                                        fill="black"
                                      ></path>
                                    </svg>
                                  </span>
                                </div>
                                <div className="d-flex flex-stack mb-5 infobox">
                                  <span className="fs-6 text-gray-800 text-start pe-3">
                                    Termination note generator
                                  </span>
                                  <span className="svg-icon svg-icon-1 svg-icon-success">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                    >
                                      <rect
                                        opacity="0.3"
                                        x="2"
                                        y="2"
                                        width="20"
                                        height="20"
                                        rx="10"
                                        fill="black"
                                      ></rect>
                                      <path
                                        d="M10.4343 12.4343L8.75 10.75C8.33579 10.3358 7.66421 10.3358 7.25 10.75C6.83579 11.1642 6.83579 11.8358 7.25 12.25L10.2929 15.2929C10.6834 15.6834 11.3166 15.6834 11.7071 15.2929L17.25 9.75C17.6642 9.33579 17.6642 8.66421 17.25 8.25C16.8358 7.83579 16.1642 7.83579 15.75 8.25L11.5657 12.4343C11.2533 12.7467 10.7467 12.7467 10.4343 12.4343Z"
                                        fill="black"
                                      ></path>
                                    </svg>
                                  </span>
                                </div>
                                <div className="d-flex flex-stack mb-5 infobox">
                                  <span className="fs-6 text-gray-800 text-start pe-3">
                                    HIPPA compliant, cloud based, note storage
                                  </span>
                                  <span className="svg-icon svg-icon-1 svg-icon-success">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                    >
                                      <rect
                                        opacity="0.3"
                                        x="2"
                                        y="2"
                                        width="20"
                                        height="20"
                                        rx="10"
                                        fill="black"
                                      ></rect>
                                      <path
                                        d="M10.4343 12.4343L8.75 10.75C8.33579 10.3358 7.66421 10.3358 7.25 10.75C6.83579 11.1642 6.83579 11.8358 7.25 12.25L10.2929 15.2929C10.6834 15.6834 11.3166 15.6834 11.7071 15.2929L17.25 9.75C17.6642 9.33579 17.6642 8.66421 17.25 8.25C16.8358 7.83579 16.1642 7.83579 15.75 8.25L11.5657 12.4343C11.2533 12.7467 10.7467 12.7467 10.4343 12.4343Z"
                                        fill="black"
                                      ></path>
                                    </svg>
                                  </span>
                                </div>
                                <div className="d-flex flex-stack mb-5 infobox">
                                  <span className="fs-6 text-gray-800 text-start pe-3">
                                    Unlimited customer services
                                  </span>
                                  <span className="svg-icon svg-icon-1 svg-icon-success">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                    >
                                      <rect
                                        opacity="0.3"
                                        x="2"
                                        y="2"
                                        width="20"
                                        height="20"
                                        rx="10"
                                        fill="black"
                                      ></rect>
                                      <path
                                        d="M10.4343 12.4343L8.75 10.75C8.33579 10.3358 7.66421 10.3358 7.25 10.75C6.83579 11.1642 6.83579 11.8358 7.25 12.25L10.2929 15.2929C10.6834 15.6834 11.3166 15.6834 11.7071 15.2929L17.25 9.75C17.6642 9.33579 17.6642 8.66421 17.25 8.25C16.8358 7.83579 16.1642 7.83579 15.75 8.25L11.5657 12.4343C11.2533 12.7467 10.7467 12.7467 10.4343 12.4343Z"
                                        fill="black"
                                      ></path>
                                    </svg>
                                  </span>
                                </div>
                                <div className="d-flex flex-stack mb-5 infobox">
                                  <span className="fs-6 text-gray-800 text-start pe-3">
                                    Cancel anytime
                                  </span>
                                  <span className="svg-icon svg-icon-1 svg-icon-success">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                    >
                                      <rect
                                        opacity="0.3"
                                        x="2"
                                        y="2"
                                        width="20"
                                        height="20"
                                        rx="10"
                                        fill="black"
                                      ></rect>
                                      <path
                                        d="M10.4343 12.4343L8.75 10.75C8.33579 10.3358 7.66421 10.3358 7.25 10.75C6.83579 11.1642 6.83579 11.8358 7.25 12.25L10.2929 15.2929C10.6834 15.6834 11.3166 15.6834 11.7071 15.2929L17.25 9.75C17.6642 9.33579 17.6642 8.66421 17.25 8.25C16.8358 7.83579 16.1642 7.83579 15.75 8.25L11.5657 12.4343C11.2533 12.7467 10.7467 12.7467 10.4343 12.4343Z"
                                        fill="black"
                                      ></path>
                                    </svg>
                                  </span>
                                </div>
                              </div>
                              <a className="btn btn-primary" href="/register">
                                Select
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4">
                          <div className="d-flex h-100 align-items-center">
                            <div className="w-100 d-flex flex-column flex-center rounded-3 bg-primary py-20 px-10">
                              <div className="mb-7 text-center">
                                <h1 className="text-white mb-5 fw-boldest">
                                  Small group
                                </h1>
                                <div className="text-white opacity-75 mb-5">
                                  Best Settings for Small group
                                </div>
                                <div className="text-center">
                                  <span className="mb-2 text-white currency">
                                    $
                                  </span>
                                  <span
                                    className="fs-3x fw-bolder text-white"
                                    data-kt-plan-price-month="199"
                                    data-kt-plan-price-annual="1999"
                                  >
                                    12-22
                                  </span>
                                  <span
                                    className="fs-7 text-white opacity-75"
                                    data-kt-plan-price-month="Mon"
                                    data-kt-plan-price-annual="Ann"
                                  >
                                    / Month
                                  </span>
                                </div>
                              </div>
                              <div className="w-100 mb-10">
                                <div className="d-flex flex-stack mb-5 infobox">
                                  <span className="fs-6 text-white opacity-75 text-start pe-3">
                                    2-10
                                    <br />
                                    <b>$22/month/person</b>
                                  </span>
                                </div>
                                <div className="d-flex flex-stack mb-5 infobox">
                                  <span className="fs-6 text-white opacity-75 text-start pe-3">
                                    11-25
                                    <br />
                                    <b>$16/month/person</b>
                                  </span>
                                </div>
                                <div className="d-flex flex-stack mb-5 infobox">
                                  <span className="fs-6 text-white opacity-75 text-start pe-3">
                                    26-60
                                    <br />
                                    <b>$12/month/person</b>
                                  </span>
                                </div>
                                <div className="d-flex flex-stack mb-5 infobox">
                                  <span className="fs-6 text-white opacity-75 text-start pe-3">
                                    All features from individual membership,
                                    plus
                                  </span>
                                  <span className="svg-icon svg-icon-1 svg-icon-white">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                    >
                                      <rect
                                        opacity="0.3"
                                        x="2"
                                        y="2"
                                        width="20"
                                        height="20"
                                        rx="10"
                                        fill="black"
                                      ></rect>
                                      <path
                                        d="M10.4343 12.4343L8.75 10.75C8.33579 10.3358 7.66421 10.3358 7.25 10.75C6.83579 11.1642 6.83579 11.8358 7.25 12.25L10.2929 15.2929C10.6834 15.6834 11.3166 15.6834 11.7071 15.2929L17.25 9.75C17.6642 9.33579 17.6642 8.66421 17.25 8.25C16.8358 7.83579 16.1642 7.83579 15.75 8.25L11.5657 12.4343C11.2533 12.7467 10.7467 12.7467 10.4343 12.4343Z"
                                        fill="black"
                                      ></path>
                                    </svg>
                                  </span>
                                </div>
                                <div className="d-flex flex-stack mb-5 infobox">
                                  <span className="fs-6 text-white opacity-75 text-start pe-3">
                                    Everyone has access to a private accounts
                                  </span>
                                  <span className="svg-icon svg-icon-1 svg-icon-white">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                    >
                                      <rect
                                        opacity="0.3"
                                        x="2"
                                        y="2"
                                        width="20"
                                        height="20"
                                        rx="10"
                                        fill="black"
                                      ></rect>
                                      <path
                                        d="M10.4343 12.4343L8.75 10.75C8.33579 10.3358 7.66421 10.3358 7.25 10.75C6.83579 11.1642 6.83579 11.8358 7.25 12.25L10.2929 15.2929C10.6834 15.6834 11.3166 15.6834 11.7071 15.2929L17.25 9.75C17.6642 9.33579 17.6642 8.66421 17.25 8.25C16.8358 7.83579 16.1642 7.83579 15.75 8.25L11.5657 12.4343C11.2533 12.7467 10.7467 12.7467 10.4343 12.4343Z"
                                        fill="black"
                                      ></path>
                                    </svg>
                                  </span>
                                </div>
                                <div className="d-flex flex-stack mb-5 infobox">
                                  <span className="fs-6 text-white opacity-75 text-start pe-3">
                                    Supervisors have access to all accounts,
                                    including sign-off capabilities for
                                    residents/interns.
                                  </span>
                                  <span className="svg-icon svg-icon-1 svg-icon-white">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                    >
                                      <rect
                                        opacity="0.3"
                                        x="2"
                                        y="2"
                                        width="20"
                                        height="20"
                                        rx="10"
                                        fill="black"
                                      ></rect>
                                      <path
                                        d="M10.4343 12.4343L8.75 10.75C8.33579 10.3358 7.66421 10.3358 7.25 10.75C6.83579 11.1642 6.83579 11.8358 7.25 12.25L10.2929 15.2929C10.6834 15.6834 11.3166 15.6834 11.7071 15.2929L17.25 9.75C17.6642 9.33579 17.6642 8.66421 17.25 8.25C16.8358 7.83579 16.1642 7.83579 15.75 8.25L11.5657 12.4343C11.2533 12.7467 10.7467 12.7467 10.4343 12.4343Z"
                                        fill="black"
                                      ></path>
                                    </svg>
                                  </span>
                                </div>
                                <div className="d-flex flex-stack mb-5 infobox">
                                  <span className="fs-6 text-white opacity-75 text-start pe-3">
                                    Add and remove providers anytime
                                  </span>
                                  <span className="svg-icon svg-icon-1 svg-icon-white">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                    >
                                      <rect
                                        opacity="0.3"
                                        x="2"
                                        y="2"
                                        width="20"
                                        height="20"
                                        rx="10"
                                        fill="black"
                                      ></rect>
                                      <path
                                        d="M10.4343 12.4343L8.75 10.75C8.33579 10.3358 7.66421 10.3358 7.25 10.75C6.83579 11.1642 6.83579 11.8358 7.25 12.25L10.2929 15.2929C10.6834 15.6834 11.3166 15.6834 11.7071 15.2929L17.25 9.75C17.6642 9.33579 17.6642 8.66421 17.25 8.25C16.8358 7.83579 16.1642 7.83579 15.75 8.25L11.5657 12.4343C11.2533 12.7467 10.7467 12.7467 10.4343 12.4343Z"
                                        fill="black"
                                      ></path>
                                    </svg>
                                  </span>
                                </div>
                              </div>
                              <a
                                className="btn btn-color-primary btn-active-light-primary btn-light"
                                href="/register"
                              >
                                Select
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4">
                          <div className="d-flex h-100 align-items-center">
                            <div className="w-100 d-flex flex-column flex-center rounded-3 bg-grey py-15 px-10">
                              <div className="mb-7 text-center">
                                <h1 className="text-dark mb-5 fw-boldest">
                                  Large Group/Corporation{" "}
                                </h1>
                                <div className="text-muted mb-5">
                                  Best Settings for Large Group/Corporation{" "}
                                </div>
                                <div className="text-center"></div>
                              </div>
                              <div className="w-100 mb-10">
                                <div className="d-flex flex-stack mb-5 infobox">
                                  <span className="fs-6 text-gray-800 text-start pe-3">
                                    For groups of 61+ or for a customizable
                                    platform.
                                  </span>
                                </div>
                                <div className="d-flex flex-stack mb-5 infobox">
                                  <span className="fs-6 text-gray-800 text-start pe-3">
                                    Contact us for rates and to discuss how we
                                    can customize this platform to fit your
                                    specific needs.
                                  </span>
                                </div>
                              </div>
                              <a href="/register" className="btn btn-primary">
                                Select
                              </a>
                            </div>
                          </div>
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

export default Pricing;