import React from 'react'

const PageWrapper = props => {
  return (
    <div className={ `page-wrapper ${ props.className }` }>
      <span>{ props.title }</span>
      { props.children }
    </div>
  )
}

export default PageWrapper