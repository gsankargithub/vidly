import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = (props) => {
  const { itemsCount, pageSize, CurrentPage, OnPageChange } = props;
  console.log(CurrentPage);

  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === CurrentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => OnPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  CurrentPage: PropTypes.number.isRequired,
  OnPageChange: PropTypes.func.isRequired,
};

export default Pagination;
