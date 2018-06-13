import * as Api from './api';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const ACTION_BOOKS_LOADED = 'ACTION_BOOKS_LOADED';
const ACTION_BOOK_CREATED = 'ACTION_BOOK_CREATED';
const ACTION_BOOK_UPDATED = 'ACTION_BOOK_UPDATED';

export const loadBooks = () => {
  return async dispatch => {
    const books = await Api.getBooks();
    dispatch({
      type: ACTION_BOOKS_LOADED,
      books: books
    });
  }
};

export const createBook = (values) => {
  return async dispatch => {
    const book = await Api.createBook(values);
    dispatch({
      type: ACTION_BOOK_CREATED,
      book: book
    });
  }
};

export const updateBook = (id, values) => {
  return async dispatch => {
    const book = await Api.updateBook(id, values);
    dispatch({
      type: ACTION_BOOK_UPDATED,
      book: book
    });
  }
};

// TYLKO DLA TESTOW
export const test = () => {
  return async (dispatch, getState) => {
    await dispatch(loadBooks());
    await dispatch(createBook({titlex: 'Dzieci z Bullerby'}));
    const last_book = getState().books[getState().books.length-1];
    await dispatch(updateBook(last_book.id, {title: 'Dzieci z Bullerbyn'}));
    await Api.deleteBook(last_book.id);
    await dispatch(loadBooks());
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_BOOKS_LOADED:
      return {
        ...state,
        books: action.books
      }
    case ACTION_BOOK_CREATED:
      return {
        ...state,
        books: [...state.books, action.book]
      }
    case ACTION_BOOK_UPDATED:
      return {
        ...state,
        // Zamien stara wersje ksiazki o podanym ID na nowa
        books: state.books.map((book) => book.id === action.book.id ? action.book : book)
      }
    default:
      return state;
  }
}

const initialState = {
  books: null
}

export default createStore(
  reducer,
  initialState,
  applyMiddleware(thunk, logger)
);
