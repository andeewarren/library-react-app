import React, { useState } from "react";
import { booksApi } from "../rest/BooksApi";
import { Form } from 'react-bootstrap';

export function BookForm( {onAddBook} ) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState('');
    const [genre, setGenre] = useState('');
    const [readStatus, setReadStatus] = useState('TBR');

    const handleSubmit = async () => { //TODO add conditional to replace blank URL with placeholder URL

        let imageUrl = image;
        if (!imageUrl) {
            imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Placeholder_book.svg/928px-Placeholder_book.svg.png?20071129174344"
        }

        // event.preventDefault();
        console.log('submit check1');
        const newBook = {
            title,
            author,
            image: imageUrl,
            genre,
            readStatus
        };
        console.log('submit check 2');
        try {
            const addedBook = await booksApi.post(newBook);
            onAddBook(addedBook);  
            setTitle('');
            setAuthor('');
            setImage('');
            setGenre('');
            setReadStatus('TBR');
        } catch(e) {
            console.error("Oops, looks like adding the book didn't work.", e);
        }
        // console.log('submit check 3');
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