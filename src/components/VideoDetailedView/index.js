import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import ReactPlayer from 'react-player'

import {BiLike, BiDislike} from 'react-icons/bi'

import {MdPlaylistAdd} from 'react-icons/md'

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

class VideoDetailedView extends Component {
  state = {
    detailedViewObj: '',
    saveContent: false,
    apiStatus: httpCallStatus.initial,
    likeBtnToggle: false,
    dislikeBtnToggle: false,
  }

  componentDidMount() {
    this.getDetailedView()
  }

  getDetailedView = async () => {
    this.setState({apiStatus: httpCallStatus.loading})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/videos/${id}`
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedToCamelCase = {
        channel: {
          name: data.video_details.channel.name,
          profileImageUrl: data.video_details.channel.profile_image_url,
          subscriberCount: data.video_details.channel.subscriber_count,
        },
        description: data.video_details.description,
        id: data.video_details.id,
        publishedAt: data.video_details.published_at,
        thumbnailsUrl: data.video_details.thumbnail_url,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        viewCount: data.video_details.view_count,
      }
      console.log(updatedToCamelCase)
      this.setState({
        detailedViewObj: updatedToCamelCase,
        apiStatus: httpCallStatus.success,
      })
    } else {
      this.setState({apiStatus: httpCallStatus.failure})
    }
  }

  displayFailureView = () => (
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
        We are having some trouble to complete your request. Please try again.
      </p>
      <button
        onClick={() => this.getDetailedView}
        type="button"
        className="retry-btn"
      >
        Retry
      </button>
    </div>
  )

  onClickLikeBtn = () => {
    this.setState(prevState => ({
      likeBtnToggle: !prevState.likeBtnToggle,
      dislikeBtnToggle: false,
    }))
  }

  onClickDislikeBtn = () => {
    this.setState(prevState => ({
      dislikeBtnToggle: !prevState.dislikeBtnToggle,
      likeBtnToggle: false,
    }))
  }

  getSuccessfulApiCall = () => {
    const {
      detailedViewObj,
      dislikeBtnToggle,
      likeBtnToggle,
      saveContent,
    } = this.state
    const {
      videoUrl,
      description,
      publishedAt,
      channel,
      viewCount,
      title,
    } = detailedViewObj

    return (
      <PageThemeContext.Consumer>
        {value => {
          const {isDark, getSavedVideo} = value
          const fontTheme = isDark ? 'font-light' : 'font-dark'
          const theme = isDark ? 'dark' : 'light'

          const onClickSaveVideo = () => {
            getSavedVideo(detailedViewObj)
            this.setState(prevState => ({
              saveContent: !prevState.saveContent,
            }))
          }
          return (
            <>
              <Header />
              <div className="detailed-view-main-page">
                <SideNavbar />
                <div className={`detailed-view-page ${theme}`}>
                  <div className="detailed-view-ul-container">
                    <div className="video-container">
                      <ReactPlayer width="100%" controls url={videoUrl} />
                      <p className={`${fontTheme} detailed-view-title`}>
                        {title}
                      </p>
                      <div className="views-like-container">
                        <div className="view-published-container">
                          <p className={` ${fontTheme} view-count-para`}>
                            {viewCount} views
                          </p>
                          <p className={`${fontTheme} view-count-para`}>
                            {publishedAt}
                          </p>
                        </div>
                        <div className="view-published-container">
                          <div className="like-container">
                            <BiLike
                              className={`${fontTheme} ${
                                likeBtnToggle && 'like-icon'
                              }`}
                            />
                            <button
                              onClick={this.onClickLikeBtn}
                              type="button"
                              className={`${fontTheme} ${
                                likeBtnToggle ? 'clicked-like-btn' : 'like-btn'
                              } `}
                            >
                              Like
                            </button>
                          </div>
                          <div className="like-container">
                            <BiDislike
                              className={`${fontTheme} ${
                                dislikeBtnToggle && 'like-icon'
                              }`}
                            />
                            <button
                              onClick={this.onClickDislikeBtn}
                              type="button"
                              className={`${fontTheme} ${
                                dislikeBtnToggle
                                  ? 'clicked-like-btn'
                                  : 'like-btn'
                              } `}
                            >
                              Dislike
                            </button>
                          </div>
                          <div className="like-container">
                            <MdPlaylistAdd
                              className={`${fontTheme} ${
                                saveContent && 'like-icon'
                              }`}
                            />
                            <button
                              onClick={onClickSaveVideo}
                              type="button"
                              className={`${fontTheme} ${
                                saveContent ? 'clicked-like-btn' : 'like-btn'
                              } `}
                            >
                              {saveContent ? 'Saved' : 'Save'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="horizontal-line" />

                    <div className="profile-logo-length-container">
                      <img
                        className="channel-logo-img"
                        alt="channel logo"
                        src={channel.profileImageUrl}
                      />
                      <div>
                        <p className={`${fontTheme}`}>{channel.name}</p>
                        <p className={`${fontTheme}`}>
                          {channel.subscriberCount}
                        </p>
                      </div>
                    </div>
                    <p className={`${fontTheme} description`}>{description}</p>
                  </div>
                </div>
              </div>
            </>
          )
        }}
      </PageThemeContext.Consumer>
    )
  }

  isLoading = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#3b82f6" height={40} width={60} />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'SUCCESS':
        return this.getSuccessfulApiCall()
      case 'LOADING':
        return this.isLoading()
      case 'FAILURE':
        return this.displayFailureView()
      default:
        return null
    }
  }
}
export default VideoDetailedView
