import React, { useState } from 'react'
import ReactDOM  from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { finishPack } from '../../../store/languages-slice/languages-thunks'

import Loader from '../Loader'
import Error from '../Error'
import SectionWrapper from '../wrappers/SectionWrapper'

const Backdrop = () => {
  return <div className='backdrop' />
} 

const ModalOverlay = ({ wordsPack }) => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.authReducer.token)
  const loadingObj = useSelector(state => state.uiReducer.loadingObj)
  const errorObj = useSelector(state => state.uiReducer.errorObj)

  const [formWords, setFormWords] = useState(wordsPack.words.map(w => ({...w, checked: false})))

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

    dispatch(finishPack(token, wordsPack._id, formData))
  }

  if (loadingObj && (loadingObj.type === 'finishPack')) return <SectionWrapper className='finished-pack-modal'><Loader /></SectionWrapper>
  if (errorObj && (errorObj.type === 'finishPack')) return <SectionWrapper className='finished-pack-modal'><Error /></SectionWrapper>

  return (
    <SectionWrapper className='finished-pack-modal'>
      <span>Choose the words you want to cram again</span>
      <form onSubmit={ formSumbitHandler }>
        <ul>
          { wordsPack && wordsPack.words.map((w, idx) => {
            return (
              <li key={ idx }>
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

const FinishedPackModal = ({ wordsPack }) => {
  return (
    <>
      { ReactDOM.createPortal(<Backdrop />, document.getElementById('backdrop-root')) }
      { ReactDOM.createPortal(<ModalOverlay wordsPack={ wordsPack } />, document.getElementById('overlay-root')) }
    </>
  )
}

export default FinishedPackModal