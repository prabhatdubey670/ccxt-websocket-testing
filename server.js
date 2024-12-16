const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const TradeController = require('./controller/tradeController');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); // Serve static files (JS, CSS)
app.set('view engine', 'ejs'); // Render views using ejs

// Set up routes
app.get('/', (req, res) => {
  res.render('index'); // Render the main trading interface (index.html)
});

// Initialize the trade controller for handling real-time trades
const tradeController = new TradeController(io);

// Start the server
server.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
