import React, { useState, useEffect, useMemo } from 'react'
import { createContext } from 'react';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table/dist/react-table.development';
import GlobalFilter from './GlobalFilter';
import Pagination from './Pagination';

export const ApplyFilter = createContext();
function TableIndex({ columnData, TableData, tableDetail, fetchUser, exportData, roleFilter, dateFilter, HideHeader, handlePageChange,loader }) {
    const [data, setData] = useState([]);
    const columns = useMemo(() => columnData, []);
    const style = {
        width: '200px',
        padding: '0px',
    }
    // console.log('TableData',TableData)
    const TableInstence = useTable({ columns, manualPagination: true, pageCount: TableData.totalCount, data, initialState: { pageIndex: TableData.currentPage || 0, pageSize: TableData.limit || 10 } }, useGlobalFilter, useSortBy, usePagination );    
    const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            page,
            prepareRow,                        
            setGlobalFilter,
            state,
            nextPage,
            previousPage,
            gotoPage,
            canNextPage,
            canPreviousPage,
            setPageSize
        } = TableInstence;

        // console.log('page',page)
    
    const { gloablFilter, pageIndex, pageSize } = state;
    
    useEffect(() => {
        async function fetchData() {
            handlePageChange({
                pageIndex: pageIndex,
                pageSize: pageSize
            });
        }
        fetchData();
    }, [pageSize]);

    useEffect(() => {
        gotoPage(TableData.currentPage);
        setData(TableData.data);
    }, [TableData.data,TableData.currentPage]);
    
    const previousPageChange = (pageindex) => {
        handlePageChange({
            pageIndex: pageindex,
            pageSize: pageSize
        })
    };

    const nextPageChange = (pageindex) => {
        handlePageChange({
            pageIndex: pageindex,
            pageSize: pageSize
        })
    }

    return (
        <>
             <div className="card">
            {!HideHeader ? (
                 <ApplyFilter.Provider value={{fetchUser, exportData, roleFilter, dateFilter}}>
                     {
                         (tableDetail)
                         ? <GlobalFilter loader={loader} filter={TableData.search} setFilter={(e) => 
                            fetchUser({search: e})
                        } tableName={tableDetail.name} tableLink={tableDetail.link} tableClinicianId={tableDetail.clinician_id} /> 
                         : ""
                     }
                </ApplyFilter.Provider>
            ):null}
                <div className="card-body pt-0">   
                    <div className='dataTables_wrapper table-responsive'>
                        <table {...getTableProps()} className="table align-middle table-row-dashed fs-6 gy-5 mt-5">
                            <thead>
                                { headerGroups.map((headerGroup) => {
                                return <tr {...headerGroup.getHeaderGroupProps()} className="fw-bolder text-muted">
                                        {
                                            headerGroup.headers.map((column) => {
                                                // return  (HideHeader == true && column.id == "dob") ? '' : <th {...column.getHeaderProps()} className="w-10px pe-2 fw-bolder">{ column.render('Header') }</th>
                                                return  <th {...column.getHeaderProps()} className="w-10px pe-2 fw-bolder">{ column.render('Header') }</th>
                                            })
                                        }
                                    </tr>
                                }) }
                            </thead>
                            <tbody {...getTableBodyProps()} className="fw-bold text-gray-600">                
                                { page && page.length > 0
                                    ? page.map((row) => {
                                        prepareRow(row)
                                        return <tr {...row.getRowProps()}>
                                            {
                                                row.cells.map((cell) => (
                                                    <td {...cell.getCellProps()} style={style}>
                                                        { cell.render('Cell') }
                                                    </td>
                                                ))
                                            }
                                        </tr>
                                    }) 
                                   : <tr><td colSpan={5}><div className='w-100 mt-2 text-center'><b>No Data Found</b></div></td></tr>
                                }
                            </tbody>               
                        </table>                    
                        <div className="row">
                            <div className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'>
                                <div className='dataTables_length'>
                                    <label>
                                        <select id="" value={pageSize} onChange={(e) => setPageSize(parseInt(e.target.value))} className='form-select form-select-sm form-select-solid m-0'>
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                            <option value="15">15</option>
                                            <option value="20">20</option>
                                            <option value="25">25</option>
                                        </select>
                                    </label>
                                </div>
                            </div>
                            {
                                TableData.totalCount ?
                                    <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'>
                                        <Pagination onClickHandler={(e) => handlePageChange({
                                            pageIndex: e,
                                            pageSize: pageSize
                                        })} maxPage={Math.ceil(TableData.totalCount / pageSize)} index={pageIndex+1} previousPage={previousPageChange} nextPage={nextPageChange} />                             
                                    </div>
                                : null
                            }
                        </div>
                    </div>                    
                </div>                
            </div>    
        </>
    )
}   

export default TableIndex
