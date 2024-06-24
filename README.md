#Software-architecture-project

To summarize my project, it pulls very fundamental financial data for select stocks(only AMZN and IBM) and analyzes it based on the relative strength index and determines if it is a buy, sell, or hold.

The architecture involves a fairly simple design with a javascript script to pull financial data from the alphavantage api and insert it into a postgresql database. Data will be pulled from the database and then transformed and broadcasted through an express.js api app. My frontend will be a flask app that will query the express.js app based on ticker by user input.

I have decided to do this mostly as a javascript project since that is what I am most comfortable working in. I decided to keep the frontend as a python flask app since it was already implemented from the earlier assignments. I have also converted the entire project to use docker to make make it easier to run and isolate apps.

System Requirements: 
python 3.10
node v22

How to run:
'''docker-compose up'''

database: localhost:5432
flask: http://127.0.0.1:5001/
express.js: http://localhost:3000/

Run tests:
for JS: cd into the directory and run "npm run test"
for Python: cd into the directory and run "python src/test_app.py"

Production monitoring can use these routes:
flask: http://127.0.0.1:5001/health
express.js: http://localhost:3000/health

