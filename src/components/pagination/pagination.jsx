import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {
  PaginationWrapper,
  Page,
  ControlSection,
  PageControl
} from "./pagination.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faAngleRight, faAngleLeft} from "@fortawesome/free-solid-svg-icons";

const Pagination = ({page, totalPages, onPageClick, dataTestId}) => {
  const [rangeStart, setStart] = useState(1);
  const [rangeEnd, setEnd] = useState(5);
  useEffect(() => {
    if(totalPages < 5){
      setStart(1);
      setEnd(totalPages);
    }
    // This logic is called when mounting the component.
    // based on the page / totalPages, we need to determine the page range to render.
    if(page+2 <= totalPages && page-2 >= 1){
      setStart(page-2);
      setEnd(page+2);
    }
    // Edge-case for if we mount the component with a page value of totalPages-1
    else if(page+1 === totalPages) {
      setStart(totalPages-4);
      setEnd(totalPages);
    }
    else if(page-4 >= 1) {
      setStart(page-4);
      setEnd(page);
    }
  }, []);

  // If totalPages updates for any reason, we may need to recalculate the range.
  useEffect(() => {
    // When the totalPages is updated and it is less than the rangeEnd, we _may_ need to recalculate the range we show.
    if(totalPages < rangeEnd && totalPages-4 >= 1) {
      setStart(totalPages-4);
      return setEnd(totalPages);
    }
    if(totalPages < rangeEnd){
      setStart(1);
      return setEnd(totalPages);
    }

    if(totalPages > rangeEnd && totalPages <= 5) {
      setStart(1);
      return setEnd(totalPages);
    }
    if(totalPages > rangeEnd && page===rangeEnd-1 && page+2 <= totalPages) {
      setStart(page-2);
      return setEnd(page+2);
    }
    if(totalPages > rangeEnd && page===rangeEnd && page+1 <= totalPages) {
      setStart(page-3);
      return setEnd(page+1);
    }

  }, [totalPages])

  const _fetchAndUpdateRange = (page, start, end) => {
    onPageClick(page);
    setStart(start);
    setEnd(end);
  };

  const _onClick = (clickedPage) => {
    if(totalPages <= 5)
      return onPageClick(clickedPage);

    // // First was clicked
    if(clickedPage === 1)
      return _fetchAndUpdateRange(clickedPage, 1, 5);
    // Last was clicked
    if(clickedPage === totalPages)
      return _fetchAndUpdateRange(clickedPage, totalPages-4, totalPages);
    // 4th item was clicked
    if(clickedPage === rangeEnd-1 && rangeEnd-1+2 <= totalPages) {
      const newEnd = rangeEnd-1+2;
      return _fetchAndUpdateRange(clickedPage, newEnd-4, newEnd);
    }
    //5th item was clicked
    if(clickedPage === rangeEnd && rangeEnd+1 <= totalPages) {
      const newEnd = rangeEnd+1;
      return _fetchAndUpdateRange(clickedPage, newEnd-4, newEnd);
    }
    //2nd item was clicked
    if(clickedPage === rangeStart+1 && rangeStart+1-2 >= 1) {
      const newStart = rangeStart+1-2;
      return _fetchAndUpdateRange(clickedPage, newStart, newStart+4);
    }
    //1st item is clicked
    if(clickedPage === rangeStart && rangeStart-1 >= 1) {
      const newStart = rangeStart-1;
      return _fetchAndUpdateRange(clickedPage, newStart, newStart+4);
    }

    // If none of the above, just fetch the page data.
    onPageClick(clickedPage);
  };

  const _renderPages = () => {
    let pageElements = [];
    for(let i=rangeStart; i<=rangeEnd;i++){
      const pageElement = (
        <Page key={i} current={i===page} onClick={() => _onClick(i)}>
          {i}
        </Page>
      );
      pageElements = pageElements.concat(pageElement);
    }
    return pageElements;
  };

  const wrapperProps = dataTestId ? {["data-testid"]: dataTestId} : {};
  const firstProps = {
    onClick: () => _onClick(1)
  };
  const lastProps = {
    onClick: () => _onClick(totalPages)
  };
  const prevProps = {
    small: true,
    onClick: () => page > 1 && _onClick(page-1)
  };
  const nextProps = {
    small: true,
    onClick: () => page !== totalPages && _onClick(page+1)
  };
  // Attach dataTestId if provided
  if(dataTestId){
    firstProps["data-testid"] = `${dataTestId}.first`;
    lastProps["data-testid"] = `${dataTestId}.last`;
    nextProps["data-testid"] = `${dataTestId}.next`;
    prevProps["data-testid"] = `${dataTestId}.prev`;
  }

  return (
    <PaginationWrapper {...wrapperProps}>
      <ControlSection>
        <PageControl {...firstProps}>
          First
        </PageControl>
        <PageControl {...prevProps}>
          <FontAwesomeIcon icon={faAngleLeft} fixedWidth/>
        </PageControl>
      </ControlSection>
      {_renderPages()}
      <ControlSection>
        <PageControl {...nextProps}>
          <FontAwesomeIcon icon={faAngleRight} fixedWidth/>
        </PageControl>
        <PageControl {...lastProps}>
          Last
        </PageControl>
      </ControlSection>
    </PaginationWrapper>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number,
  onPageClick: PropTypes.func.isRequired,
  dataTestId: PropTypes.string
};

export default Pagination;
