import React, { useEffect, useState } from 'react'
import Loader from 'react-loader-spinner';
import ReactIndex from '../../../HOC/ReactTable/TableIndex'
import { addClinician } from '../../../Routes/RouterPage';
import { postRequest } from '../CustomHttp';
import {ClinicianColumns} from './ClinicianColumns';
import Toastify from '../../../component/toast';
import { getAuthData } from '../Session';
import { useNavigate } from 'react-router-dom';

export default function Clinician() {
    const AuthData = getAuthData();
    const navigate = useNavigate()
    useEffect(() => {
      if(!AuthData.clinic.read){
        navigate('/auth/profile')
      }
    },[])
    const [ClinicianData, setClinicianData] = useState(false); 
    const [downloadToken, setDownloadToken] = useState('');  
    const [limit, setLimit] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [tableData, setTableData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchParam, setSearchParam] = useState({});
    const fetchData = async (params = {}) => {
        const Url = '/clinician';
        setLoading(true);
        params.limit = limit;
        params.page = currentPage+1;
        const getData = await postRequest(Url, params, true);
        if(getData){
            if(getData.status){
                setClinicianData(getData.data);
                setDownloadToken(getData.download_token);
                setTableData({
                    limit: limit,
                    currentPage: currentPage,
                    totalCount: getData.total_count,
                    data: getData.data,
                    search: params.search,
                    from_date: params.from_date,
                    to_date: params.to_date,
                    user_role: params.user_role, 
                });
            }else{
                setClinicianData([]);
                setDownloadToken();
                setTableData({
                    limit: limit,
                    currentPage: currentPage,
                    totalCount: getData.total_count,
                    data: [],
                    search: params.search,
                    from_date: params.from_date,
                    to_date: params.to_date,
                    user_role: params.user_role, 
                });
            }
            setLoading(false);
        }
    }

    // pageIndex, pageSize
    const handlePageChange = (event) => {
        setCurrentPage(event.pageIndex);
        setLimit(event.pageSize);
    };

    const fetchUser = (event) => {
        setSearchParam(event);
        fetchData(event);
    };

    React.useEffect(() => {
        fetchData(searchParam);
    }, [currentPage, limit]);

    useEffect(() => {
        fetchData(searchParam);        
        // return () => {

        // }
    }, []);
    return (
        <React.Fragment>
            <Toastify autoClose={2000}/>
            <div className="content flex-row-fluid tour__step-three--one tour__step-three--three" id="kt_content">
                {
                    ClinicianData && tableData
                        ? <ReactIndex
                            loader={loading}
                            columnData={ClinicianColumns}
                            tableDetail={addClinician} 
                            exportData={{ url: 'clinician-export', downloadToken }}
                            fetchUser={fetchUser}
                            roleFilter={true}
                            dateFilter={false}
                            TableData={tableData}
                            handlePageChange={(e) => handlePageChange(e)}
                        />
                        : null
                }
                {/* {loading ? (
                    <center>
                        <Loader
                            type="ThreeDots"
                            color="#017EAD"
                            height={100}
                            width={100}
                            timeout={300000} />
                    </center>
                    ) : null
                } */}
            </div>
        </React.Fragment>
    )
}
