import React, { useEffect, useState } from 'react'

const WordCard = ({ languageTitleObj, currentWord }) => {
  const [frontSide, setFrontSide] = useState(true)

  useEffect(() => {
    setFrontSide(true)
  }, [currentWord])

  const cardSideHandler = () => {
    setFrontSide(a => !a)
  }

  if ( !currentWord ) return null 
 
  return (
    <div className='word-card' onClick={ cardSideHandler }>
      { frontSide
        ? (
          currentWord.level === 5 ? <span>{ currentWord.translation }</span> : <span>{ currentWord.word }</span>
        ) : (
          <>
            { currentWord.level === 5 ? <span>{ currentWord.word }</span> : <span>{ currentWord.translation }</span> }
            <span>{ currentWord.example }</span> 
          </>
        ) }
    
    </div>
  )
}

export default WordCard