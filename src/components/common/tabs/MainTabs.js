import React from 'react'

const MainTabs = ({ items, onTabClick, tab }) => {
  const tabItems = items && items.length
    ? items.map((i, idx) => {
      return (
        <div 
          key={ idx }
          className={ `main-tabs__item ${ tab === idx ? 'active' : '' }` }
          onClick={ () => onTabClick(idx) }
        >{ i.name }</div>
      )
    })
    : null

  return  <div className='main-tabs'>{ tabItems }</div>
}

export default MainTabs