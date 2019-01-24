import React from 'react'
import {
    Link
} from "gatsby"

import './index.scss';

export default (props) => (
    <div className="Pagination">

        <span className="Pagination-state">
            {props.pageContext.pageNumber} of {props.pageContext.totalPages}
        </span>

        <ul className="Pagination-list">
            <li className="Pagination-item">
                <Link 
                    className={props.pageContext.hasPreviousPage ? "" : "is-inactive"}
                    to={props.pageContext.previousPageLink}
                >Previous</Link>
            </li>

            <li className="Pagination-item">
                <Link 
                    className={props.pageContext.hasNextPage ? "" : "is-inactive"}
                    to={props.pageContext.nextPageLink}>Next</Link>
            </li>
        </ul>
    </div>
)
