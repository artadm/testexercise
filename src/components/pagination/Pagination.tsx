import React from 'react';
import { getPagesArray } from '../../utils/pages';

interface Pagination {
    totalPages: number,
    page: number,
    changePage: (el: number) => void
}

const Pagination: React.FC<Pagination> = ({ totalPages, page, changePage }) => {
    let pagesArray = getPagesArray(totalPages);
    return (
        <div className="page__wrapper">
            {pagesArray.map(p =>
                <span
                    onClick={() => changePage(p)}
                    key={p}
                    className={page === p ? 'page page__current' : 'page'}
                >
                    {p}
                </span>
            )}
        </div>
    );
};

export default Pagination;
