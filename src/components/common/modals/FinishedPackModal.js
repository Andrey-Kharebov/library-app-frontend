import React, { useState } from 'react'
import ReactDOM  from 'react-dom'

import SectionWrapper from '../wrappers/SectionWrapper'

const Backdrop = () => {
  return <div className='backdrop' />
} 

const ModalOverlay = ({ words }) => {
  const [formWords, setFormWords] = useState(words.map(w => ({...w, checked: false})))

  const checkHandler = wordId => {
    setFormWords(formWords.map(w => {
      return w._id === wordId
        ? {...w, checked: !w.checked}
        : {...w}
    }))
  }

  const formSumbitHandler = event => {
    event.preventDefault()
    
    const formData = formWords.filter(w => w.checked)

    console.log(formData)
  }

  return (
    <SectionWrapper className='finished-pack-modal'>
      <span>Choose the words you want to cram again</span>
      <form onSubmit={ formSumbitHandler }>
        <ul>
          { words && words.map(w => {
            return (
              <li key={ w._id }>
                <input id={ `checkbox_${ w._id }` } type='checkbox' checked={ w.checked } onChange={ () => checkHandler(w._id) } />
                <label htmlFor={ `checkbox_${ w._id }` } >{ w.word }</label>
              </li>
            )
          }) }
        </ul>
        <button type='submit'>Submit</button>
      </form>
    </SectionWrapper>
  )
}

const FinishedPackModal = ({ words }) => {
  return (
    <>
      { ReactDOM.createPortal(<Backdrop />, document.getElementById('backdrop-root')) }
      { ReactDOM.createPortal(<ModalOverlay words={ words } />, document.getElementById('overlay-root')) }
    </>
  )
}

export default FinishedPackModal