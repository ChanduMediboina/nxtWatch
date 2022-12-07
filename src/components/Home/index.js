import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {AiOutlineSearch} from 'react-icons/ai'

import {GrClose} from 'react-icons/gr'

import VideosItem from '../VideosItem'

import SideNavbar from '../SideNavbar'

import PageThemeContext from '../../context/PageThemeContext'

import Header from '../Header'

import './index.css'

const httpCallStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    videosList: [],
    apiStatus: httpCallStatus.initial,
    getSearchData: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getVideosData()
  }

  getVideosData = async () => {
    this.setState({apiStatus: httpCallStatus.loading})
    const {getSearchData} = this.state
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const url = `https://apis.ccbp.in/videos/all?search=${getSearchData}`

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data.videos)
      const updateToCamelCase = data.videos.map(each => ({
        channel: {
          name: each.channel.name,
          profileImageUrl: each.channel.profile_image_url,
        },
        id: each.id,
        publishedAt: each.published_at,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
      }))
      this.setState({
        videosList: [...updateToCamelCase],
        apiStatus: httpCallStatus.success,
      })
      console.log(updateToCamelCase)
    } else {
      this.setState({apiStatus: httpCallStatus.failure})
    }
  }

  getSearchInput = () => {
    const {searchInput} = this.state
    this.setState({getSearchData: searchInput}, this.getVideosData)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getSuccessFulApiCall = () => {
    const {videosList} = this.state
    return (
      <>
        {videosList.length > 0 ? (
          <ul className="video-ul-container">
            {videosList.map(each => (
              <VideosItem key={each.id} getItem={each} />
            ))}
          </ul>
        ) : (
          <div className="no-result-container">
            <img
              className="no-videos-img"
              alt="no videos"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png "
            />
            <h1>No Search results found</h1>
            <p className="no-result-para">
              Try different key words or remove search filter
            </p>

            <button
              onClick={() =>
                this.setState({getSearchData: ''}, this.getVideosData)
              }
              type="button"
              className="try-again-btn"
            >
              Retry
            </button>
          </div>
        )}
      </>
    )
  }

  isLoading = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#3b82f6" height={40} width={60} />
    </div>
  )

  apiFailureCall = () => (
    <div className="failure-container">
      <img
        className="video-failure-img"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
      />
      <h1 className="failure-home-page-container">
        Oops! Something Went Wrong
      </h1>
      <p className="failure-home-para">
        We are having some trouble to complete your request.
        <br /> Please try again
      </p>
      <button type="button" className="retry-btn">
        Retry
      </button>
    </div>
  )

  apiConditionalFunction = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'SUCCESS':
        return this.getSuccessFulApiCall()
      case 'LOADING':
        return this.isLoading()
      case 'FAILURE':
        return this.apiFailureCall()
      default:
        return null
    }
  }

  render() {
    return (
      <PageThemeContext.Consumer>
        {value => {
          const {isDark} = value
          const theme = isDark ? 'dark' : 'light'
          return (
            <>
              <Header />
              <div className={`${theme} home-page-container`}>
                <SideNavbar getNavItems="getNavItems" />
                <div data-testid="banner" className="home-right-page-container">
                  <div className="premium-page-container">
                    <div className="close-container">
                      <button
                        data-testid="close"
                        type="button"
                        className="close-btn"
                      >
                        <GrClose className="close-icon" />
                      </button>
                    </div>
                    <img
                      className="home-logo-img"
                      alt="nxt watch logo"
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    />
                    <p className="buy-premium-heading">
                      Buy Nxt Watch Premium prepaid plan with UPI
                    </p>
                    <button type="button" className="get-now-btn">
                      GET IT NOW
                    </button>
                  </div>
                  <div className="search-container">
                    <input
                      onChange={this.onChangeSearchInput}
                      placeholder="Search"
                      className="input-element"
                      type="search"
                    />
                    <button
                      data-testid="searchButton"
                      onClick={this.getSearchInput}
                      type="button"
                      className="search-btn"
                    >
                      <AiOutlineSearch className="search-icon " />
                    </button>
                  </div>
                  {this.apiConditionalFunction()}
                </div>
              </div>
            </>
          )
        }}
      </PageThemeContext.Consumer>
    )
  }
}

export default Home
