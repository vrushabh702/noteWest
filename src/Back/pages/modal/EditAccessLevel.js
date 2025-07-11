import React from 'react'

export default function EditAccessLevel() {
    return (
        <div className="modal fade" id="modalEditRole" tabIndex={-1} aria-hidden="true">
            {/*begin::Modal dialog*/}
            <div className="modal-dialog modal-dialog-centered mw-650px">
                {/*begin::Modal content*/}
                <div className="modal-content">
                {/*begin::Form*/}
                <form className="form" action="#" id="kt_modal_add_customer_form" data-kt-redirect="list.html">
                    {/*begin::Modal header*/}
                    <div className="modal-header" id="kt_modal_add_customer_header">
                    {/*begin::Modal title*/}
                    <h2 className="fw-bolder">Edit Access Level</h2>
                    {/*end::Modal title*/}
                    {/*begin::Close*/}
                    <div className="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal">
                        {/*begin::Svg Icon | path: icons/duotune/arrows/arr061.svg*/}
                        <span className="svg-icon svg-icon-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                            <rect opacity="0.5" x={6} y="17.3137" width={16} height={2} rx={1} transform="rotate(-45 6 17.3137)" fill="black" />
                            <rect x="7.41422" y={6} width={16} height={2} rx={1} transform="rotate(45 7.41422 6)" fill="black" />
                        </svg>
                        </span>
                        {/*end::Svg Icon*/}
                    </div>
                    {/*end::Close*/}
                    </div>
                    {/*end::Modal header*/}
                    {/*begin::Modal body*/}
                    <div className="modal-body py-10 px-lg-17 customUl">
                    {/*begin::Scroll*/}
                    <div className="scroll-y me-n7 pe-7" id="kt_modal_add_customer_scroll" data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto" data-kt-scroll-dependencies="#kt_modal_add_customer_header" data-kt-scroll-wrappers="#kt_modal_add_customer_scroll" data-kt-scroll-offset="300px">
                        {/* Access level Start */}
                        <ul className="label">
                        <li><label className="form-label fw-bolder text-dark fs-6 ">Practice Administration</label></li>
                        </ul>
                        <ul className="mb-5">
                        <li><div className="form-check form-check-sm form-check-custom form-check-solid">
                            <input className="form-check-input widget-9-check" type="checkbox" defaultValue={1} />
                            <label className="align-items-center fs-6 text-dark fw-bold form-label mb-2 customCheckValue">Practice Administrator</label>
                            </div>
                        </li>
                        </ul>
                        <ul className="label">
                        <li><label className="form-label fw-bolder text-dark fs-6 ">Clinical Access</label></li>
                        </ul>
                        <ul className="mb-5">
                        <li><div className="form-check form-check-sm form-check-custom form-check-solid">
                            <input className="form-check-input widget-9-check" type="checkbox" defaultValue={1} />
                            <label className="align-items-center fs-6 text-dark fw-bold form-label mb-2 customCheckValue">Clinician</label>
                            </div>
                        </li>
                        <li>
                            <div className="form-check form-check-sm form-check-custom form-check-solid">
                            <input className="form-check-input widget-9-check" type="checkbox" defaultValue={1} />
                            <label className="align-items-center fs-6 text-dark fw-bold form-label mb-2 customCheckValue">Supervisor</label>
                            </div>
                        </li>
                        <li>
                            <div className="form-check form-check-sm form-check-custom form-check-solid">
                            <input className="form-check-input widget-9-check" type="checkbox" defaultValue={1} />
                            <label className="align-items-center fs-6 text-dark fw-bold form-label mb-2 customCheckValue">Clinical Administrator</label>
                            </div>
                        </li>
                        </ul>
                        {/* End access level */}
                    </div>
                    {/*end::Scroll*/}
                    </div>
                    {/*end::Modal body*/}
                    {/*begin::Modal footer*/}
                    <div className="modal-footer flex-center">
                    {/*begin::Button*/}
                    <button type="reset" id="kt_modal_add_customer_cancel" className="btn btn-light me-3" data-bs-dismiss="modal">Discard</button>
                    {/*end::Button*/}
                    {/*begin::Button*/}
                    <button type="submit" id="kt_modal_add_customer_submit" className="btn btn-primary" onclick="submitAlert('Form submited successfully.')">
                        <span className="indicator-label">Submit</span>
                        <span className="indicator-progress">Please wait... 
                        <span className="spinner-border spinner-border-sm align-middle ms-2" /></span>
                    </button>
                    {/*end::Button*/}
                    </div>
                    {/*end::Modal footer*/}
                </form>
                {/*end::Form*/}
                </div>
            </div>
            </div>
    )
}
