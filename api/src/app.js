const express = require("express")
const { Pool } = require("pg")
var cors = require('cors')

const app = express()

// database connection
const pool = new Pool({
    host: process.env.DB_HOST?process.env.DB_HOST:"localhost",
    user: "postgres",
    password: "postgres",
    port: 5432
});

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/getStockAll/:ticker', async (req, res) => {
  try {
    const client = await pool.connect();
    const ticker = req.params.ticker.toUpperCase();
    const r = await client.query(`SELECT * from Stocks WHERE Ticker='${ticker}';`);
    res.send(r.rows[0]);
  } catch (e) {
    res.status(500).send(e.toString());
  }
})

app.get('/getStockName/:ticker', async (req, res) => {
  try {
    const client = await pool.connect();
    const ticker = req.params.ticker.toUpperCase();
    const r = await client.query(`SELECT Name from Stocks WHERE Ticker='${ticker}';`)
    res.send(r.rows[0]);
  } catch (e) {
    res.status(500).send(e.toString());
  }
})

app.get('/getStockRSI/:ticker', async (req, res) => {
  try {
    const client = await pool.connect();
    const ticker = req.params.ticker.toUpperCase();
    const r = await client.query(`SELECT RSI from Stocks WHERE Ticker='${ticker}';`)
    res.send(r.rows[0]);
  } catch (e) {
    res.status(500).send(e.toString());
  }
})

app.get('/getStockAnalysis/:ticker', async (req, res) => {
  try {
    const client = await pool.connect();
    const ticker = req.params.ticker.toUpperCase();
    const r = await client.query(`SELECT RSI from Stocks WHERE Ticker='${ticker}';`)
    console.log(`api queried for ${ticker}`)
    if(r.rows[0].rsi == undefined) throw Error("ticker does not exist")
    const analysis = "hold";
    const rsi = r.rows[0].rsi;
    if(rsi <= 30) analysis = "buy"
    else if(rsi >= 70) analysis = "sell"
    res.send({
      ticker,
      analysis
    });
  } catch (e) {
    console.error(e.toString())
    res.status(500).send(e.toString());
  }
})

app.get('/health', (req, res) => {
  res.send("healthy")
})

module.exports = { app };