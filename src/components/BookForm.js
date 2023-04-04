import React, { useState } from "react";
import { booksApi } from "../rest/BooksApi";
import { Form, FormGroup, Button, Row, Col } from 'react-bootstrap';

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
            <Row>
                <Col>
                    <FormGroup className="mb-3" controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type='text' placeholder='Enter title' value={title} onChange={(event) => setTitle(event.target.value)} />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup className="mb-3" controlId="formAuthor">
                        <Form.Label>Author</Form.Label>
                        <Form.Control type='text' placeholder='Enter author' value={author} onChange={(event) => setAuthor(event.target.value)} />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormGroup className="mb-3" controlId="formImage">
                        <Form.Label>Cover Image</Form.Label>
                        <Form.Control type='url' placeholder='Enter cover image URL' value={image} onChange={(event) => setImage(event.target.value)} />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup className="mb-3" controlId="formGenre">
                        <Form.Label>Genre</Form.Label>
                        <Form.Control type='text' placeholder='Enter genre' value={genre} onChange={(event) => setGenre(event.target.value)} />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup className="mb-3" controlId="formReadStatus">
                        <Form.Label>Read Status</Form.Label>
                        <Form.Select value={readStatus} onChange={(event) => setReadStatus(event.target.value)}>
                        <option>Select read status</option>
                        <option value="TBR">TBR</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Read">Read</option>
                        </Form.Select>
                    </FormGroup>
                </Col>
            </Row>
            <Button type='submit' className='button'>Add Book</Button>
        </Form>
    );
}