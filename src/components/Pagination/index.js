import React from 'react'
import {
    Link
} from "gatsby"

import './index.scss';

const Pagination = (props) => (
    <div className={"Pagination" + (props.slim ? " Pagination--slim" : "")}>

        <span className="Pagination-state">
            { props.slim && 
                <>Page </>
            }
            {props.pageContext.pageNumber} of {props.pageContext.totalPages}
        </span>

        { !props.slim && 
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
        }
    </div>
);

export default Pagination;

Pagination.defaultProps = { slim: false };
