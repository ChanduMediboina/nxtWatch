import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      className="not-found-img"
      alt="not found"
      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
    />
    <h1>Page Not Found</h1>
    <p className="not-found-para">
      we are sorry, the page you requested could not be found.
    </p>
    <Link to="/">
      <button type="button" className="retry-btn">
        Retry
      </button>
    </Link>
  </div>
)
export default NotFound
