import React, { useState } from 'react';
import { BooksList } from './components/BooksList';
import { BookForm } from './components/BookForm';
import { Container } from 'react-bootstrap';

import './App.css';

function App() {
  const [books, setBooks] = useState([]);

  const handleAddBook = (newBook) => {
    setBooks([newBook, ...books]);
  }

  //TODO figure out adding a book without refreshing

  return (
    <Container>
        <BookForm onAddBook={handleAddBook} />
        <BooksList initialBooks={books} />
    </Container>  
  );
}

export default App;
