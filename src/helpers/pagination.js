const pagination = (currentPage, maxLength, perPage) => {
  let paginationArray = []
  const maxPage = Math.ceil(maxLength / perPage)

  if (maxPage <= 5) {
    for (let i = 0; i < maxPage; i++) {
      paginationArray.push({ name: i + 1, type: 'page' })
    }
  } else {
    if (currentPage !== 1) {
      paginationArray.push({ name: '<', type: 'prev' })
      paginationArray.push({ name: 1, type: 'page' })

      if (currentPage <= 3) {
        paginationArray.push({ name: 2, type: 'page' })
        paginationArray.push({ name: 3, type: 'page' })

        if (currentPage === 3){
          paginationArray.push({ name: 4, type: 'page' })
        }
      } else {
        paginationArray.push({ name: '...', type: 'delimeter' })

        if (maxPage - currentPage >= 3) {
          paginationArray.push({ name: currentPage - 1, type: 'page' })
          paginationArray.push({ name: currentPage, type: 'page' })
          paginationArray.push({ name: currentPage + 1, type: 'page' })
        }
      }

    } else {
      for (let i = 0; i < 3; i++) {
        paginationArray.push({ name: i + 1, type: 'page' })
      }
    }

    if (currentPage !== maxPage){
      if (maxPage - currentPage >= 3) {
        paginationArray.push({ name: '...', type: 'delimeter' })
      } else {
        paginationArray.push({ name: currentPage - 1, type: 'page' })
        paginationArray.push({ name: currentPage, type: 'page' })

        if (maxPage - currentPage >= 2) {
          paginationArray.push({ name: currentPage + 1, type: 'page' })
        }
      }

      paginationArray.push({ name: maxPage, type: 'page' })
      paginationArray.push({ name: '>', type: 'next' })
    } else {
      for (let i = maxPage - 3; i < maxPage; i++) {
        paginationArray.push({ name: i + 1, type: 'page' })
      }
    }
  }

  return paginationArray
}

export default pagination