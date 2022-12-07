import Header from '../Header'

import SideNavbar from '../SideNavbar'

import AlignSavedVideoItem from '../AlignSavedVideoItem'

import PageThemeContext from '../../context/PageThemeContext'

import './index.css'

const SavedVideos = () => (
  <PageThemeContext.Consumer>
    {value => {
      const {isDark, savedVideoList} = value
      const theme = isDark ? 'dark' : 'light'
      const fontTheme = isDark ? 'font-light' : 'font-dark'
      return (
        <>
          <Header />
          <div className="saved-videos-container">
            <SideNavbar />
            {savedVideoList.length > 0 ? (
              <div className="display-saved-videos">
                <h1>Saved Videos</h1>
                {savedVideoList.map(each => (
                  <AlignSavedVideoItem key={each.id} getItem={each} />
                ))}
              </div>
            ) : (
              <ul className={`${theme} saved-page-container`}>
                <img
                  className="no-saved-img"
                  alt="no saved videos"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                />
                <h1 className={`${fontTheme}`}>No saved videos found</h1>
                <p className={`${fontTheme} no-saved-para`}>
                  You can save your videos while watching them
                </p>
              </ul>
            )}
          </div>
        </>
      )
    }}
  </PageThemeContext.Consumer>
)
export default SavedVideos
