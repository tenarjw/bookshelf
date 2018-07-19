import axios from 'axios';
import querystring from 'querystring';

const SERVER = 'https://books.otwartaedukacja.pl/books';

const throwError = message => {
  console.error(message);
  alert(message);
  throw Error(message);
}

export const getBooks = async () => {
  const response = await axios(SERVER);
  if (response.data.errors) throwError(response.data.message);
  return response.data;
}

export const createBook = async (book) => {
  console.log(book);
  const response = await axios.post(SERVER, querystring.stringify(book));
  if (response.data.errors) throwError(response.data.message);
  return response.data;
}

export const updateBook = async (id, book)=> {
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

export const deleteBook = async (id) => {
  const response = await axios.delete(SERVER+'/'+id);
  if (response.data.errors) throwError(response.data.message);
}