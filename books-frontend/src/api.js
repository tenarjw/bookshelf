import axios from 'axios';
import querystring from 'querystring';

const SERVER = 'http://react.maciejwawro.usermd.net/books';

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
  const response = await axios.post(SERVER, querystring.stringify(book));
  if (response.data.errors) throwError(response.data.message);
  return response.data;
}

export const updateBook = async (id: number, book: Book): Promise<BookWithID> => {
  const response = await axios.put(SERVER+'/'+id, querystring.stringify(book));
  if (response.data.errors) throwError(response.data.message);
  return response.data;
}

export const deleteBook = async (id: number): Promise<void> => {
  const response = await axios.delete(SERVER+'/'+id);
  if (response.data.errors) throwError(response.data.message);
}
