import React from 'react'
import { useNavigate, useParams } from 'react-router-dom' 

const navList = [
  { title: 'Languages', abbr: 'LG', url: 'languages' }
]

const Navigation = () => {
  const navigate = useNavigate()
  const { firstParam } = useParams()

  return (
    <div className='navigation'>
      <div className='navigation__main-btn' onClick={ () => navigate('/') }></div>
      <div className='navigation__content'>
        { navList.map((i, idx) => {
          return (
            <div
              key={ idx }
              className={ `navigation__content-icon ${ firstParam && firstParam === i.url && 'active' }` }
              onClick={ () => navigate(`/${ i.url }`) }
            >{ i.abbr }</div>
          )
        })}
      </div>
    </div>
  )
}

export default Navigation