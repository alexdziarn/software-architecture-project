const { Pool } = require("pg")
const { stockList } = require("./stockList")

const API_KEY = "QOHJO2GV1DIIPGB6";

const start = async() => {
    const pool = new Pool({
        host: process.env.DB_HOST?process.env.DB_HOST:"localhost",
        user: "postgres",
        password: "postgres",
        port: 5432
    });
    const client = await pool.connect();
    await dropTable(client)
    await createTable(client);
    await insertData(client, stockList);
    await getData(client);
    await client.end()
    console.log("client has been disconnected")
}

const dropTable = async (client) => {
    await client.query("DROP TABLE IF EXISTS Stocks")
}

const createTable = async (client) => {
    await client.query(`
        CREATE TABLE Stocks (
            Ticker varchar(255),
            Name varchar(255),
            RSI decimal(10, 4)
        );
    `);
    console.log("table is created")
}

const insertData = async (client, stockList) => {
    for(let s of stockList) {
        let data = {};
        data["ticker"] = s;
        //use this if api is on cooldown, only allows 25 requests per day
        data["name"] = s;
        data["rsi"] = 50;

        /*
        await fetch(`https://www.alphavantage.co/query?function=RSI&symbol=${s}&interval=daily&time_period=10&series_type=open&apikey=${API_KEY}`)
        .then(res => res.json())
        .then(json => {
            const lastRefresh = json["Meta Data"]["3: Last Refreshed"];
            data["rsi"] = json["Technical Analysis: RSI"][lastRefresh]["RSI"];
        })
        await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${s}&apikey=${API_KEY}`)
        .then(res => res.json())
        .then(json => {
            data["name"] = json["Name"]
        })
        */
        await client.query(
            `INSERT INTO Stocks (Ticker, Name, RSI)
            VALUES ('${data.ticker}', '${data.name}', '${data.rsi}');`
        )
        // console.log("inserted", data)
    }
}



const getData = async (client) => {
    const r = await client.query(`SELECT * from Stocks;`);
    console.log(r.rows)
}


module.exports = { start, dropTable, createTable, insertData, getData };