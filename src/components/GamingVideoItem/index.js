import {Link} from 'react-router-dom'

import PageThemeContext from '../../context/PageThemeContext'

import './index.css'

const GamingVideoItem = props => {
  const {getItem} = props
  const {thumbnailUrl, id, title, viewCount} = getItem
  return (
    <Link to={`videos/${id}`} className="link">
      <PageThemeContext.Consumer>
        {value => {
          const {isDark} = value
          const fontTheme = isDark ? 'font-light' : 'font-dark'
          return (
            <li className="videos-item-container">
              <img
                src={thumbnailUrl}
                className="gaming-thumbnail-img"
                alt="video thumbnail"
              />
              <div>
                <p className={`title ${fontTheme}`}>{title}</p>
                <p className={`views ${fontTheme}`}>{viewCount} views</p>
              </div>
            </li>
          )
        }}
      </PageThemeContext.Consumer>
    </Link>
  )
}
export default GamingVideoItem
