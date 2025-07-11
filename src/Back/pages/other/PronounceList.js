import React, { useRef } from 'react'

function PronounceList(props) {
    const PronouceRef = useRef();
    const PronounceArray = [
        [
            'She', 'He', 'They', 'Ze'
        ],
        [
            'Her', 'Him', 'Them', 'Hir'
        ],
        [
            'Her', 'His', 'Their', 'Hir'
        ]
    ];
    
    const SelectedArray = props.selected;
    const colSize = props.size ?? 4;
    // console.log('selected',SelectedArray)

    return (
        <form ref={PronouceRef} className='row'>
            {
                PronounceArray.map((a, i) => (
                    <div className={"col-"+colSize} key={i + '_key'}>
                        {
                            a.map((b, j) => (
                                <div className="form-check form-check-sm form-check-custom form-check-solid mb-2" key={j + '_' + b}>
                                    <input className="form-check-input widget-9-check" name={'pronouns'+i} type="radio" value={b} onChange={(e) => props.changeFun(e, i)} id={b} checked={ SelectedArray[i] == b } />
                                    <label className="align-items-center fs-6 text-dark fw-bold form-label mb-2 customCheckValue" htmlFor={b}>{ b }</label>
                                </div>
                            ))
                        }
                    </div>
                ))
            }   
        </form>
    )
}

export default PronounceList
