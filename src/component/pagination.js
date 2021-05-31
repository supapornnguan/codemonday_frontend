import React from "react"

const pagination = ({postPerPage, totalPost, paginate}) => {
    const pageNumbers = [];

    for(let i = 1 ; i <= Math.ceil(totalPost / postPerPage); i++){
        pageNumbers.push(i);
    }

    return (
        <div>
            <ul className='pagination'>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <p onClick={() => paginate(number)} className='page-link' style={{backgroundColor: 'rgba(0,0,0,0)', color:"#ffff"}}>
                            {number}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default pagination