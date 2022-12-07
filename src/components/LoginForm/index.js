import {Component} from 'react'

import {Redirect, Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import PageThemeContext from '../../context/PageThemeContext'

import './index.css'

class LoginForm extends Component {
  state = {displayPassword: false, username: '', password: '', errorMsg: ''}

  onSuccessfulSubmit = () => {
    const {history} = this.props
    Cookies.set(
      'jwt_token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU',
      {expires: 2},
    )
    history.replace('/')
  }

  onSubmitLoginCreadentials = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    // const options = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(userDetails),
    // }
    // const url = 'https://sekharslogin.herokuapp.com/login'

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSuccessfulSubmit()
    } else {
      this.setState({errorMsg: data.error_msg})
      console.log(data)
    }
  }

  getUsername = event => {
    this.setState({username: event.target.value})
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  onTogglePassword = () => {
    this.setState(prevState => ({displayPassword: !prevState.displayPassword}))
  }

  getLoginForm = isDark => {
    const {username, errorMsg, displayPassword, password} = this.state
    const logoImage = isDark
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
    const fontTheme = isDark ? 'font-light' : 'font-dark'
    return (
      <div className="login-card-container">
        <img className="logo-img" alt="website logo" src={logoImage} />
        <form
          onSubmit={this.onSubmitLoginCreadentials}
          className="login-container"
        >
          <div className="username-label-container">
            <label className={`${fontTheme}`} htmlFor="username">
              USERNAME
            </label>
            <input
              onChange={this.getUsername}
              type="text"
              value={username}
              id="username"
              placeholder="username"
            />
          </div>
          <div className="username-label-container">
            <label className={`${fontTheme}`} htmlFor="password">
              PASSWORD
            </label>
            <input
              onChange={this.getPassword}
              type={displayPassword ? 'text' : 'password'}
              value={password}
              id="password"
              placeholder="password"
            />
          </div>
          <div className="show-password-container">
            <input
              onChange={this.onTogglePassword}
              type="checkbox"
              id="checkbox"
            />
            <label className={`${fontTheme} checkbox-label`} htmlFor="checkbox">
              Show password
            </label>
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
          <Link to="/sign-in">
            <h4>Create Account</h4>
          </Link>
          <p className="error-msg">{errorMsg}</p>
        </form>
      </div>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <PageThemeContext.Consumer>
        {value => {
          const {isDark} = value
          const theme = isDark ? 'dark' : 'light'
          return (
            <div className={`${theme} login-form-main-container`}>
              {this.getLoginForm(isDark)}
            </div>
          )
        }}
      </PageThemeContext.Consumer>
    )
  }
}
export default LoginForm
