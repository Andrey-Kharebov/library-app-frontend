import React from 'react'

const SearchBar = ({ value, changeHandler }) => {
  
  return(
    <div className='search-bar'>
      <input value={ value } onChange={ event => changeHandler(event) } />
      <div className='search-bar__search-btn'>Search</div>
    </div>
  )
}

export default SearchBar