import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'

import {Component} from 'react'

import LoginForm from './components/LoginForm'

import Home from './components/Home'

import Trending from './components/Trending'

import Gaming from './components/Gaming'

import NotFound from './components/NotFound'

import SavedVideos from './components/SavedVideos'

import SignInForm from './components/SignInForn'

import VideoDetailedView from './components/VideoDetailedView'

import PageThemeContext from './context/PageThemeContext'

import ProtectedRoute from './components/PotectedRoute'

import './App.css'

class App extends Component {
  state = {isDark: false, savedVideoList: []}

  changeTheme = () => {
    this.setState(prevState => ({isDark: !prevState.isDark}))
  }

  getSavedVideo = detailedViewObj => {
    this.setState(prevState => ({
      savedVideoList: [...prevState.savedVideoList, detailedViewObj],
    }))
  }

  render() {
    const {isDark, savedVideoList} = this.state
    console.log(savedVideoList)
    return (
      <PageThemeContext.Provider
        value={{
          isDark,
          changeTheme: this.changeTheme,
          savedVideoList,
          getSavedVideo: this.getSavedVideo,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/trending" component={Trending} />
            <ProtectedRoute exact path="/gaming" component={Gaming} />
            <ProtectedRoute
              exact
              path="/saved-videos"
              component={SavedVideos}
            />
            <ProtectedRoute
              exact
              path="/videos/:id"
              component={VideoDetailedView}
            />
            <Route path="/sign-in" component={SignInForm} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </BrowserRouter>
      </PageThemeContext.Provider>
    )
  }
}

export default App
