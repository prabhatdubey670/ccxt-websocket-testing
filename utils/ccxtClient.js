const ccxt = require('ccxt'); // For REST API integration
const pro = require('ccxt').pro;
require('dotenv').config(); // Load environment variables from .env file
// For WebSocket integration
class CCXTClient {
  constructor() {
    this.exchange = new ccxt.binance({
      apiKey: process.env.TEST_API_KEY,
      secret: process.env.TEST_SECRET_KEY,
    });
    this.ccxtPro = new pro.binance({
      apiKey: process.env.TEST_API_KEY,
      secret: process.env.TEST_SECRET_KEY,
    });
    this.exchange.setSandboxMode(true);
    this.ccxtPro.setSandboxMode(true);
  }

  async placeTrade(tradeDetails) {
    // Example of placing a market buy order
    try {
      const order = await this.exchange.createMarketBuyOrder(
        tradeDetails.symbol,
        tradeDetails.amount
      );
      return order;
    } catch (error) {
      throw new Error(`Trade failed: ${error.message}`);
    }
  }

  async subscribeToTicker(symbol) {
    // Use CCXT Pro to listen to real-time data via WebSocket
    const ticker = await this.ccxtPro.watchTicker(symbol);
    return ticker;
  }
}
module.exports = CCXTClient;
