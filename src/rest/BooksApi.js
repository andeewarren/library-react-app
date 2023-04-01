const BOOKS_ENDPOINT = 'https://640a21d16ecd4f9e18c5cb25.mockapi.io/books';

class BooksApi {
    get = async () => {
        try {
            const resp = await fetch(BOOKS_ENDPOINT);
            const data = await resp.json();
            return data;  
        } catch(e) {
            console.log('Oops, looks like fetchBooks had an issue.', e);
        }
    }

    put = async (book) => {
        try {
            const resp = await fetch(`${BOOKS_ENDPOINT}/${book.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book)
            });
            return await resp.json();
        } catch(e) {
            console.log('Oops, looks like updating books had an issue.', e);
        }
    }

    delete = async (id) => {
        
            try {
                const resp = await fetch(`${BOOKS_ENDPOINT}/${id}`, {
                    method: 'DELETE'
                });
                return await resp.json();
            } catch(e) {
                console.error(`Oops, looks like deleting books didn't work.`, e);
            }
        };

    post = async (book) => {
        try {
            const resp = await fetch(BOOKS_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book)
            });
            return await resp.json();
        } catch(e) {
            console.log('Oops, looks like adding a book had an issue.', e);
        }
    }

}

export const booksApi = new BooksApi();