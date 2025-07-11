import React, { useContext } from 'react'
import Loader from 'react-loader-spinner'
import { userData } from '../../Back/pages/client/ViewDetail';
import { postRequest, Url } from '../../Back/pages/CustomHttp';

function DownloadAll() {
    const { userInfo } = useContext(userData);

    const downloadAll = async () => {
        const postData = await postRequest("/download-client-document-zip", { client_id: userInfo.id }, true);
        if (postData) {
            // console.log(postData)
            const link = document.createElement('a');
            link.target = "_blank"
            // link.href = Url+(postData.split('/html')[1]);
            link.href = postData;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    return (                
            <><button className='btn btn-primary rounded-sm py-2 px-4 mx-2 mb-2' onClick={downloadAll} style={{ float: 'right' }}>Download All</button></>
    )
}

export default DownloadAll

// <Loader
// type="ThreeDots"
// color="#017EAD"
// height={100}
// width={100}
// timeout={30000} /></button>        