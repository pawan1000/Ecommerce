import React, { useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

const Pagination = ({ totalRecords }) => {
    let end = Math.ceil(totalRecords / 4);
    const pages = Array.from({ length: end }, (_, i) => i + 1);
    let navigate = useNavigate();

    const [first,setFirst]=useState(1);
    const [second,setSecond]=useState(2);
    const [third,setThird]=useState(3);


    const [searchParams, setSearchParams] = useSearchParams();
    let page = searchParams.get('page') || 1;
    const [currentPage, setCurrentPage] = useState(page);
    function fetchRecords(page) {
        setCurrentPage(page);
        navigate(`?page=${page}`)
    }

    function previousPage(page) {
        page == 1 ? setCurrentPage(1)  : setCurrentPage(page - 1) ;
        page > 1  ? navigate(`?page=${page-1}`) : navigate(`?page=${page}`)
        if(page >1 && page ==first)
            {
                setSecond(first)
                setFirst(page-1)
            }
    }

    function nextPage(page) {
        page == end ? setCurrentPage(end) : setCurrentPage(page + 1);
        page <  end ? navigate(`?page=${page+1}`) : navigate(`?page=${page}`)
        if(page>=2 && page <end )
            {
                setFirst(second);
                setSecond(page+1)
            }
    }

    if (totalRecords > 0)
        return (
            <div className='d-flex justify-content-center'>
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        {
                            (end < 3 && end >1)  && (pages.map(page => {
                                return (
                                    <li className="page-item" style={{ cursor: 'pointer' }} ><a className="page-link" onClick={() => { fetchRecords(page) }}>{page}</a></li>
                                )
                            })
                            )
                        }
                        {end >= 3 && (
                            <>
                                <li className="page-item" style={{ cursor: 'pointer' }}>
                                    <a className="page-link" onClick={() => previousPage(currentPage)}>
                                        Previous
                                    </a>
                                </li>

                                <li className="page-item" style={{ cursor: 'pointer' }}>
                                    <a className={`page-link ${first === currentPage ? 'active' : ''}`} onClick={() => fetchRecords(first)}>
                                        {first}
                                    </a>
                                </li>
                                <li className="page-item" style={{ cursor: 'pointer' }}>
                                    <a className={`page-link ${second === currentPage ? 'active' : ''}`} onClick={() => fetchRecords(second)}>
                                        {second}
                                    </a>
                                </li>
                                

                                <li className="page-item" style={{ cursor: 'pointer' }}>
                                    <a className="page-link" onClick={() => nextPage(currentPage)}>
                                        Next
                                    </a>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        )
}

export default Pagination
