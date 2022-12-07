import {HiMoon} from 'react-icons/hi'

import Popup from 'reactjs-popup'

import {Link, withRouter} from 'react-router-dom'

import {BsBrightnessHigh} from 'react-icons/bs'

import Cookies from 'js-cookie'

import PageThemeContext from '../../context/PageThemeContext'

import './index.css'

const Header = props => {
  const onClickLogoutBtn = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <PageThemeContext.Consumer>
      {value => {
        const {isDark, changeTheme} = value
        const headerTheme = isDark ? 'headerDark' : 'headerLight'
        const fontTheme = isDark ? 'font-light' : 'font-dark'
        const logoImage = isDark
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

        const lightdarkIcon = isDark ? (
          <BsBrightnessHigh className="theme-icon" />
        ) : (
          <HiMoon className="theme-icon" />
        )
        const changePageTheme = () => {
          changeTheme()
        }
        return (
          <div className={`${headerTheme} header-container`}>
            <Link to="/">
              <img
                className="header-logo-img"
                alt="website logo"
                src={logoImage}
              />
            </Link>
            <div className="header-side-part-container">
              <button
                data-testid="theme"
                onClick={changePageTheme}
                type="button"
                className="theme-button"
              >
                {lightdarkIcon}
              </button>

              <img
                className="header-profile-img"
                alt="profile"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              />
              <Popup
                trigger={
                  <button type="button" className={`${fontTheme} logout-btn`}>
                    Logout
                  </button>
                }
                position="bottom right"
              >
                {close => (
                  <div className="logout-popup-page">
                    <p className="logout-page">
                      Are you sure, you want to logout
                    </p>
                    <div className="cancel-btn-container">
                      <button
                        onClick={() => close()}
                        type="button"
                        className="cancel-btn"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={onClickLogoutBtn}
                        type="button"
                        className="conform-btn"
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                )}
              </Popup>
            </div>
          </div>
        )
      }}
    </PageThemeContext.Consumer>
  )
}
export default withRouter(Header)
