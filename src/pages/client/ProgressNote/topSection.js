import React from 'react'


export default function TopSection(props) {
    return (
        <React.Fragment>
            {/*begin::Input group*/}
            <div className="row fv-row mb-5">
                {/*begin::Col*/}
                <div className="col-xl-6">
                    <label className="form-label fw-bolder text-dark fs-6"><span className="required">Date of service</span></label>
                    <input className="form-control form-control-lg form-control-solid" type="date" placeholder="06/05/2021" name="serviceDate" autoComplete="off" onChange={(e) => props.onChangeDate(e.target.value)} />
                </div>
                {/*end::Col*/}
                {/*begin::Col*/}
                <div className="col-xl-6">
                    <label className="form-label fw-bolder text-dark fs-6"><span className="required">Replicate note from:</span></label>
                    <select name="replicateNote" className="form-select form-select-solid" data-control="select2" data-hide-search="true" data-placeholder="ComboBox">
                        <option />
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                        <option value={11}>11</option>
                        <option value={12}>12</option>
                    </select>
                </div>
                {/*end::Col*/}
            </div>
            {/*end::Input group*/}
            {/*begin::Input group*/}
            <div className="row fv-row mb-5">
                {/*begin::Col*/}
                {/*begin::Label*/}
                <label className="required fs-6 fw-bold text-dark form-label mb-0">Who was present:</label>
                {/*end::Label*/}
                {/*begin::Row*/}
                <div className="row fv-row">
                    {/*begin::Col*/}
                    <div className="col-3" style={{ margin: 'auto' }}>
                        <div className="form-check form-check-sm form-check-custom form-check-solid">
                            <input className="form-check-input widget-9-check" type="checkbox" defaultValue={1} />
                            <label className="align-items-center fs-6 text-dark fw-bold form-label mb-2 customCheckValue">Client </label>
                        </div>
                    </div>
                    {/*end::Col*/}
                    {/*begin::Col*/}
                    <div className="col-3" style={{ margin: 'auto' }}>
                        <div className="form-check form-check-sm form-check-custom form-check-solid">
                            <input className="form-check-input widget-9-check" type="checkbox" defaultValue={1} />
                            <label className="align-items-center fs-6 text-dark fw-bold form-label mb-2 customCheckValue">Client and family</label>
                        </div>
                    </div>
                    {/*end::Col*/}
                    {/*begin::Col*/}
                    <div className="col-3" style={{ margin: 'auto' }}>
                        <div className="form-check form-check-sm form-check-custom form-check-solid">
                            <input className="form-check-input widget-9-check" type="checkbox" defaultValue={1} />
                            <label className="align-items-center fs-6 text-dark fw-bold form-label mb-2 customCheckValue">Client and spouse</label>
                        </div>
                    </div>
                    <div className="col-3">
                        <input type="text" className="form-control form-control-solid" placeholder="Others" name="other" defaultValue />
                    </div>
                    {/*end::Col*/}
                </div>
                {/*end::Row*/}
                {/*end::Col*/}
            </div>
            {/*end::Input group*/}
            {/*begin::Input group*/}
            <div className="row fv-row mb-5">
                {/*begin::Col*/}
                {/*begin::Label*/}
                <label className="required fs-6 fw-bold text-dark form-label mb-3">Type of therapy:</label>
                {/*end::Label*/}
                {/*begin::Row*/}
                <div className="row fv-row">
                    {/*begin::Col*/}
                    <div className="col-3" style={{ margin: 'auto' }}>
                        <div className="form-check form-check-sm form-check-custom form-check-solid">
                            <input className="form-check-input widget-9-check" type="checkbox" defaultValue={1} />
                            <label className="align-items-center fs-6 text-dark fw-bold form-label mb-2 customCheckValue">Individual</label>
                        </div>
                    </div>
                    {/*end::Col*/}
                    {/*begin::Col*/}
                    <div className="col-3" style={{ margin: 'auto' }}>
                        <div className="form-check form-check-sm form-check-custom form-check-solid">
                            <input className="form-check-input widget-9-check" type="checkbox" defaultValue={1} />
                            <label className="align-items-center fs-6 text-dark fw-bold form-label mb-2 customCheckValue">Couples</label>
                        </div>
                    </div>
                    {/*end::Col*/}
                    {/*begin::Col*/}
                    <div className="col-3" style={{ margin: 'auto' }}>
                        <div className="form-check form-check-sm form-check-custom form-check-solid">
                            <input className="form-check-input widget-9-check" type="checkbox" defaultValue={1} />
                            <label className="align-items-center fs-6 text-dark fw-bold form-label mb-2 customCheckValue">Family</label>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="form-check form-check-sm form-check-custom form-check-solid">
                            <input className="form-check-input widget-9-check" type="checkbox" defaultValue={1} />
                            <label className="align-items-center fs-6 text-dark fw-bold form-label mb-2 customCheckValue">Play</label>
                        </div>
                    </div>
                    {/*end::Col*/}
                </div>
                {/*begin::Input group*/}
                <div className="fv-row mt-5">
                    <input type="text" className="form-control form-control-solid" placeholder="Others" name="card_name" defaultValue />
                    <div className="fv-plugins-message-container invalid-feedback" />
                </div>
                {/*end::Input group*/}
                {/*end::Row*/}
                {/*end::Col*/}
            </div>
            {/*end::Input group*/}
        </React.Fragment>
    )
}
