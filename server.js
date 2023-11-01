const http = require('http');

const todos = [
    { id: 1, text: 'Todo One' },
    { id: 2, text: 'Todo Two'},
    { id: 3, text: 'Todo Three' },
];

const students = [
    { id: 1, name: 'Aufa', kelas: 12},
    { id: 2, name: 'Bimo', kelas: 12},
    { id: 3, name: 'Akbar', kelas:12},
]

const books = [
    { id: 1, title: 'Book1', author: "Aufa", category: "Novel"},
    { id: 2, title: 'Book2', author: "Dewa", category: "Majalah"},
    { id: 3, title: 'Book3', author: "Kautsar", category: "Kamus"},
]

const server = http.createServer((req, res) => {
    // listening data from client
    const {method, url} = req;
    let body = [];

    req.on('data', chunk => { 
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString()
        
        let status = 200;
        const response = {
            success: true,  
            results: [],
            error: '',
        };

        if (method === 'GET' && url === '/todos') {

            status = 200;
            response.success = status;
            response.results = todos;

        } else if (method === 'POST' && url === '/todos') {

            const { id, text } = JSON.parse(body);

            if (!id || !text) {
                status = 400;
                response.error = 'Please add id and text';
            } else {
                todos.push({ id, text });
                status = 201;
                response.success = true;
                response.results = todos;
            }
        }

        if (method === 'GET' && url === '/students') {

            status = 200;
            response.success = true;
            response.results = students;

        } else if (method === 'POST' && url === '/students') {

            const { id, name, kelas } = JSON.parse(body);

            if (!id || !name || !kelas) {
                status = 400;
                response.error = 'Please add id, name and kelas';
            } else {
                students.push({ id, name, kelas });
                status = 201;
                response.success = true;
                response.results = students;
            }
        }

        if (method === 'GET' && url === '/books') {

            status = 200;
            response.success = true;
            response.results = books;

        } else if (method === 'POST' && url === '/books') {

            const { id, title, author, category } = JSON.parse(body);

            if (!id || !title || !author || !category) {
                status = 400;
                response.error = 'Please add id, title, author and category';
            } else {
                books.push({ id, title, author, category });
                status = 201;
                response.success = true;
                response.results = books;
            }
        }

        res.writeHead(200, {
            'Content-Type': 'application/json',
            'X-Powered-By': 'Node.js',
        });

        res.end(JSON.stringify(response));
    });

});

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));