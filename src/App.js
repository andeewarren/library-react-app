import React, { useState } from 'react';
import { BooksList } from './components/BooksList';
import { BookForm } from './components/BookForm';
import Header from './components/Header';
import Footer from './components/Footer';
// import { booksApi } from './rest/BooksApi';
import { Container } from 'react-bootstrap';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);


  const addBook = (newBook) => {    
    setBooks([newBook, ...books]); 
  }

  //TODO figure out adding a book without refreshing

  return (
    <div>
    <Header />
    <Container>
        <BookForm onAddBook={addBook} />
        <BooksList initialBooks={books} />
    </Container>
    <Footer />
    </div>
  );
}

export default App;
