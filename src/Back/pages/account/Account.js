import React, {createContext, useEffect, useState} from 'react'
import ReactIndex from "../../../HOC/ReactTable/TableIndex";
import {AccountColumns} from "./AccountColumns";
import Loader from "react-loader-spinner";
import {postRequest} from "../CustomHttp";
import { addAccount } from '../../../Routes/RouterPage';
import { useNavigate } from 'react-router-dom';
import { getAuthData } from '../Session';

export const downloadTokenContext = createContext('');
export default function Account() {    
    const AuthData = getAuthData();
    const navigate = useNavigate()
    useEffect(() => {
      if(!AuthData.account.read){
        navigate('/auth')
      }
    },[]) 
    const [clientData, setClientData] = useState(false);
    const [downloadToken, setDownloadToken] = useState('');
    const [limit, setLimit] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [tableData, setTableData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async (params = {}) => {
        setLoading(true);
        params.limit = limit;
        params.page = currentPage+1;
        var myData = await postRequest('/accounts',params, true);
        if(myData) {
            if(myData.status) {
                setClientData(myData.data);
                setDownloadToken(myData.download_token);
                setTableData({
                    limit: limit,
                    currentPage: currentPage,
                    totalCount: myData.total_count,
                    data: myData.data
                });
            }else{
                setClientData([]);
                setTableData({
                    limit: limit,
                    currentPage: currentPage,
                    totalCount: myData.total_count,
                    data: []
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
        fetchData(event);
    };

    useEffect(() => {
        fetchData();
    }, [currentPage, limit]);

    useEffect(() => {
        fetchData();        
        return () => {

        }
    }, []);

    return (
        <React.Fragment>
            <div className="content flex-row-fluid" id="kt_content">
                {
                    clientData && tableData && !loading
                        ? <ReactIndex
                            columnData={AccountColumns}
                            tableDetail={addAccount} 
                            exportData={{ url: 'account-export', downloadToken }}
                            fetchUser={fetchUser}
                            TableData={tableData}
                            handlePageChange={(e) => handlePageChange(e)}
                        />
                        : null
                }
                {loading ? (
                    <center>
                        <Loader
                            type="ThreeDots"
                            color="#017EAD"
                            height={100}
                            width={100}
                            timeout={300000} />
                    </center>
                    ) : null
                }
            </div>
        </React.Fragment>
    )
}
