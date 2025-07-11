import React from "react";

function ExportModal(props) {
  return (
      <>
        <form id="kt_customers_export_form" className="form" action="#">
        <div className="fv-row mb-10">
            <label className="fs-5 fw-bold form-label mb-5">
            Select Date Range:
            </label>

            <input
            className="form-control form-control-solid"
            placeholder="Pick a date"
            name="date"
            />
        </div>

        <div className="fv-row mb-10">
            <label className="fs-5 fw-bold form-label mb-5">
            Select Export Format:
            </label>

            <select
            data-control="select2"
            data-placeholder="Select a format"
            data-hide-search="true"
            name="format"
            className="form-select form-select-solid"
            >
            <option value="excell">Excel</option>
            <option value="pdf">PDF</option>
            <option value="cvs">CVS</option>
            <option value="zip">ZIP</option>
            </select>
        </div>
        <div className="row fv-row mb-15">
            <label className="fs-5 fw-bold form-label mb-5">Payment Type:</label>

            <div className="d-flex flex-column">
            <label className="form-check form-check-custom form-check-sm form-check-solid mb-3">
                <input
                className="form-check-input"
                type="checkbox"
                defaultValue={1}
                defaultChecked="checked"
                name="payment_type"
                />
                <span className="form-check-label text-gray-600 fw-bold">All</span>
            </label>
            <label className="form-check form-check-custom form-check-sm form-check-solid mb-3">
                <input
                className="form-check-input"
                type="checkbox"
                defaultValue={2}
                defaultChecked="checked"
                name="payment_type"
                />
                <span className="form-check-label text-gray-600 fw-bold">Visa</span>
            </label>
            <label className="form-check form-check-custom form-check-sm form-check-solid mb-3">
                <input
                className="form-check-input"
                type="checkbox"
                defaultValue={3}
                name="payment_type"
                />
                <span className="form-check-label text-gray-600 fw-bold">
                Mastercard
                </span>
            </label>
            <label className="form-check form-check-custom form-check-sm form-check-solid">
                <input
                className="form-check-input"
                type="checkbox"
                defaultValue={4}
                name="payment_type"
                />
                <span className="form-check-label text-gray-600 fw-bold">
                American Express
                </span>
            </label>
            </div>
        </div>
        <div className="text-center">
            <button type="reset" id="kt_customers_export_cancel" className="btn btn-light me-3" onClick={props.close}>
            Discard
            </button>
            <button
            type="submit"
            id="kt_customers_export_submit"
            className="btn btn-primary"
            >
            <span className="indicator-label">Submit</span>
            <span className="indicator-progress">
                Please wait...
                <span className="spinner-border spinner-border-sm align-middle ms-2" />
            </span>
            </button>
        </div>
        </form>
    </>
  );
}

export default ExportModal;
