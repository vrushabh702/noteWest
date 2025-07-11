import React from "react";
const MAX_PAGE_BUTTONS = 5;

function Pagination({ index, maxPage, onClickHandler, nextPage, previousPage }) {

  const getPageNumbers = () => {
    const pageNumbers = [];
    let start = 1;
    let end = maxPage;

    if (index > MAX_PAGE_BUTTONS / 2) {
      start = Math.max(index - Math.floor(MAX_PAGE_BUTTONS / 2), 1);
      end = Math.min(start + MAX_PAGE_BUTTONS - 1, maxPage);
    } else {
      end = Math.min(MAX_PAGE_BUTTONS, maxPage);
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const handlePrevClick = () => {
    previousPage(index -1 - 1);
  };

  const handleNextClick = () => {
    nextPage(index -1 + 1);
  };

  const handlePageClick = (pageNumber) => {
    onClickHandler(pageNumber-1);
  };

  const canNextPageClass = (index === maxPage ? 'disableButton' : 'activeButton')
  return (
    <div className='dataTables_paginate paging_simple_numbers'>
      <ul className="pagination">
        <li className="paginate_button page-item previous" >
            <button onClick={handlePrevClick} disabled={index === 1} className={(index === 1 ? 'disableButton' : 'activeButton')+" page-link"} id='kt_customers_table_previous'>
                <i className="previous"></i>
            </button>
        </li>
        {(index-1) > MAX_PAGE_BUTTONS / 2  ? (
            <li className="paginate_button page-item" >
                <button onClick={() => handlePageClick(1)}  className={" page-link"} >
                  <span>...</span>
                </button>
            </li>
        ) : ''}
        {getPageNumbers().map((page, i) => {
          return (        
            <React.Fragment key={page+i}>
              <li className={"paginate_button page-item " + (page === (parseInt(index)) ? 'active' : '')}>         
                  <button
                    onClick={() => handlePageClick(page)} 
                    key={i + page}
                    className={" page-link"}
                  >
                      {page}
                  </button>
              </li>
            </React.Fragment>
          );        
        })}
        {index < maxPage - MAX_PAGE_BUTTONS / 2 ? (
            <li className="paginate_button page-item" >
                <button onClick={() => handlePageClick(maxPage)}  className={" page-link"} >
                  <span>...</span>
                </button>
            </li>
        ) : ''}    
        <li className="paginate_button page-item next">
            <button onClick={handleNextClick} disabled={index === maxPage} className={canNextPageClass+" page-link"}>
                <i className="next"></i>
            </button>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
