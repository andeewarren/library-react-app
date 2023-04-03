import React, { useEffect, useState } from "react";
import { booksApi } from "../rest/BooksApi";
import { Card, Button } from 'react-bootstrap';



export function BooksList({initialBooks}) {
    
    const [books, setBooks] = useState(initialBooks);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const data = await booksApi.get();
                setBooks(data);
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
            {console.log(sortedBooks)};
            {sortedBooks.reverse().map((book, id) => (
                <Card key={id}>
                    <Card.Img variant='top' src={book.image} />
                    <Card.Body>
                        <Card.Title><h3>{book.title}</h3></Card.Title>
                        <Card.Text>
                            {book.author}<br />
                            {book.genre} <br />
                            <select value={book.readStatus} onChange={(e) => handleUpdateReadStatus(book, e.target.value)}>
                                <option value="Read">Read</option>
                                <option value="In Progress">In progress</option>
                                <option value="TBR">TBR</option>
                            </select>
                        </Card.Text>
                        <Button onClick={() => handleDelete(book.id)}>Delete</Button> 
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}