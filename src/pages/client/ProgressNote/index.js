import React from 'react'
import ProfileHeader from '../ProfileHeader'
import TopSection from './topSection';
import { ProgressNotesMse, ProgressNotesIntervention, ProgressNotesAffect } from './static/progressNoteJson';
import MseParagraph from './mse';
export default function ProgressNote() {

    let [progressNotesMsejson, setProgressNotesMsejson] = React.useState(ProgressNotesMse);
    let [progressNotesAffectjson, setProgressNotesAffectjson] = React.useState(ProgressNotesAffect);
    let [progressNotesInterventionjson, setProgressNotesInterventionjson] = React.useState(ProgressNotesIntervention);

    let [dateOfService, setDateOfService] = React.useState('');


    const resetChildren = (node) => {
        node.status = false;
        if (node.children) {
            node.children.forEach(element => {
                resetChildren(element)
            });
        }
        return node;
    }

    const traverseNodeChange = (node, checked, name) => {
        if (node.label == name) {
            node.status = (checked) ? checked : false;
            if (!node.status && node.children) {
                resetChildren(node)
            }
        }
        if (node.children) {
            node.children.forEach(element => {
                traverseNodeChange(element, checked, name)
            });
        }
        return node;
    }

    const traverseTextNodeChange = (node, value, name) => {
        if (node.label == name) {
            node.status = (value) ? true : false;
            node.text = value;
        }
        if (node.children) {
            node.children.forEach(element => {
                traverseTextNodeChange(element, value, name)
            });
        }
        return node;
    }




    const onCheckBoxChange = (event) => {
        progressNotesMsejson = progressNotesMsejson.map((node) => traverseNodeChange(node, event.target.checked, event.target.name))
        setProgressNotesMsejson(progressNotesMsejson);
    }

    const onTextBoxChange = (event) => {
        progressNotesMsejson = progressNotesMsejson.map((node) => traverseTextNodeChange(node, event.target.value, event.target.name))
        setProgressNotesMsejson(progressNotesMsejson);
    }



    const traverseNode = (node) => {
        return (
            <li key={node.label} ><div className="form-check form-check-sm form-check-custom form-check-solid">

                {
                    (node.type == 'checkbox') ? < div > < input name={node.label}
                        checked={node.status}
                        className="form-check-input widget-9-check"
                        type="checkbox"
                        defaultValue={1}
                        onChange={onCheckBoxChange}
                    /><label className="align-items-center fs-6 text-dark fw-bold form-label mb-2 customCheckValue">{node.label}</label > </div>
                        : <input type="text" className="form-control form-control-solid" placeholder="Others" name={node.label} onChange={onTextBoxChange} />
                }

            </div>
                {
                    (node.status) &&
                        node.children
                        ? node.children.map((childNode) => (
                            <ul>{traverseNode(childNode)}</ul>
                        ))
                        : null
                }
            </li>
        );
    };





    //



    const onAffectCheckBoxChange = (event) => {
        progressNotesAffectjson = progressNotesAffectjson.map((node) => traverseNodeChange(node, event.target.checked, event.target.name))
        setProgressNotesAffectjson(progressNotesAffectjson);
    }

    const onAffectTextBoxChange = (event) => {
        progressNotesAffectjson = progressNotesAffectjson.map((node) => traverseTextNodeChange(node, event.target.value, event.target.name))
        setProgressNotesAffectjson(progressNotesAffectjson);
    }

    const traverseNodeAfect = (node) => {
        return (
            <li key={node.label} ><div className="form-check form-check-sm form-check-custom form-check-solid">

                {
                    (node.type == 'checkbox') ? < div > < input name={node.label}
                        checked={node.status}
                        className="form-check-input widget-9-check"
                        type="checkbox"
                        defaultValue={1}
                        onChange={onAffectCheckBoxChange}
                    /><label className="align-items-center fs-6 text-dark fw-bold form-label mb-2 customCheckValue">{node.label}</label > </div>
                        : <input type="text" className="form-control form-control-solid" placeholder="Others" name={node.label} onChange={onAffectTextBoxChange} />
                }

            </div>
                {
                    (node.status) &&
                        node.children
                        ? node.children.map((childNode) => (
                            <ul>{traverseNodeAfect(childNode)}</ul>
                        ))
                        : null
                }
            </li>
        );
    };
//

const onInterventionCheckBoxChange = (event) => {
    progressNotesInterventionjson = progressNotesInterventionjson.map((node) => traverseNodeChange(node, event.target.checked, event.target.name))
    setProgressNotesInterventionjson(progressNotesInterventionjson);
}

const onInterventionTextBoxChange = (event) => {
    progressNotesInterventionjson = progressNotesInterventionjson.map((node) => traverseTextNodeChange(node, event.target.value, event.target.name))
    setProgressNotesInterventionjson(progressNotesInterventionjson);
}

const traverseNodeIntervention = (node) => {
    return (
        <li key={node.label} ><div className="form-check form-check-sm form-check-custom form-check-solid">

            {
                (node.type == 'checkbox') ? < div > < input name={node.label}
                    checked={node.status}
                    className="form-check-input widget-9-check"
                    type="checkbox"
                    defaultValue={1}
                    onChange={onInterventionCheckBoxChange}
                /><label className="align-items-center fs-6 text-dark fw-bold form-label mb-2 customCheckValue">{node.label}</label > </div>
                    : <input type="text" className="form-control form-control-solid" placeholder="Others" name={node.label} onChange={onInterventionTextBoxChange} />
            }

        </div>
            {
                (node.status) &&
                    node.children
                    ? node.children.map((childNode) => (
                        <ul>{traverseNodeIntervention(childNode)}</ul>
                    ))
                    : null
            }
        </li>
    );
};










    const onChangeDate = (date)=> {
        setDateOfService(date);
    }
    return (
        <React.Fragment>
            <div className="content flex-row-fluid paddingZero" id="kt_content">
                <ProfileHeader />
                {/*begin::Stats*/}
                <div className="row g-6 g-xl-9">
                    <div className="col-lg-8 col-xxl-4 customUl">
                        {/*begin::Card*/}
                        <div className="card h-100">
                            {/*begin::Card body*/}
                            <div className="card-body p-9">
                                <TopSection onChangeDate={onChangeDate}/>
                                <div className="d-flex flex-column fv-row">
                                    {/*begin::Label*/}
                                    <label className="fs-6 fw-bold text-dark form-label mb-7">
                                        <span>Therapist Observations/Mental Status Exam:</span>
                                    </label>
                                </div>
                                {/*end::Input group*/}
                                {/* Accordians */}
                                <div className="d-flex flex-column fv-row mb-7">
                                    <div className="accordion" id="accordionExample">

                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingOne">
                                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                    <ul className="label">
                                                        <li><label className="form-label fw-bolder text-dark fs-6 ">MSE:</label></li>
                                                    </ul>
                                                </button>
                                            </h2>
                                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                <div className="accordion-body">
                                                    <ul>{progressNotesMsejson.map((node) => traverseNode(node))}</ul>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingTwo">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                    <ul className="label">
                                                        <li><label className="form-label fw-bolder text-dark fs-6 ">Affect:</label></li>
                                                    </ul>
                                                </button>
                                            </h2>
                                            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                <div className="accordion-body">
                                                    <ul>{progressNotesAffectjson.map((node) => traverseNodeAfect(node))}</ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingThree">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                    <ul className="label">
                                                        <li><label className="form-label fw-bolder text-dark fs-6 ">Intervention:</label></li>
                                                    </ul>
                                                </button>
                                            </h2>
                                            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                <div className="accordion-body">
                                                <ul>
                                                    {progressNotesInterventionjson.map((node) => traverseNodeIntervention(node))}</ul>
                                                
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                {/* End */}
                            </div>
                            {/*end::Card body*/}
                        </div>
                        {/*end::Card*/}
                    </div>
                    <div className="col-lg-4 col-xxl-4">
                        {/*begin::Budget*/}
                        <div className="card h-100">
                            <div className="card-body p-9">
                                <div className="d-flex flex-column fv-row mb-7">
                                    <label className="form-label fw-bolder text-dark fs-6 ">Susan Smith</label>
                                </div>
                                <div className="d-flex flex-column fv-row mb-7">
                                    <label className="form-label fw-bolder text-dark fs-6 ">Date of service: {dateOfService}</label>
                                </div>
                                <MseParagraph jsonData={progressNotesMsejson} title={'MSE'} />
                                <MseParagraph jsonData={progressNotesAffectjson} title={'Affect'} />
                                <MseParagraph jsonData={progressNotesInterventionjson} title={'Intervention'} />
                                
                                <div className="d-flex fv-row mb-7">
                                    <a href="#?" className="btn btn-primary btn-sm me-3">View/Edit Text</a>
                                    <a href="#?" className="btn btn-light btn-sm">Sign Off</a>
                                </div>
                            </div>
                        </div>
                        {/*end::Budget*/}
                    </div>
                </div>
                {/*end::Stats*/}
            </div>
        </React.Fragment>
    )
}
