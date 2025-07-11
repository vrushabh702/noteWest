import React from 'react'

export default function EditClinician() {
    return (
        <div className="modal fade" id="modalEditClinician" tabIndex={-1} aria-hidden="true">
            {/*begin::Modal dialog*/}
            <div className="modal-dialog modal-dialog-centered mw-650px">
                {/*begin::Modal content*/}
                <div className="modal-content">
                {/*begin::Form*/}
                <form className="form" action="#" id="kt_modal_add_customer_form" data-kt-redirect="list.html">
                    {/*begin::Modal header*/}
                    <div className="modal-header" id="kt_modal_add_customer_header">
                    {/*begin::Modal title*/}
                    <h2 className="fw-bolder">Edit Information</h2>
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
                    <div className="modal-body py-10 px-lg-17">
                    {/*begin::Scroll*/}
                    <div className="scroll-y me-n7 pe-7" id="kt_modal_add_customer_scroll" data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto" data-kt-scroll-dependencies="#kt_modal_add_customer_header" data-kt-scroll-wrappers="#kt_modal_add_customer_scroll" data-kt-scroll-offset="300px">
                        
                        <div className="fv-row mb-7">
                        <label className="align-items-center fs-6 text-dark fw-bold form-label mb-2">
                            <span className="required">User Name:</span>
                        </label>
                        <input type="text" className="form-control form-control-solid" placeholder="Susan Smith" name="card_name" defaultValue disabled />
                        <div className="fv-plugins-message-container invalid-feedback" />
                        </div>
                        {/*end::Input group*/}
                        
                        <div className="row fv-row mb-7">
                        {/*begin::Col*/}
                        <div className="col-xl-6">
                            <label className="form-label text-dark fs-6">First Name</label>
                            <input className="form-control form-control-lg form-control-solid" type="text" placeholder="Susan" name="first-name" autoComplete="off" />
                        </div>
                        {/*end::Col*/}
                        {/*begin::Col*/}
                        <div className="col-xl-6">
                            <label className="form-label text-dark fs-6">Last Name</label>
                            <input className="form-control form-control-lg form-control-solid" type="text" placeholder="Smith" name="last-name" autoComplete="off" />
                        </div>
                        {/*end::Col*/}
                        </div>
                        {/*end::Input group*/}
                        
                        <div className="row fv-row mb-7">
                        {/*begin::Col*/}
                        <div className="col-xl-6">
                            <label className="form-label text-dark fs-6"><span className="required">Email</span></label>
                            <input className="form-control form-control-lg form-control-solid" type="text" placeholder="SusanSmith@gmail.com" name="email" autoComplete="off" disabled />
                        </div>
                        {/*end::Col*/}
                        {/*begin::Col*/}
                        <div className="col-xl-6">
                            <label className="form-label text-dark fs-6">Mobile Phone</label>
                            <input className="form-control form-control-lg form-control-solid" type="text" placeholder="716-553-3333" name="mobileNumber" autoComplete="off" />
                        </div>
                        {/*end::Col*/}
                        </div>
                        
                        
                        <div className="row fv-row mb-7">
                        {/*begin::Col*/}
                        <div className="col-xl-6">
                            <label className="form-label text-dark fs-6">Work Phone</label>
                            <input className="form-control form-control-lg form-control-solid" type="text" placeholder={877865565} name="workPhone" autoComplete="off" />
                        </div>
                        {/*end::Col*/}
                        {/*begin::Col*/}
                        <div className="col-xl-6">
                            <label className="form-label  text-dark fs-6">Home Phone</label>
                            <input className="form-control form-control-lg form-control-solid" type="text" placeholder={877865565} name="homePhone" autoComplete="off" />
                        </div>
                        {/*end::Col*/}
                        </div>
                        {/*end::Input group*/}
                        
                        <div className="fv-row mb-7">
                        <label className="align-items-center fs-6 text-dark  form-label mb-2">
                            Address
                        </label>
                        <textarea className="form-control form-control-solid" placeholder="123 Prairie Road Richmond, VA 23233" name="message" value rows={5} defaultValue={""} />
                        <div className="fv-plugins-message-container invalid-feedback" />
                        </div>
                        {/*end::Input group*/}
                        
                        <div className="row fv-row mb-7">
                        {/*begin::Col*/}
                        <div className="col-xl-6">
                            <label className="form-label text-dark fs-6">City</label>
                            <select name="card_expiry_month" className="form-select form-select-solid" data-control="select2" data-hide-search="true" data-placeholder="City">
                            <option />
                            <option value="ABC">ABC</option>
                            <option value="EFG">EFG</option>
                            <option value="XYZ">XYZ</option>
                            </select>
                        </div>
                        {/*end::Col*/}
                        {/*begin::Col*/}
                        <div className="col-xl-6">
                            <label className="form-label text-dark fs-6">Zipcode</label>
                            <input className="form-control form-control-lg form-control-solid" type="text" placeholder={432345} name="zipCode" autoComplete="off" />
                        </div>
                        {/*end::Col*/}
                        </div>
                        {/*end::Input group*/}
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
