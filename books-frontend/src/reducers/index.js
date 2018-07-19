import { combineReducers } from 'redux'
//import loginReducer from './counter'
import booksReducer from './books'

const rootReducer = combineReducers({
//  login: loginReducer,
  books: booksReducer
})

export default rootReducer
