import React, { useState } from "react";
import { Form } from 'react-bootstrap';

export function BookForm() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState('');
    const [genre, setGenre] = useState('');
    const [readStatus, setReadStatus] = useState('TBR');

    const handleSubmit = (event) => {
        event.preventDefault();
        //add code for where the book info entered should go
        const newBook = {
            title,
            author,
            image,
            genre,
            readStatus
        };
        // onAddBook(newBook);
        setTitle('');
        setAuthor('');
        setImage('');
        setGenre('');
        setReadStatus('TBR');
    }

    return (
        <Form onSubmit={handleSubmit}>
            <input type='text' value={title} onChange={(event) => setTitle(event.target.value)} />
            <input type='text' value={author} onChange={(event) => setAuthor(event.target.value)} />
            <input type='url' value={image} onChange={(event) => setImage(event.target.value)} />
            <input type='text' value={genre} onChange={(event) => setGenre(event.target.value)} />
            <select value={readStatus} onChange={(event) => setReadStatus(event.target.value)}>
                <option value='TBR'>TBR</option>
                <option value='In Progress'>In Progress</option>
                <option value='Read'>Read</option>
            </select>
            <button type='submit'>Add Book</button>
        </Form>
    )
}