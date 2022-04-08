import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Loader from '../../../../../../common/Loader'
import Error from '../../../../../../common/Error'
import WordCard from './WordCard'
import ActionsBlock from './ActionsBlock'
import LevelsBlock from './LevelsBlock'

import currentLevelSetter from '../../../../../../../helpers/currentLevelSetter'
import FinishedPackModal from '../../../../../../common/modals/FinishedPackModal'

const WordCardBlock = ({ langTitleObj, wordsPack }) => {
  const loadingObj = useSelector(state => state.uiReducer.loadingObj)
  const errorObj = useSelector(state => state.uiReducer.errorObj)

  const levels = [1, 2, 3, 4, 5]
  const [currentLevel, setCurrentLevel] = useState(currentLevelSetter(wordsPack.words))
  const currentWord = wordsPack.words.find(w => w.level === currentLevel)
  const levelWordsArrLength = wordsPack.words.filter(i => i.level === currentLevel).length

  if (levelWordsArrLength === 0) {
    setCurrentLevel(currentLevelSetter(wordsPack.words))
  }
    
  if (loadingObj && (loadingObj.type === 'changeWordLevel')) return <div className='word-card-block'><Loader /></div>
  if (errorObj && (errorObj.type === 'changeWordLevel')) return <div className='word-card-block'><Error /></div>

  return (
    <div className='word-card-block'>
      <WordCard currentWord={ currentWord } />
      <ActionsBlock wordsPackId={ wordsPack._id } currentWord={ currentWord } />
      <LevelsBlock levels={ levels } currentLevel={ currentLevel } setCurrentLevel={ setCurrentLevel } words={ wordsPack.words } />
      { currentLevel === 6 && levelWordsArrLength === 20 && <FinishedPackModal wordsPack={ wordsPack } /> }
    </div>
  )
}


// const WordCardBlock = ({ languageTitleObj }) => {
//   const levels = [1, 2, 3, 4, 5]
//   const languageObj = useSelector(state => state.languagesReducer.languagesObjs).find(lo => lo._id === languageTitleObj._id)
//   const wordsPack = languageObj && languageObj.wordsPacks.find(wp => wp.active)
//   const [currentLevel, setCurrentLevel] = useState(wordsPack && currentLevelSetter(wordsPack.words))
//   const currentWord = wordsPack && currentLevel && wordsPack.words.find(w => w.level === currentLevel)
//   const levelWordsArrLength = wordsPack && currentLevel && wordsPack.words.filter(i => i.level === currentLevel).length
  
//   let wordsPackId
//   let wordsPackWords 

//   if (wordsPack) {
//     wordsPackId = wordsPack._id
//     wordsPackWords = wordsPack.words
//   }
//   useEffect(() => { //  при изменении active wordsPack
//     setCurrentLevel(wordsPackId && currentLevelSetter(wordsPackWords))
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [wordsPackId])

//   useEffect(() => { // если на тек. уровне больше нет слов
//     if (levelWordsArrLength === 0) {
//       setCurrentLevel(wordsPack && currentLevelSetter(wordsPack.words))
//     }
//   }, [wordsPack, levelWordsArrLength])
  
//   if (!wordsPack) return null
//   return (
//     <div className='word-card-block'>
//       <WordCard languageTitleObj={ languageTitleObj } currentWord={ currentWord } />
//       <ActionsBlock languageTitleObj={ languageTitleObj } wordsPackId={ wordsPack && wordsPack._id } currentWord={ currentWord && currentWord } />
//       <LevelsBlock languageTitleObj={ languageTitleObj } levels={ levels } currentLevel={ currentLevel } setCurrentLevel={ setCurrentLevel } words={ wordsPack.words } currentWord={ currentWord && currentWord } />
//       { currentLevel === 6 && levelWordsArrLength === 20 && <FinishedPackModal wordsPack={ wordsPack } />}
//     </div>
//   )
// }

export default WordCardBlock