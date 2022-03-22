import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import WordCard from './WordCard'
import ActionsBlocks from './ActionsBlocks'
import LevelsBlock from './LevelsBlock'

import currentLevelSetter from '../../../../../../../helpers/currentLevelSetter'

const WordCardBlock = ({ languageTitleObj }) => {
  const levels = [1, 2, 3, 4, 5]
  const languageObj = useSelector(state => state.languagesReducer.languagesObjs).find(lo => lo._id === languageTitleObj._id)
  const wordsPack = languageObj && languageObj.wordsPacks.find(wp => wp.active)
  const [currentLevel, setCurrentLevel] = useState(wordsPack && currentLevelSetter(wordsPack.words))
  const currentWord = wordsPack && currentLevel && wordsPack.words.find(w => w.level === currentLevel)
  const levelWordsArrLength = wordsPack && currentLevel && wordsPack.words.filter(i => i.level === currentLevel).length

  useEffect(() => { //  при изменении active wordsPack
    setCurrentLevel(wordsPack && currentLevelSetter(wordsPack.words))
  }, [wordsPack])

  useEffect(() => { // если на тек. уровне больше нет слов
    if (levelWordsArrLength === 0) {
      setCurrentLevel(wordsPack && currentLevelSetter(wordsPack.words))
    }
  }, [wordsPack, levelWordsArrLength])

  if (!wordsPack) return null
  return (
    <div className='word-card-block'>
      <WordCard languageTitleObj={ languageTitleObj } currentWord={ currentWord } />
      <ActionsBlocks languageTitleObj={ languageTitleObj } wordsPackId={ wordsPack && wordsPack._id } currentWordId={ currentWord && currentWord._id } />
      <LevelsBlock languageTitleObj={ languageTitleObj } levels={ levels } currentLevel={ currentLevel } setCurrentLevel={ setCurrentLevel } words={ wordsPack.words } currentWordId={ currentWord && currentWord._id } />
    </div>
  )
}

export default WordCardBlock