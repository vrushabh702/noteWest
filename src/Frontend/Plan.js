import { Link } from "react-router-dom"
import { checkAuth } from "../Back/pages/Session";
import { authPrefix, Register } from "../Routes/RouterPage"

function Plan() {
    const checkUser = checkAuth()
    const RedirectLink = checkUser ? authPrefix : Register.link;    
    return (
        <div className="mt-sm-n20">            
            {/*begin::Curve top*/}
            <div className="landing-curve landing-dark-color">
                <svg viewBox="15 -1 1470 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 48C4.93573 47.6644 8.85984 47.3311 12.7725 47H1489.16C1493.1 47.3311 1497.04 47.6644 1501 48V47H1489.16C914.668 -1.34764 587.282 -1.61174 12.7725 47H1V48Z" fill="currentColor" />
                </svg>
            </div>
            {/*end::Curve top*/}
            {/*begin::Wrapper*/}
            <div className="py-20 landing-dark-bg">
                {/*begin::Container*/}
                <div className="container">
                    {/*begin::Plans*/}
                    <div className="d-flex flex-column container pt-lg-20">
                        {/*begin::Heading*/}
                        <div className="mb-13 text-center">
                            <h1 className="fs-2hx fw-bolder text-white mb-5" id="pricing" data-kt-scroll-offset="{default: 100, lg: 150}">What does it include? </h1>
                            <div className="text-white fs-5">Subscriptions to NoteNest, the Revolutionizing Documentation software, include access to and use of<br />
                                Assessment Generator, treatment plan generator, progress note generator, and discharge summary generator<br />
                                Storage of all your documentation in a HIPPA compliant platform
                            </div>
                        </div>
                        {/*end::Heading*/}
                        {/*begin::Pricing*/}
                        <div className="text-center" id="kt_pricing">
                            <div className="spacing" />
                            {/*begin::Nav group*/}
                            {/* <div class="nav-group landing-dark-bg d-inline-flex mb-15" data-kt-buttons="true" style="border: 1px dashed #2B4666;">
                                <a href="#" class="btn btn-color-gray-600 btn-active btn-active-success px-6 py-3 me-2 active" data-kt-plan="month">Monthly</a>
                                <a href="#" class="btn btn-color-gray-600 btn-active btn-active-success px-6 py-3" data-kt-plan="annual">Annual</a>
                            </div> */}
                            {/*end::Nav group*/}
                            {/*begin::Row*/}
                            <div className="row g-10">
                                {/*begin::Col*/}
                                <div className="col-xl-4">
                                    <div className="d-flex h-100 align-items-center">
                                        {/*begin::Option*/}
                                        <div className="w-100 d-flex flex-column flex-center rounded-3 bg-body py-15 px-10 planTour">
                                            {/*begin::Heading*/}
                                            <div className="mb-7 text-center">
                                                {/*begin::Title*/}
                                                
                                                <h1 className="text-dark mb-5 fw-boldest">Individual</h1>
                                                {/*end::Title*/}
                                                {/*begin::Description*/}
                                                <div className="text-gray-400 mb-5">Best Settings for Individual</div>
                                                {/*end::Description*/}
                                                {/*begin::Price*/}
                                                <div className="text-center">
                                                    <span className="mb-2 text-primary currency">$</span>
                                                    <span className="fs-3x fw-bolder text-primary" data-kt-plan-price-month={99} data-kt-plan-price-annual={999}>29</span>
                                                    <span className="fs-7 opacity-50" data-kt-plan-price-month="Mon" data-kt-plan-price-annual="Ann">/ Month</span>
                                                </div>
                                                {/*end::Price*/}
                                            </div>
                                            {/*end::Heading*/}
                                            {/*begin::Features*/}
                                            <div className="w-100 mb-10">
                                                {/*begin::Item*/}
                                                <div className="d-flex flex-stack mb-5 infobox">
                                                    <span className="fs-6 text-gray-800 text-start pe-3">Includes unlimited access to</span>
                                                    {/*begin::Svg Icon | path: icons/duotune/general/gen043.svg*/}
                                                    {/* 	<span class="svg-icon svg-icon-1 svg-icon-success">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                            <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="black" />
                                                            <path d="M10.4343 12.4343L8.75 10.75C8.33579 10.3358 7.66421 10.3358 7.25 10.75C6.83579 11.1642 6.83579 11.8358 7.25 12.25L10.2929 15.2929C10.6834 15.6834 11.3166 15.6834 11.7071 15.2929L17.25 9.75C17.6642 9.33579 17.6642 8.66421 17.25 8.25C16.8358 7.83579 16.1642 7.83579 15.75 8.25L11.5657 12.4343C11.2533 12.7467 10.7467 12.7467 10.4343 12.4343Z" fill="black" />
                                                        </svg>
                                                    </span> */}
                                                    {/*end::Svg Icon*/}
                                                </div>
                                                {/*end::Item*/}
                                                {/*begin::Item*/}
                                                <div className="d-flex flex-stack mb-5 infobox">
                                                    <span className="fs-6 text-gray-800 text-start pe-3">Assessment generator </span>
                                                    {/*begin::Svg Icon | path: icons/duotune/general/gen043.svg*/}
                                                    <span className="svg-icon svg-icon-1 svg-icon-success">
                          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                            <rect opacity="0.3" x={2} y={2} width={20} height={20} rx={10} fill="black" />
                            <path d="M10.4343 12.4343L8.75 10.75C8.33579 10.3358 7.66421 10.3358 7.25 10.75C6.83579 11.1642 6.83579 11.8358 7.25 12.25L10.2929 15.2929C10.6834 15.6834 11.3166 15.6834 11.7071 15.2929L17.25 9.75C17.6642 9.33579 17.6642 8.66421 17.25 8.25C16.8358 7.83579 16.1642 7.83579 15.75 8.25L11.5657 12.4343C11.2533 12.7467 10.7467 12.7467 10.4343 12.4343Z" fill="black" />
                          </svg>
                        </span>
                                                    {/*end::Svg Icon*/}
                                                </div>
                                                {/*end::Item*/}
                                                {/*begin::Item*/}
                                                <div className="d-flex flex-stack mb-5 infobox">
                                                    <span className="fs-6 text-gray-800 text-start pe-3">Treatment plan generator</span>
                                                    {/*begin::Svg Icon | path: icons/duotune/general/gen043.svg*/}
                                                    <span className="svg-icon svg-icon-1 svg-icon-success">
                          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                            <rect opacity="0.3" x={2} y={2} width={20} height={20} rx={10} fill="black" />
                            <path d="M10.4343 12.4343L8.75 10.75C8.33579 10.3358 7.66421 10.3358 7.25 10.75C6.83579 11.1642 6.83579 11.8358 7.25 12.25L10.2929 15.2929C10.6834 15.6834 11.3166 15.6834 11.7071 15.2929L17.25 9.75C17.6642 9.33579 17.6642 8.66421 17.25 8.25C16.8358 7.83579 16.1642 7.83579 15.75 8.25L11.5657 12.4343C11.2533 12.7467 10.7467 12.7467 10.4343 12.4343Z" fill="black" />
                          </svg>
                        </span>
                                                    {/*end::Svg Icon*/}
                                                </div>
                                                {/*end::Item*/}
                                                {/*begin::Item*/}
                                                <div className="d-flex flex-stack mb-5 infobox">
                                                    <span className="fs-6 text-gray-800 text-start pe-3">Progress note generator </span>
                                                    {/*begin::Svg Icon | path: icons/duotune/general/gen043.svg*/}
                                                    <span className="svg-icon svg-icon-1 svg-icon-success">
                          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                            <rect opacity="0.3" x={2} y={2} width={20} height={20} rx={10} fill="black" />
                            <path d="M10.4343 12.4343L8.75 10.75C8.33579 10.3358 7.66421 10.3358 7.25 10.75C6.83579 11.1642 6.83579 11.8358 7.25 12.25L10.2929 15.2929C10.6834 15.6834 11.3166 15.6834 11.7071 15.2929L17.25 9.75C17.6642 9.33579 17.6642 8.66421 17.25 8.25C16.8358 7.83579 16.1642 7.83579 15.75 8.25L11.5657 12.4343C11.2533 12.7467 10.7467 12.7467 10.4343 12.4343Z" fill="black" />
                          </svg>
                        </span>
                                                    {/*end::Svg Icon*/}
                                                </div>
                                                {/*end::Item*/}
                                                {/*begin::Item*/}
                                                <div className="d-flex flex-stack mb-5 infobox">
                                                    <span className="fs-6 text-gray-800 text-start pe-3">Termination note generator</span>
                                                    {/*begin::Svg Icon | path: icons/duotune/general/gen043.svg*/}
                                                    <span className="svg-icon svg-icon-1 svg-icon-success">
                          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                            <rect opacity="0.3" x={2} y={2} width={20} height={20} rx={10} fill="black" />
                            <path d="M10.4343 12.4343L8.75 10.75C8.33579 10.3358 7.66421 10.3358 7.25 10.75C6.83579 11.1642 6.83579 11.8358 7.25 12.25L10.2929 15.2929C10.6834 15.6834 11.3166 15.6834 11.7071 15.2929L17.25 9.75C17.6642 9.33579 17.6642 8.66421 17.25 8.25C16.8358 7.83579 16.1642 7.83579 15.75 8.25L11.5657 12.4343C11.2533 12.7467 10.7467 12.7467 10.4343 12.4343Z" fill="black" />
                          </svg>
                        </span>
                                                    {/*end::Svg Icon*/}
                                                </div>
                                                {/*end::Item*/}
                                                {/*begin::Item*/}
                                                <div className="d-flex flex-stack mb-5 infobox">
                                                    <span className="fs-6 text-gray-800 text-start pe-3">HIPPA compliant, cloud based, note storage</span>
                                                    {/*begin::Svg Icon | path: icons/duotune/general/gen043.svg*/}
                                                    <span className="svg-icon svg-icon-1 svg-icon-success">
                          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                            <rect opacity="0.3" x={2} y={2} width={20} height={20} rx={10} fill="black" />
                            <path d="M10.4343 12.4343L8.75 10.75C8.33579 10.3358 7.66421 10.3358 7.25 10.75C6.83579 11.1642 6.83579 11.8358 7.25 12.25L10.2929 15.2929C10.6834 15.6834 11.3166 15.6834 11.7071 15.2929L17.25 9.75C17.6642 9.33579 17.6642 8.66421 17.25 8.25C16.8358 7.83579 16.1642 7.83579 15.75 8.25L11.5657 12.4343C11.2533 12.7467 10.7467 12.7467 10.4343 12.4343Z" fill="black" />
                          </svg>
                        </span>
                                                    {/*end::Svg Icon*/}
                                                </div>
                                                {/*end::Item*/}
                                                {/*begin::Item*/}
                                                <div className="d-flex flex-stack mb-5 infobox">
                                                    <span className="fs-6 text-gray-800 text-start pe-3">Unlimited customer services</span>
                                                    {/*begin::Svg Icon | path: icons/duotune/general/gen043.svg*/}
                                                    <span className="svg-icon svg-icon-1 svg-icon-success">
                          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                            <rect opacity="0.3" x={2} y={2} width={20} height={20} rx={10} fill="black" />
                            <path d="M10.4343 12.4343L8.75 10.75C8.33579 10.3358 7.66421 10.3358 7.25 10.75C6.83579 11.1642 6.83579 11.8358 7.25 12.25L10.2929 15.2929C10.6834 15.6834 11.3166 15.6834 11.7071 15.2929L17.25 9.75C17.6642 9.33579 17.6642 8.66421 17.25 8.25C16.8358 7.83579 16.1642 7.83579 15.75 8.25L11.5657 12.4343C11.2533 12.7467 10.7467 12.7467 10.4343 12.4343Z" fill="black" />
                          </svg>
                        </span>
                                                    {/*end::Svg Icon*/}
                                                </div>
                                                {/*end::Item*/}
                                                {/*begin::Item*/}
                                                <div className="d-flex flex-stack mb-5 infobox">
                                                    <span className="fs-6 text-gray-800 text-start pe-3">Cancel anytime</span>
                                                    {/*begin::Svg Icon | path: icons/duotune/general/gen043.svg*/}
                                                    <span className="svg-icon svg-icon-1 svg-icon-success">
                          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                            <rect opacity="0.3" x={2} y={2} width={20} height={20} rx={10} fill="black" />
                            <path d="M10.4343 12.4343L8.75 10.75C8.33579 10.3358 7.66421 10.3358 7.25 10.75C6.83579 11.1642 6.83579 11.8358 7.25 12.25L10.2929 15.2929C10.6834 15.6834 11.3166 15.6834 11.7071 15.2929L17.25 9.75C17.6642 9.33579 17.6642 8.66421 17.25 8.25C16.8358 7.83579 16.1642 7.83579 15.75 8.25L11.5657 12.4343C11.2533 12.7467 10.7467 12.7467 10.4343 12.4343Z" fill="black" />
                          </svg>
                        </span>
                                                    {/*end::Svg Icon*/}
                                                </div>
                                                {/*end::Item*/}
                                            </div>
                                            {/*end::Features*/}
                                            {/*begin::Select*/}
                                            <Link to={RedirectLink} className="btn btn-primary">Select</Link>
                                            {/*end::Select*/}
                                        </div>
                                        {/*end::Option*/}
                                    </div>
                                </div>
                                {/*end::Col*/}
                                {/*begin::Col*/}
                                <div className="col-xl-4">
                                    <div className="d-flex h-100 align-items-center">
                                        {/*begin::Option*/}
                                        <div className="w-100 d-flex flex-column flex-center rounded-3 bg-primary py-20 px-10">
                                            {/*begin::Heading*/}
                                            <div className="mb-7 text-center">
                                                {/*begin::Title*/}
                                                <h1 className="text-white mb-5 fw-boldest">Small group</h1>
                                                {/*end::Title*/}
                                                {/*begin::Description*/}
                                                <div className="text-white opacity-75 mb-5">Best Settings for Small group</div>
                                                {/*end::Description*/}
                                                {/*begin::Price*/}
                                                <div className="text-center">
                                                    <span className="mb-2 text-white currency">$</span>
                                                    <span className="fs-3x fw-bolder text-white" data-kt-plan-price-month={199} data-kt-plan-price-annual={1999}>12-22</span>
                                                    <span className="fs-7 text-white opacity-75" data-kt-plan-price-month="Mon" data-kt-plan-price-annual="Ann">/ Month</span>
                                                </div>
                                                {/*end::Price*/}
                                            </div>
                                            {/*end::Heading*/}
                                            {/*begin::Features*/}
                                            <div className="w-100 mb-10">
                                                {/*begin::Item*/}
                                                <div className="d-flex flex-stack mb-5 infobox">
                                                    <span className="fs-6 text-white opacity-75 text-start pe-3">2-10<br /><b>$22/month/person</b></span>
                                                    {/*begin::Svg Icon | path: icons/duotune/general/gen043.svg*/}
                                                    {/* <span class="svg-icon svg-icon-1 svg-icon-white">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                            <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="black" />
                                                            <path d="M10.4343 12.4343L8.75 10.75C8.33579 10.3358 7.66421 10.3358 7.25 10.75C6.83579 11.1642 6.83579 11.8358 7.25 12.25L10.2929 15.2929C10.6834 15.6834 11.3166 15.6834 11.7071 15.2929L17.25 9.75C17.6642 9.33579 17.6642 8.66421 17.25 8.25C16.8358 7.83579 16.1642 7.83579 15.75 8.25L11.5657 12.4343C11.2533 12.7467 10.7467 12.7467 10.4343 12.4343Z" fill="black" />
                                                        </svg>
                                                    </span> */}
                                                    {/*end::Svg Icon*/}
                                                </div>
                                                {/*end::Item*/}
                                                {/*begin::Item*/}
                                                <div className="d-flex flex-stack mb-5 infobox">
                                                    <span className="fs-6 text-white opacity-75 text-start pe-3">11-25<br /><b>$16/month/person</b></span>
                                                    {/*begin::Svg Icon | path: icons/duotune/general/gen043.svg*/}
                                                    {/* <span class="svg-icon svg-icon-1 svg-icon-white">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                            <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="black" />
                                                            <path d="M10.4343 12.4343L8.75 10.75C8.33579 10.3358 7.66421 10.3358 7.25 10.75C6.83579 11.1642 6.83579 11.8358 7.25 12.25L10.2929 15.2929C10.6834 15.6834 11.3166 15.6834 11.7071 15.2929L17.25 9.75C17.6642 9.33579 17.6642 8.66421 17.25 8.25C16.8358 7.83579 16.1642 7.83579 15.75 8.25L11.5657 12.4343C11.2533 12.7467 10.7467 12.7467 10.4343 12.4343Z" fill="black" />
                                                        </svg>
                                                    </span> */}
                                                    {/*end::Svg Icon*/}
                                                </div>
                                                {/*end::Item*/}
                                                {/*begin::Item*/}
                                                <div className="d-flex flex-stack mb-5 infobox">
                                                    <span className="fs-6 text-white opacity-75 text-start pe-3">26-60<br /><b>$12/month/person</b></span>
                                                    {/*begin::Svg Icon | path: icons/duotune/general/gen043.svg*/}
                                                    {/* <span class="svg-icon svg-icon-1 svg-icon-white">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                            <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="black" />
                                                            <path d="M10.4343 12.4343L8.75 10.75C8.33579 10.3358 7.66421 10.3358 7.25 10.75C6.83579 11.1642 6.83579 11.8358 7.25 12.25L10.2929 15.2929C10.6834 15.6834 11.3166 15.6834 11.7071 15.2929L17.25 9.75C17.6642 9.33579 17.6642 8.66421 17.25 8.25C16.8358 7.83579 16.1642 7.83579 15.75 8.25L11.5657 12.4343C11.2533 12.7467 10.7467 12.7467 10.4343 12.4343Z" fill="black" />
                                                        </svg>
                                                    </span> */}
                                                    {/*end::Svg Icon*/}
                                                </div>
                                                {/*end::Item*/}
                                                {/*begin::Item*/}
                                                <div className="d-flex flex-stack mb-5 infobox">
                                                    <span className="fs-6 text-white opacity-75 text-start pe-3">All features from individual membership, plus</span>
                                                    {/*begin::Svg Icon | path: icons/duotune/general/gen043.svg*/}
                                                    <span className="svg-icon svg-icon-1 svg-icon-white">
                          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                            <rect opacity="0.3" x={2} y={2} width={20} height={20} rx={10} fill="black" />
                            <path d="M10.4343 12.4343L8.75 10.75C8.33579 10.3358 7.66421 10.3358 7.25 10.75C6.83579 11.1642 6.83579 11.8358 7.25 12.25L10.2929 15.2929C10.6834 15.6834 11.3166 15.6834 11.7071 15.2929L17.25 9.75C17.6642 9.33579 17.6642 8.66421 17.25 8.25C16.8358 7.83579 16.1642 7.83579 15.75 8.25L11.5657 12.4343C11.2533 12.7467 10.7467 12.7467 10.4343 12.4343Z" fill="black" />
                          </svg>
                        </span>
                                                    {/*end::Svg Icon*/}
                                                </div>
                                                {/*end::Item*/}
                                                {/*begin::Item*/}
                                                <div className="d-flex flex-stack mb-5 infobox">
                                                    <span className="fs-6 text-white opacity-75 text-start pe-3">Everyone has access to a private accounts</span>
                                                    {/*begin::Svg Icon | path: icons/duotune/general/gen043.svg*/}
                                                    <span className="svg-icon svg-icon-1 svg-icon-white">
                          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                            <rect opacity="0.3" x={2} y={2} width={20} height={20} rx={10} fill="black" />
                            <path d="M10.4343 12.4343L8.75 10.75C8.33579 10.3358 7.66421 10.3358 7.25 10.75C6.83579 11.1642 6.83579 11.8358 7.25 12.25L10.2929 15.2929C10.6834 15.6834 11.3166 15.6834 11.7071 15.2929L17.25 9.75C17.6642 9.33579 17.6642 8.66421 17.25 8.25C16.8358 7.83579 16.1642 7.83579 15.75 8.25L11.5657 12.4343C11.2533 12.7467 10.7467 12.7467 10.4343 12.4343Z" fill="black" />
                          </svg>
                        </span>
                                                    {/*end::Svg Icon*/}
                                                </div>
                                                {/*end::Item*/}
                                                {/*begin::Item*/}
                                                <div className="d-flex flex-stack mb-5 infobox">
                                                    <span className="fs-6 text-white opacity-75 text-start pe-3">Supervisors have access to all accounts, including sign-off capabilities for residents/interns.</span>
                                                    {/*begin::Svg Icon | path: icons/duotune/general/gen043.svg*/}
                                                    <span className="svg-icon svg-icon-1 svg-icon-white">
                          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                            <rect opacity="0.3" x={2} y={2} width={20} height={20} rx={10} fill="black" />
                            <path d="M10.4343 12.4343L8.75 10.75C8.33579 10.3358 7.66421 10.3358 7.25 10.75C6.83579 11.1642 6.83579 11.8358 7.25 12.25L10.2929 15.2929C10.6834 15.6834 11.3166 15.6834 11.7071 15.2929L17.25 9.75C17.6642 9.33579 17.6642 8.66421 17.25 8.25C16.8358 7.83579 16.1642 7.83579 15.75 8.25L11.5657 12.4343C11.2533 12.7467 10.7467 12.7467 10.4343 12.4343Z" fill="black" />
                          </svg>
                        </span>
                                                    {/*end::Svg Icon*/}
                                                </div>
                                                {/*end::Item*/}
                                                {/*begin::Item*/}
                                                <div className="d-flex flex-stack mb-5 infobox">
                                                    <span className="fs-6 text-white opacity-75 text-start pe-3">Add and remove providers anytime</span>
                                                    {/*begin::Svg Icon | path: icons/duotune/general/gen043.svg*/}
                                                    <span className="svg-icon svg-icon-1 svg-icon-white">
                          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                            <rect opacity="0.3" x={2} y={2} width={20} height={20} rx={10} fill="black" />
                            <path d="M10.4343 12.4343L8.75 10.75C8.33579 10.3358 7.66421 10.3358 7.25 10.75C6.83579 11.1642 6.83579 11.8358 7.25 12.25L10.2929 15.2929C10.6834 15.6834 11.3166 15.6834 11.7071 15.2929L17.25 9.75C17.6642 9.33579 17.6642 8.66421 17.25 8.25C16.8358 7.83579 16.1642 7.83579 15.75 8.25L11.5657 12.4343C11.2533 12.7467 10.7467 12.7467 10.4343 12.4343Z" fill="black" />
                          </svg>
                        </span>
                                                    {/*end::Svg Icon*/}
                                                </div>
                                                {/*end::Item*/}
                                            </div>
                                            {/*end::Features*/}
                                            {/*begin::Select*/}                                                                                    
                                            <Link to={RedirectLink} className="btn btn-color-primary btn-active-light-primary btn-light">Select</Link>
                                            {/*end::Select*/}
                                        </div>
                                        {/*end::Option*/}
                                    </div>
                                </div>
                                {/*end::Col*/}
                                {/*begin::Col*/}
                                <div className="col-xl-4">
                                    <div className="d-flex h-100 align-items-center">
                                        {/*begin::Option*/}
                                        <div className="w-100 d-flex flex-column flex-center rounded-3 bg-body py-15 px-10">
                                            {/*begin::Heading*/}
                                            <div className="mb-7 text-center">
                                                {/*begin::Title*/}
                                                <h1 className="text-dark mb-5 fw-boldest">Large Group/Corporation </h1>
                                                {/*end::Title*/}
                                                {/*begin::Description*/}
                                                <div className="text-gray-400 mb-5">Best Settings for Large Group/Corporation </div>
                                                {/*end::Description*/}
                                                {/*begin::Price*/}
                                                <div className="text-center">
                                                    {/* <span class="mb-2 text-primary currency"></span> */}
                                                    {/* <span class="fs-2x fw-bolder text-primary" data-kt-plan-price-month="999" data-kt-plan-price-annual="9999" data-kt-scroll-toggle="true" data-kt-drawer-dismiss="true"><a href="#contact">Contact Us</a></span> */}
                                                    {/* <span class="fs-7 opacity-50" data-kt-plan-price-month="Mon" data-kt-plan-price-annual="Ann">/ Mon</span> */}
                                                </div>
                                                {/*end::Price*/}
                                            </div>
                                            {/*end::Heading*/}
                                            {/*begin::Features*/}
                                            <div className="w-100 mb-10">
                                                {/*begin::Item*/}
                                                <div className="d-flex flex-stack mb-5 infobox">
                                                    <span className="fs-6 text-gray-800 text-start pe-3">For groups of 61+ or for a customizable platform.</span>
                                                    {/*begin::Svg Icon | path: icons/duotune/general/gen043.svg*/}
                                                    {/* <span class="svg-icon svg-icon-1 svg-icon-success">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                            <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="black" />
                                                            <path d="M10.4343 12.4343L8.75 10.75C8.33579 10.3358 7.66421 10.3358 7.25 10.75C6.83579 11.1642 6.83579 11.8358 7.25 12.25L10.2929 15.2929C10.6834 15.6834 11.3166 15.6834 11.7071 15.2929L17.25 9.75C17.6642 9.33579 17.6642 8.66421 17.25 8.25C16.8358 7.83579 16.1642 7.83579 15.75 8.25L11.5657 12.4343C11.2533 12.7467 10.7467 12.7467 10.4343 12.4343Z" fill="black" />
                                                        </svg>
                                                    </span> */}
                                                    {/*end::Svg Icon*/}
                                                </div>
                                                {/*end::Item*/}
                                                {/*begin::Item*/}
                                                <div className="d-flex flex-stack mb-5 infobox">
                                                    <span className="fs-6 text-gray-800 text-start pe-3">Contact us for rates and to discuss how we can customize this platform to fit your specific needs.</span>
                                                    {/*begin::Svg Icon | path: icons/duotune/general/gen043.svg*/}
                                                    {/* <span class="svg-icon svg-icon-1 svg-icon-success">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                            <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="black" />
                                                            <path d="M10.4343 12.4343L8.75 10.75C8.33579 10.3358 7.66421 10.3358 7.25 10.75C6.83579 11.1642 6.83579 11.8358 7.25 12.25L10.2929 15.2929C10.6834 15.6834 11.3166 15.6834 11.7071 15.2929L17.25 9.75C17.6642 9.33579 17.6642 8.66421 17.25 8.25C16.8358 7.83579 16.1642 7.83579 15.75 8.25L11.5657 12.4343C11.2533 12.7467 10.7467 12.7467 10.4343 12.4343Z" fill="black" />
                                                        </svg>
                                                    </span> */}
                                                    {/*end::Svg Icon*/}
                                                </div>
                                                {/*end::Item*/}
                                            </div>
                                            {/*end::Features*/}
                                            {/*begin::Select*/}
                                            <a href="#contact" className="btn btn-primary">Select</a>
                                            {/*end::Select*/}
                                        </div>
                                        {/*end::Option*/}
                                    </div>
                                </div>
                                {/*end::Col*/}
                            </div>
                            {/*end::Row*/}
                        </div>
                        {/*end::Pricing*/}
                    </div>
                    {/*end::Plans*/}
                </div>
                {/*end::Container*/}
            </div>
            {/*end::Wrapper*/}
            {/*begin::Curve bottom*/}
            <div className="landing-curve landing-dark-color">
                <svg viewBox="15 12 1470 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 11C3.93573 11.3356 7.85984 11.6689 11.7725 12H1488.16C1492.1 11.6689 1496.04 11.3356 1500 11V12H1488.16C913.668 60.3476 586.282 60.6117 11.7725 12H0V11Z" fill="currentColor" />
                </svg>
            </div>
            {/*end::Curve bottom*/}
        </div>        
    )
}

export default Plan