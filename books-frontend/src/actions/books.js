import * as Api from '../api';
import * as actionType from './books_type';


export const changeEdState = (newEdState) => {
  return dispatch => {
    dispatch({
      type: actionType.ACTION_ED_STATE,
      edState : newEdState
    });
  }
};

export const loadBooks = () => {
  return async dispatch => {
    const books = await Api.getBooks();
    dispatch({
      type: actionType.ACTION_BOOKS_LOADED,
      books: books
    });
  }
};

export const createBook = (values) => {
  return async dispatch => {
    const book = await Api.createBook(values);
    dispatch({
      type: actionType.ACTION_BOOK_CREATED,
      book: book
    });
  }
};

export const updateBook = (id, values) => {
  console.log(values);
  alert('upd '+id);
  return async dispatch => {
    const book = await Api.updateBook(id, values);
    console.log(book);
      alert('zapisalem '+id);
    dispatch({
      type: actionType.ACTION_BOOK_UPDATED,
      book: book,
       id : id
    });
  }
};

export const deleteBook = (id) => {
  return async dispatch => {
    const book = await Api.deleteBook(id);
    await dispatch(loadBooks());
  }
};

export const selectBook = (id) => {
  return dispatch => {
    dispatch({
      type: actionType.ACTION_BOOK_SELECT,
      id: id
    });
  }
};


// TYLKO DLA TESTOW
export const test = () => {
  return async (dispatch, getState) => {
    await dispatch(loadBooks());
    await dispatch(createBook({title: 'Dzieci z Bullerby'}));
    const last_book = getState().books[getState().books.length-1];
    await dispatch(updateBook(last_book.id, {title: 'Dzieci z Bullerbyn'}));
    await Api.deleteBook(last_book.id);
    await dispatch(loadBooks());
  }
}