import React from 'react'

const LevelsBlock = ({ languageTitleObj }) => {
  const levels = [1, 2, 3, 4, 5, 6]

  return (
    <div className='levels-block'>
      { levels.map(l => {
        return (
          <span className={ `level` }>
            { l }
          </span>
        )
      })}
    </div>
  )
}

export default LevelsBlock