import React from 'react'

const SubTabs = ({ tab, setTab, data }) => {

  const tabItems = data.map((i, idx) => (
    <div 
      key={ idx }
      className={ `sub-tabs__item ${ tab === idx ? 'active' : '' }` }
      onClick={ () => setTab(idx) }
    >{ i }</div>
  ))
  return (
    <div className='sub-tabs'>
      { tabItems }
    </div>
  )
}

export default SubTabs