const CCXTClient = require('../utils/ccxtClient.js');

const debounce = require('lodash/debounce');

class TradeController {
  constructor(io) {
    this.io = io;
    this.ccxtClient = new CCXTClient();
    this.setupWebSocket();
  }

  setupWebSocket() {
    this.io.on('connection', (socket) => {
      console.log('New client connected');

      // Handle trade actions from the client
      socket.on('startTrade', this.startTrade.bind(this));

      // Handle disconnect
      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  }

  async startTrade(tradeDetails) {
    // Place a trade using CCXT/CCXT Pro (assuming `tradeDetails` contains the necessary data)
    try {
      const result = await this.ccxtClient.placeTrade(tradeDetails);
      this.io.emit('tradeUpdate', result); // Emit real-time trade updates to the client
    } catch (error) {
      console.error('Error during trade:', error);
      this.io.emit('tradeError', error.message);
    }
  }
}
module.exports = TradeController;
