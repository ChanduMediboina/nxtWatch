import {Link} from 'react-router-dom'

import PageThemeContext from '../../context/PageThemeContext'

import './index.css'

const VideosItem = props => {
  const {getItem} = props
  const {channel, id, publishedAt, thumbnailUrl, title, viewCount} = getItem
  const {name, profileImageUrl} = channel
  return (
    <Link to={`/videos/${id}`} className="link">
      <PageThemeContext.Consumer>
        {value => {
          const {isDark} = value
          const fontTheme = isDark ? 'font-light' : 'title-font-dark'
          return (
            <li className="videos-item-container">
              <img
                src={thumbnailUrl}
                className="thumbnail-img"
                alt="video thumbnail"
              />
              <div className="profile-title-container">
                <img
                  src={profileImageUrl}
                  alt="channel logo"
                  className="profile-img "
                />
                <div>
                  <p className={`${fontTheme} title`}>{title}</p>
                  <p className={`${fontTheme} views`}>{name}</p>
                </div>
              </div>
              <div className="video-side-content">
                <p className={`${fontTheme} views`}>{viewCount} views</p>
                <p className={`${fontTheme} views`}>{publishedAt}</p>
              </div>
            </li>
          )
        }}
      </PageThemeContext.Consumer>
    </Link>
  )
}
export default VideosItem
