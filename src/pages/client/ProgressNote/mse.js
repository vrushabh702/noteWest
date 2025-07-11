import React from 'react'

const MseParagraph = (props) => {

    let [progressNotesMseText, setProgressNotesMseText] = React.useState([]);
    let [mseString, setMseString] = React.useState(null);

    React.useEffect(() => {
        let mseText = "";
        mseText = props.jsonData.map((node) => compileText(node, mseText))

        setProgressNotesMseText(mseText);
    }, [props.jsonData]);

    const compileText = (node, mseText) => {
        if (node.status) {
            let children = [];
            if (node.children) {
                node.children.forEach((item, key) => {
                    // console.log('item.status', item.status)
                    if (item.status) {
                        children.push(item);

                    }
                })
            }
            if (mseText == '') {
                mseText = node.text;
            } else {
                mseText += node.text;
            }
            if (children) {
                children.forEach((element, key) => {
                    element.text = (element.text).replace("%,%", "");
                    element.text = (element.text).replace("%and%", "");
                    if (key > 0) {
                        if (key == (children.length) - 1) {
                            element.text = '%and%' + element.text;
                        }
                        else {
                            element.text = '%,%' + element.text;
                        }
                    }
                    mseText = compileText(element, mseText);
                })
            }
            return mseText;
        }
        return '';
    }


    React.useEffect(() => {
        recompileText(progressNotesMseText)
    }, [progressNotesMseText]);

    const recompileText = (textArray) => {

        let filteredTextArray = textArray.filter(function (el) {
            return el != "";
        });
        if (filteredTextArray.length == 0) {
            setMseString('');
        } else {
            let stringAppend = 0;
            textArray.forEach((item, index) => {

                if (item) {
                    if (stringAppend == 0) {
                        stringAppend = 1;
                        mseString = "Uday's " + item;
                    } else {
                        mseString += " and his " + item;
                    }
                }

            })
            mseString = mseString.replaceAll("%and%", " and ");
            mseString = mseString.replaceAll("%,%", ", ");
            setMseString(mseString)
        }

    }
    // console.log('mseString000----', mseString)
    return (
        <>
            {
                (mseString) ?
                    <div>
                        <div className="d-flex flex-column fv-row mb-7">
                            <label className="form-label fw-bolder text-dark fs-6 ">{props.title}</label>
                        </div>
                        <div className="d-flex flex-column fv-row mb-7">
                            <p className="fs-6 text-dark form-label mb-0">{mseString}</p>
                        </div>
                    </div>
                    :
                    ''
            }
        </>
    )
}

export default MseParagraph;