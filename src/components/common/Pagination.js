import React from 'react'

import pagination from '../../helpers/pagination'

const Pagination = ({ currentPage, setCurrentPage, maxLength, perPage=10 }) => {

  const paginationArray = pagination(currentPage, maxLength, perPage)

  return (
    paginationArray.length > 1 
      ? (
        <div className='pagination'>
          { paginationArray.map((i, idx) => {
            const parseIntPage = i.type === 'page' ? parseInt(i.name) : false
            
            switch(i.type) {
              case 'prev':
                return <span key={ idx } className='prevPage' onClick={ () => setCurrentPage(currentPage - 1) }>←</span>
              case 'next':
                return <span key={ idx } className='nextPage' onClick={ () => setCurrentPage(currentPage + 1) }>→</span>
              case 'delimeter':
                return <div key={ idx }><span>{ i.name }</span></div>
              default:
                return <div key={ idx } className={ parseIntPage === currentPage ? 'currentPage' : '' } onClick={ () => setCurrentPage(parseIntPage) }><span>{ i.name }</span></div>
            }
          })}
        </div>
      ) : null
  )
}

export default Pagination