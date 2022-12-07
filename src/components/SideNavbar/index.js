import {Link} from 'react-router-dom'

import {AiFillHome, AiFillFire} from 'react-icons/ai'

import {SiYoutubegaming} from 'react-icons/si'

import {MdPlaylistAdd} from 'react-icons/md'

import PageThemeContext from '../../context/PageThemeContext'

import './index.css'

const SideNavbar = props => {
  const {getNavItems} = props
  return (
    <PageThemeContext.Consumer>
      {value => {
        const {isDark} = value
        const fontTheme = isDark ? 'font-light' : 'font-dark'
        const theme = isDark ? 'dark' : 'light'
        return (
          <div className={`side-navbar ${theme}`}>
            <Link to="/" className="link">
              <div className="home-icon-heading-container">
                <AiFillHome className="side-nav-icons" />
                <h1 className={`home-heading ${fontTheme}`}>Home</h1>
              </div>
            </Link>
            <Link className="link" to="/trending">
              <div className="home-icon-heading-container">
                <AiFillFire className="side-nav-icons" />
                <h1 className={`home-heading ${fontTheme}`}>Trending</h1>
              </div>
            </Link>
            <Link className="link" to="/gaming">
              <div className="home-icon-heading-container">
                <SiYoutubegaming className="side-nav-icons" />
                <h1 className={`home-heading ${fontTheme}`}>Gaming</h1>
              </div>
            </Link>
            <Link className="link" to="/saved-videos">
              <div className="home-icon-heading-container">
                <MdPlaylistAdd className="side-nav-icons" />
                <h1 className={`home-heading ${fontTheme}`}>Saved videos</h1>
              </div>
            </Link>
            <div className="contact-us-container">
              <p className="contact-us-para">CONTACT US</p>
              <div className="social-media-container">
                <img
                  className="facebook-img"
                  alt="facebook logo"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png "
                />
                <img
                  className="facebook-img"
                  alt="twitter logo"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                />
                <img
                  className="facebook-img"
                  alt="linked in logo"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                />
              </div>
              <p className="enjoy-para">
                Enjoy! Now to see your channels and recommendations!
              </p>
            </div>
          </div>
        )
      }}
    </PageThemeContext.Consumer>
  )
}
export default SideNavbar
