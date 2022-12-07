import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {GrClose} from 'react-icons/gr'

import {AiOutlineSearch} from 'react-icons/ai'

import VideosItem from '../VideosItem'

import Header from '../Header'

import SideNavbar from '../SideNavbar'

import PageThemeContext from '../../context/PageThemeContext'

import './index.css'

const httpCallStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class Trending extends Component {
  state = {
    trendingVideosList: [],
    apiStatus: httpCallStatus.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({apiStatus: httpCallStatus.loading})

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const url = `https://apis.ccbp.in/videos/trending`
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const trendingVideosUpdatedToCamelCase = data.videos.map(each => ({
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
        trendingVideosList: [...trendingVideosUpdatedToCamelCase],
        apiStatus: httpCallStatus.success,
      })
    } else {
      this.setState({apiStatus: httpCallStatus.failure})
    }
  }

  successfulApiCall = () => {
    const {trendingVideosList} = this.state
    return (
      <>
        {trendingVideosList.length > 0 ? (
          <ul className="video-ul-container">
            {trendingVideosList.map(video => (
              <VideosItem key={video.id} getItem={video} />
            ))}
          </ul>
        ) : (
          <div className="no-result-container">
            <img
              className="no-videos-img"
              alt="no videos"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png "
            />
            <h1>No Search result found</h1>
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

  getApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'SUCCESS':
        return this.successfulApiCall()
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
          const theme = isDark ? 'dark' : 'light '
          return (
            <>
              <Header />
              <div className="trend-container">
                <SideNavbar />
                <div className={`${theme} home-right-page-container`}>
                  {this.getApiStatus()}
                </div>
              </div>
            </>
          )
        }}
      </PageThemeContext.Consumer>
    )
  }
}
export default Trending
