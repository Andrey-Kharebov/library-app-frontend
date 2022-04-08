import React from 'react'

const LevelsBlock = ({ levels, currentLevel, setCurrentLevel, words }) => {

  const changeLevelHandler = (l, levelWordsArrLength) => {
    const lastLevelWordsArrLength = words.filter(i => i.level === 5).length
    if (levelWordsArrLength === 0 || (l === 5 && lastLevelWordsArrLength < 20)) return 
    setCurrentLevel(l)
  }

  return (
    <div className='levels-block'>
      { levels.map(l => {
        const levelWordsArrLength = words.filter(i => i.level === l).length
        return (
          <span 
            key={ l } 
            className={ `level ${ currentLevel === l && 'active' } ${ l === 5 && 'last-level'}` }
            onClick={ () => changeLevelHandler(l, levelWordsArrLength) }
          >
            { levelWordsArrLength }
          </span>
        )
      })}
    </div>
  )
}

// const LevelsBlock = ({ languageTitleObj, levels, currentLevel, setCurrentLevel, words, currentWord }) => {
//   const changeLevelHandler = (l, levelWordsArrLength) => {
//     const lastLevelWordsArrLength = words.filter(i => i.level === 5).length
//     if (levelWordsArrLength === 0 || (l === 5 && lastLevelWordsArrLength < 20)) return 
//     setCurrentLevel(l)
//   }

//   if (!currentWord) return null
//   return (
    // <div className='levels-block'>
    //   { levels.map(l => {
    //     const levelWordsArrLength = words.filter(i => i.level === l).length
    //     return (
    //       <span 
    //         key={ l } 
    //         className={ `level ${ currentLevel === l && 'active' } ${ l === 5 && 'last-level'}` }
    //         onClick={ () => changeLevelHandler(l, levelWordsArrLength) }
    //       >
    //         { levelWordsArrLength }
    //       </span>
    //     )
    //   })}
    // </div>
//   )
// }

export default LevelsBlock