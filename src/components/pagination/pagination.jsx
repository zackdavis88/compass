import React from "react";
import PropTypes from "prop-types";
import {PaginationWrapper, Page} from "./pagination.styles";

const Pagination = ({itemsPerPage, page, totalPages, onPageClick}) => {
  const _renderPages = () => {
    let pageElements = [];
    for(let i=1; i<=totalPages;i++){
      const pageElement = (
        <Page key={i} current={i===page} onClick={() => onPageClick(i)}>
          {i}
        </Page>
      );
      pageElements = pageElements.concat(pageElement);
    }
    return pageElements;
  };
  return (
    <PaginationWrapper>
      {_renderPages()}
    </PaginationWrapper>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  onPageClick: PropTypes.func.isRequired
};

export default Pagination;
