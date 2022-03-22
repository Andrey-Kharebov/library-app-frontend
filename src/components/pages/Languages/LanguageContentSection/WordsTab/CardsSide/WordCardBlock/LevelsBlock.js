import React from 'react'

const LevelsBlock = ({ languageTitleObj, levels, currentLevel, setCurrentLevel, words, currentWordId }) => {
  const changeLevelHandler = (l, levelWordsArrLength) => {
    if (levelWordsArrLength === 0) return 
    setCurrentLevel(l)
  }

  if (!currentWordId) return null
  return (
    <div className='levels-block'>
      { levels.map(l => {
        const levelWordsArrLength = words.filter(i => i.level === l).length
        return (
          <span 
            key={ l } 
            className={ `level ${ currentLevel === l && 'active' }` }
            onClick={ () => changeLevelHandler(l, levelWordsArrLength) }
          >
            { levelWordsArrLength }
          </span>
        )
      })}
    </div>
  )
}

export default LevelsBlock