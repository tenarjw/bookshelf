import * as actionType from '../actions/books_type';

const initialState = {
  books: null, // książki
  selected: null, // wybrana książka
  id : 0, // id wybranej książki
  edState : {  // jakie operacje / przyciski dostępne
    edAvailable : true, // może edytować
    edActive : false, // otwarty formularz edycji
    newAvailable : true, // może dodawać
    newActive : false, // w trakcie dodawania
    delAvailable : false // może usuwać
  }
};

const findBook = (books, id) => {
  if (books) books=books.filter(
     function(book, index, array){ return (book.id==id); }
   );
  if (books) {
    return books[0];
  }
  return null
}


const  booksReducer = (state=initialState, action) => {
  switch (action.type) {
    case actionType.ACTION_BOOK_SELECT:
      let sel = findBook(state.books, action.id);
      return {
        ...state,
        selected: sel,
        id: sel.id
      }
    case actionType.ACTION_ED_STATE:
        return {
          ...state,
          edState: action.edState
        }
    case actionType.ACTION_BOOKS_LOADED:
      return {
        ...state,
        selected : null,
        id : 0,
        books: action.books
      }
    case actionType.ACTION_BOOK_CREATED:
      return {
        ...state,
        selected : null,
        id : 0,
        books: [...state.books, action.book]
      }
    case actionType.ACTION_BOOK_UPDATED:
      return {
        ...state,
        selected : action.book,
        id : action.book.id,
        // Zamien stara wersje ksiazki o podanym ID na nowa
        books: state.books.map((book) => book.id === action.book.id ? action.book : book)
      }
    default:
      return state;
  }
}

export default booksReducer
