const express = require('express');
const http = require('http');
const next = require('next');
const socketio = require('socket.io');

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

nextApp.prepare().then(async() => {
    const app = express();
    const server = http.createServer(app);
    const io = new socketio.Server();
    io.attach(server);

    // app.get('/hello', async (_, res) => {
    //     res.send('Hello World')
    // });

    io.on('connection', (socket) => {
        const count = io.engine.clientsCount;
        console.log(socket.id)
        console.log(`${count} players connected`)

        socket.on('disconnect', () => {
            console.log(`1 client disconnected : only ${count} players left`);
        })
    });

    app.all('*', (req, res) => nextHandler(req, res));

    server.listen(port, () => {
        console.log(`--> NFighT is running on http://localhost:${port}`);
    });
});