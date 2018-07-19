import React from 'react'
import PropTypes from 'prop-types'

import BookList from './components/BookList'

const App = () => {
  return (
      <BookList />
  )
}

App.propTypes = {
  history: PropTypes.object,
}

export default App
