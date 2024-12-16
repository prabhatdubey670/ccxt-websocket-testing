const CCXTClient = require('../utils/ccxtClient.js'); // Assuming you have the CCXT client in a utils folder

class TradeModel {
  constructor() {
    this.ccxtClient = new CCXTClient(); // Initialize the CCXTClient
  }

  // Method to place a trade (market order)
  async placeTrade(tradeDetails) {
    try {
      // Call CCXTClient to place a trade (via REST API)
      const order = await this.ccxtClient.placeTrade(tradeDetails);
      return order; // Return the order response
    } catch (error) {
      throw new Error(`Trade failed: ${error.message}`);
    }
  }

  // Method to subscribe to ticker data (using WebSocket)
  async getRealTimeTicker(symbol) {
    try {
      // Use CCXT Pro to subscribe to the ticker data
      const ticker = await this.ccxtClient.subscribeToTicker(symbol);
      return ticker; // Return the ticker data
    } catch (error) {
      throw new Error(`Failed to get ticker: ${error.message}`);
    }
  }
}

module.exports = TradeModel;
