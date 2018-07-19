import axios from 'axios';
import querystring from 'querystring';

//const SERVER = 'http://127.0.0.1:3000/books';
const SERVER = 'https://books.otwartaedukacja.pl/books';

type Book = {
  title: string,
  authors: string,
  description: string,
  type: string,
  active: boolean
};

type BookWithID = Book & {
  id: number
}

const throwError = message => {
  console.error(message);
  alert(message);
  throw Error(message);
}

export const getBooks = async (): Promise<BookWithID> => {
  const response = await axios(SERVER);
  if (response.data.errors) throwError(response.data.message);
  return response.data;
}

export const createBook = async (book: Book): Promise<BookWithID> => {
  console.log(book);
  const response = await axios.post(SERVER, querystring.stringify(book));
  if (response.data.errors) throwError(response.data.message);
  return response.data;
}

export const updateBook = async (id: number, book: Book): Promise<BookWithID> => {
  try {
  alert(SERVER+'/'+id, querystring.stringify(book));
  const response = await axios.put(SERVER+'/'+id, querystring.stringify(book));
  if (response.data.errors) {
      alert('?');
      throwError(response.data.message);
  }
  return response.data;
} catch (err) {
  alert('error '+err);
  return null;
}
}

export const deleteBook = async (id: number): Promise<void> => {
  const response = await axios.delete(SERVER+'/'+id);
  if (response.data.errors) throwError(response.data.message);
}
