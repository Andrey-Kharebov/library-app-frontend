import React from 'react'

const SectionWrapper = props => {
  return (
    <div className={ `section-wrapper ${ props.className ? props.className : '' }` }>
      { props.children }
    </div>
  )
}

export default SectionWrapper
