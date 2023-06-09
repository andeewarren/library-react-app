import React, { useEffect, useState } from "react";
import { booksApi } from "../rest/BooksApi";
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import ListLength from "./ListLength";



export function BooksList({initialBooks}) {
    
    const [books, setBooks] = useState(initialBooks);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const data = await booksApi.get();
                setBooks(data);
                console.log(books);
            } catch(e) {
                console.error('Oops, looks like fetchBooks had an issue.');
            }
        };

        fetchBooks();
    }, []);

    const handleDelete = async (id) => {
        try {
            await booksApi.delete(id);
            setBooks(books.filter(book => book.id !== id));
        } catch(e) {
            console.error("Oops, looks like deleting the book didn't work.", e);
        }
    }

    const handleUpdateReadStatus = async (book, readStatus) => {
        try {
            const updatedBook = { ...book, readStatus };
            await booksApi.put(updatedBook);
            setBooks(books.map(b => b.id === book.id ? updatedBook : b));
        } catch(e) {
            console.error("Oops, looks like updating read status didn't work.", e);
        }
    }
    
    const sortedBooks = books.sort((a,b) => a.id - b.id);

    return (
            <div>
            <ListLength books={books} />
            {/* {console.log(sortedBooks)} */}
            <Container className="container" fluid='sm'>
            <Row xs={1} sm={2} md={3} lg={4} className='g-4'>
            {sortedBooks.reverse().map((book, id) => (
                <Col key={id}>
                    <Card  className="book-card" style={{height: '100%'}}>
                        <Card.Img variant='top' id='cover' src={book.image}  />
                        <Card.Body>
                            <Card.Title><h2>{book.title}</h2></Card.Title>
                            <Card.Body>
                                by <strong>{book.author}</strong>
                                <Row className='book-info gx-1'>
                                    <Col>
                                        {book.genre}
                                    </Col>
                                    <Col>
                                        <select value={book.readStatus} onChange={(e) => handleUpdateReadStatus(book, e.target.value)}>
                                            <option value="Read">Read</option>
                                            <option value="In Progress">In progress</option>
                                            <option value="TBR">TBR</option>
                                        </select>
                                    </Col>
                                </Row>
                            </Card.Body>
                            
                            <Button id='delete-btn' onClick={() => handleDelete(book.id)}>Delete</Button> 
                        </Card.Body>
                    </Card>
                </Col>
            ))}
            </Row>
            </Container>
        </div>
    );
}