# Stock Buy/Sell Recommendation App

## Description
This application pulls stock data for the tickers "AMZN" and "IBM" from the [Alpha Vantage API](https://www.alphavantage.co/), cleans it, and stores it in a PostgreSQL database. The app then analyzes the data to determine whether you should **buy** or **sell** these stocks. The frontend fetches this recommendation through an Express server connected to the database.

## How to Run

1. Install the latest version of [Docker](https://www.docker.com/get-started).
2. Clone this repository to your local machine.
3. Navigate to the project directory.
4. Run the following command to start the application:

   ```bash
   docker-compose up
