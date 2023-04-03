import React, { useState } from 'react';
import { BooksList } from './components/BooksList';
import { BookForm } from './components/BookForm';
import { booksApi } from './rest/BooksApi';
import { Container } from 'react-bootstrap';

import './App.css';

function App() {
  const [books, setBooks] = useState([]);

  // const handleAddBook = async (newBook) => {
  //   try {
  //     const addedBook = await booksApi.post(newBook);
  //     setBooks([addedBook, ...books]);
  //   } catch(e) {
  //     console.error('Oops, looks like adding the book failed.');
  //   }
  // }

  const addBook = (newBook) => {
    setBooks([newBook, ...books]); 
  }

  //TODO figure out adding a book without refreshing

  return (
    <Container>
        <BookForm onAddBook={addBook} />
        <BooksList initialBooks={books} />
    </Container>  
  );
}

export default App;
