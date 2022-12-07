import React from 'react'

const PageThemeContext = React.createContext({
  isDark: false,
  changeTheme: () => {},
  savedVideoList: [],
  getSavedVideo: () => {},
})
export default PageThemeContext
