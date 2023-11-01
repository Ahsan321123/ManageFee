import React from "react";
import Pagination from "react-js-pagination";
import "./Pagination.css";
const PaginationComp = ({
  students,
  totalStudentsCount,
  pages,
  currentPage,
  setCurrentPage,
  handlePage,
  classFilter,
  filterData,
  
}) => {
  return (
    <div className="PaginationContainer">
      {   totalStudentsCount>10 &&
        <div className="paginationWrapper">
          <Pagination
            activePage={currentPage}
            totalItemsCount={totalStudentsCount}
            itemsCountPerPage={10}
            pageRangeDisplayed={5}
            onChange={handlePage}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass=" pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        </div>
      }
    </div>
  );
};

export default PaginationComp;