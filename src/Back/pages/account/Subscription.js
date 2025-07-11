import React from 'react'
import { Link } from 'react-router-dom'
import EditAccount from '../modal/EditAccount'

export default function Subscription() { 
    return (
        <React.Fragment>
            <div className="content flex-row-fluid paddingZero" id="kt_content">
                {/*begin::Stats*/}
                <div className="row g-6 g-xl-9 mb-5 mb-xxl-8">
                    <div className="col-lg-8 col-xxl-4 customUl">
                    {/*begin::Card*/}
                    <div className="card h-100">
                        <div className="card-header border-0 pt-5">
                        <h3 className="card-title align-items-start flex-column">
                            <span className="card-label fw-bolder fs-3 mb-1">Billing Details</span>
                        </h3>
                        <div className="toprightEdit">
                            <Link to="/auth/" data-bs-toggle="modal" data-bs-target="#modalEditAccount"><i className="fas fa-pencil-alt px-3 py-3" /></Link>
                        </div>
                        </div>
                        {/*begin::Card body*/}
                        <div className="card-body p-9 pt-0">
                        <div className="table-responsive">
                            {/*begin::Table*/}
                            <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
                            {/*begin::Table body*/}
                            <tbody>
                                <tr>
                                <td className="fw-bolder text-dark text-end customWidthTd">
                                    Full Name
                                </td>
                                <td className="text-normal fs-6 text-dark ">
                                    Mark De
                                </td>
                                </tr>
                                <tr>
                                <td className="fw-bolder text-dark text-end customWidthTd">
                                    Email
                                </td>
                                <td className="text-normal fs-6 text-dark ">
                                    Test@test.com
                                </td>
                                </tr>
                                <tr>
                                <td className="fw-bolder text-dark text-end customWidthTd">
                                    Company Name
                                </td>
                                <td className="text-normal fs-6 text-dark ">
                                    Yahhoo.com
                                </td>
                                </tr>
                                <tr>
                                <td className="fw-bolder text-dark text-end customWidthTd">
                                    Phone Number
                                </td>
                                <td className="text-normal fs-6 text-dark ">
                                    +123456767889
                                </td>
                                </tr>
                                <tr>
                                <td className="fw-bolder text-dark text-end customWidthTd">
                                    Physical Address
                                </td>
                                <td className="text-normal fs-6 text-dark ">
                                    143, Lorem ipsum is placeholder text commonly used in the graphic
                                </td>
                                </tr>
                                <tr>
                                <td className="fw-bolder text-dark text-end customWidthTd">
                                    City
                                </td>
                                <td className="text-normal fs-6 text-dark ">
                                    Zoomark
                                </td>
                                </tr>
                                <tr>
                                <td className="fw-bolder text-dark text-end customWidthTd">
                                    State
                                </td>
                                <td className="text-normal fs-6 text-dark ">
                                    Barcelo
                                </td>
                                </tr>
                                <tr>
                                <td className="fw-bolder text-dark text-end customWidthTd">
                                    Zip Code
                                </td>
                                <td className="text-normal fs-6 text-dark ">
                                    423232322
                                </td>
                                </tr>
                                <tr>
                                <td className="fw-bolder text-dark text-end customWidthTd">
                                    Package
                                </td>
                                <td className="text-normal fs-6 text-dark ">
                                    3
                                </td>
                                </tr>
                                <tr>
                                <td className="fw-bolder text-dark text-end customWidthTd">
                                    Monthly Cost
                                </td>
                                <td className="text-normal fs-6 text-dark ">
                                    Test
                                </td>
                                </tr>
                                <tr>
                                <td className="fw-bolder text-dark text-end customWidthTd">
                                    Name On Card
                                </td>
                                <td className="text-normal fs-6 text-dark ">
                                    Max De
                                </td>
                                </tr>
                                <tr>
                                <td className="fw-bolder text-dark text-end customWidthTd">
                                    Card Number
                                </td>
                                <td className="text-normal fs-6 text-dark ">
                                    <img src="./assets/media/svg/card-logos/mastercard.svg" style={{maxWidth: '40px', paddingRight: '5px'}} className="pr-3" alt="mastercard" />411 1111 1111 1111
                                </td>
                                </tr>
                                <tr>
                                <td className="fw-bolder text-dark text-end customWidthTd">
                                    Expiration Date
                                </td>
                                <td className="text-normal fs-6 text-dark ">
                                    06/1991
                                </td>
                                </tr>
                            </tbody>
                            {/*end::Table body*/}
                            </table>
                            {/*end::Table*/}
                        </div>
                        </div>
                        {/*end::Card body*/}
                    </div>
                    {/*end::Card*/}
                    </div>
                    <div className="col-lg-4 col-xxl-4">
                    {/*begin::Card*/}
                    <div className="card card-xxl-stretch mb-5 mb-xl-8">
                        <div className="card-header border-0 pt-5">
                        <h3 className="card-title align-items-start flex-column">
                            <span className="card-label fw-bolder fs-3 mb-1">Membership</span>
                        </h3>
                        </div>
                        {/*begin::Card body*/}
                        <div className="card-body p-9 pt-0">
                        <div className="table-responsive">
                            {/*begin::Table*/}
                            <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
                            {/*begin::Table body*/}
                            <tbody>
                                <tr>
                                <td className="fw-bolder text-dark text-end customWidthTd">
                                    Current Plan
                                </td>
                                <td className="text-normal fs-6 text-dark ">
                                    <span className="badge badge-light-warning">Trial (22) </span>
                                </td>
                                </tr>
                                <tr>
                                <td className="fw-bolder text-dark text-end customWidthTd">
                                    Monthly Users
                                </td>
                                <td className="text-normal fs-6 text-dark ">
                                    8 ( Add more 2 users)
                                </td>
                                </tr>
                                <tr>
                                <td className="fw-bolder text-dark text-end customWidthTd">
                                    Status
                                </td>
                                <td className="text-normal fs-6 text-dark ">
                                    <span className="badge badge-light-primary">Inactive</span>
                                </td>
                                </tr>
                                <tr>
                                <td className="fw-bolder text-dark text-end customWidthTd">
                                    Card Number
                                </td>
                                <td className="text-normal fs-6 text-dark ">
                                    <img src="/assets/media/svg/card-logos/mastercard.svg" style={{maxWidth: '50px'}} className="px-3" alt="mastercard" />**** 4532
                                </td>
                                </tr>
                                <tr>
                                <td className="fw-bolder text-dark text-end customWidthTd">
                                    Add New Plan
                                </td>
                                <td className="text-normal fs-6 text-dark ">
                                    <Link to="#choosePlan">Change Plan</Link>
                                </td>
                                </tr>
                            </tbody>
                            {/*end::Table body*/}
                            </table>
                            {/*end::Table*/}
                        </div>
                        </div>
                        {/*end::Card body*/}
                    </div>
                    {/*end::Card*/}
                    </div>
                </div>
                {/*end::Stats*/}
                {/*begin::Stats*/}
                <div className="row g-6 g-xl-9" id="choosePlan">
                    {/*begin::Pricing card*/}
                    <div className="col-lg-12 col-xxl-12 ">
                    <div className="card" id="kt_pricing">
                        {/*begin::Card body*/}
                        <div className="card-body p-lg-17">
                        {/*begin::Plans*/}
                        <div className="d-flex flex-column">
                            {/*begin::Heading*/}
                            <div className="mb-13 text-center">
                            <h1 className="fs-2hx fw-bolder mb-5">Choose Your Plan</h1>
                            </div>
                            {/*end::Heading*/}
                            {/*begin::Row*/}
                            <div className="row g-10">
                            {/*begin::Col*/}
                            <div className="col-xl-4">
                                <div className="d-flex h-100 align-items-center">
                                
                                <div className="w-100 d-flex flex-column flex-center rounded-3 bg-light bg-opacity-75 py-15 px-10">
                                    {/*begin::Heading*/}
                                    <div className="mb-7 text-center">
                                    {/*begin::Title*/}
                                    <h1 className="text-dark mb-5 fw-boldest">Individual</h1>
                                    {/*end::Title*/}
                                    {/*begin::Description*/}
                                    <div className="text-gray-400 fw-bold mb-5">Best Settings for Individual</div>
                                    {/*end::Description*/}
                                    {/*begin::Price*/}
                                    <div className="text-center">
                                        <span className="mb-2 text-primary currency">$</span>
                                        <span className="fs-3x fw-bolder text-primary" data-kt-plan-price-month={39} data-kt-plan-price-annual={399}>10</span>
                                        <span className="fs-7 fw-bold opacity-50">/ 
                                        <span data-kt-element="period">Mon</span></span>
                                    </div>
                                    {/*end::Price*/}
                                    </div>
                                    {/*end::Heading*/}
                                    {/*begin::Features*/}
                                    <div className="w-100 mb-10">
                                    {/*begin::Item*/}
                                    <div className="d-flex align-items-center mb-5">
                                        <span className="fw-bold fs-6 text-gray-800 flex-grow-1 pe-3">Includes unlimited access to</span>
                                    </div>
                                    {/*end::Item*/}
                                    {/*begin::Item*/}
                                    <div className="d-flex align-items-center mb-5">
                                        <span className="fw-bold fs-6 text-gray-800 flex-grow-1 pe-3">Assessment generator</span>
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
                                    <div className="d-flex align-items-center mb-5">
                                        <span className="fw-bold fs-6 text-gray-800 flex-grow-1 pe-3">Treatment plan generator</span>
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
                                    <div className="d-flex align-items-center mb-5">
                                        <span className="fw-bold fs-6 text-gray-800 flex-grow-1 pe-3">Progress note generator</span>
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
                                    <div className="d-flex align-items-center mb-5">
                                        <span className="fw-bold fs-6 text-gray-800 flex-grow-1 pe-3">Termination note generator</span>
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
                                    <div className="d-flex align-items-center mb-5">
                                        <span className="fw-bold fs-6 text-gray-800 flex-grow-1 pe-3">HIPPA compliant, cloud based, note storage</span>
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
                                    <div className="d-flex align-items-center mb-5">
                                        <span className="fw-bold fs-6 text-gray-800 flex-grow-1 pe-3">Unlimited customer services</span>
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
                                    <div className="d-flex align-items-center mb-5">
                                        <span className="fw-bold fs-6 text-gray-800 flex-grow-1 pe-3">Cancel anytime</span>
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
                                    <Link to="/auth/" className="btn btn-sm btn-primary">Select</Link>
                                    {/*end::Select*/}
                                </div>
                                
                                </div>
                            </div>
                            {/*end::Col*/}
                            {/*begin::Col*/}
                            <div className="col-xl-4">
                                <div className="d-flex h-100 align-items-center">
                                
                                <div className="w-100 d-flex flex-column flex-center rounded-3 bg-light bg-opacity-75 py-20 px-10">
                                    {/*begin::Heading*/}
                                    <div className="mb-7 text-center">
                                    {/*begin::Title*/}
                                    <h1 className="text-dark mb-5 fw-boldest">Small group</h1>
                                    {/*end::Title*/}
                                    {/*begin::Description*/}
                                    <div className="text-gray-400 fw-bold mb-5">Best Settings for Small group</div>
                                    {/*end::Description*/}
                                    {/*begin::Price*/}
                                    <div className="text-center">
                                        <span className="mb-2 text-primary currency">$</span>
                                        <span className="fs-3x fw-bolder text-primary" data-kt-plan-price-month={339} data-kt-plan-price-annual={3399}>5-8.5</span>
                                        <span className="fs-7 fw-bold opacity-50">/ 
                                        <span data-kt-element="period">Mon</span></span>
                                    </div>
                                    {/*end::Price*/}
                                    </div>
                                    {/*end::Heading*/}
                                    {/*begin::Features*/}
                                    <div className="w-100 mb-10">
                                    {/*begin::Item*/}
                                    <div className="d-flex align-items-center mb-5">
                                        <span className="fw-bold fs-6 text-gray-800 flex-grow-1 pe-3">2-10 people<br />$8.50/month/person</span>
                                    </div>
                                    {/*end::Item*/}
                                    {/*begin::Item*/}
                                    <div className="d-flex align-items-center mb-5">
                                        <span className="fw-bold fs-6 text-gray-800 flex-grow-1 pe-3">11-25 people<br />$6.50/month/person</span>
                                    </div>
                                    {/*end::Item*/}
                                    {/*begin::Item*/}
                                    <div className="d-flex align-items-center mb-5">
                                        <span className="fw-bold fs-6 text-gray-800 flex-grow-1 pe-3">26-60 people<br />$5/month/person</span>
                                    </div>
                                    {/*end::Item*/}
                                    {/*begin::Item*/}
                                    <div className="d-flex align-items-center mb-5">
                                        <span className="fw-bold fs-6 text-gray-800 flex-grow-1 pe-3">All features from individual membership, plus</span>
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
                                    <div className="d-flex align-items-center mb-5">
                                        <span className="fw-bold fs-6 text-gray-800 flex-grow-1 pe-3">Everyone has access to a private accounts</span>
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
                                    <div className="d-flex align-items-center mb-5">
                                        <span className="fw-bold fs-6 text-gray-800 flex-grow-1 pe-3">Supervisors have access to all accounts.</span>
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
                                    <div className="d-flex align-items-center mb-5">
                                        <span className="fw-bold fs-6 text-gray-800 flex-grow-1 pe-3">Add and remove providers anytime</span>
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
                                    <Link to="/auth/" className="btn btn-sm btn-primary">Select</Link>
                                    {/*end::Select*/}
                                </div>
                                
                                </div>
                            </div>
                            {/*end::Col*/}
                            {/*begin::Col*/}
                            <div className="col-xl-4">
                                <div className="d-flex h-100 align-items-center">
                                
                                <div className="w-100 d-flex flex-column flex-center rounded-3 bg-light bg-opacity-75 py-15 px-10">
                                    {/*begin::Heading*/}
                                    <div className="mb-7 text-center">
                                    {/*begin::Title*/}
                                    <h1 className="text-dark mb-5 fw-boldest">Large <br />Group/Cooperation</h1>
                                    {/*end::Title*/}
                                    {/*begin::Description*/}
                                    <div className="text-gray-400 fw-bold mb-5">Best Settings for Large Group/Cooperation</div>
                                    {/*end::Description*/}
                                    </div>
                                    {/*end::Heading*/}
                                    {/*begin::Features*/}
                                    <div className="w-100 mb-10">
                                    {/*begin::Item*/}
                                    <div className="d-flex align-items-center mb-5">
                                        <span className="fw-bold fs-6 text-gray-800 flex-grow-1 pe-3">For groups of 61+ or for a customizable platform.</span>
                                    </div>
                                    {/*end::Item*/}
                                    {/*begin::Item*/}
                                    <div className="d-flex align-items-center mb-5">
                                        <span className="fw-bold fs-6 text-gray-800 flex-grow-1 pe-3">Contact us for rates and to discuss how we can customize this platform to fit your specific needs.</span>
                                    </div>
                                    {/*end::Item*/}
                                    </div>
                                    {/*end::Features*/}
                                    {/*begin::Select*/}
                                    <Link to="/auth/" className="btn btn-sm btn-primary">Select</Link>
                                    {/*end::Select*/}
                                </div>
                                
                                </div>
                            </div>
                            {/*end::Col*/}
                            </div>
                            {/*end::Row*/}
                        </div>
                        {/*end::Plans*/}
                        </div>
                        {/*end::Card body*/}
                    </div>
                    </div>
                    {/*end::Pricing card*/}
                </div>
                {/*end::Stats*/}
                </div>

                {/* Modal */}
                <EditAccount />
                {/* end modal */}
        </React.Fragment>
    )
}
