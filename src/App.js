import React from 'react';
import { BooksList } from './components/BooksList';
import { BookForm } from './components/BookForm';
import { Container } from 'react-bootstrap';

import './App.css';

function App() {
  const initialBooks = [];
  
  return (
    <Container>
        <BookForm />
        <BooksList initialBooks={initialBooks} />
    </Container>  
  );
}

export default App;
