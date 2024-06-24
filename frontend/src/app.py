#!/usr/bin/env python3

from flask import Flask, request
import requests
import os
# print(os.environ)

app = Flask(__name__)

@app.route("/")
def main():
    return '''
     <form action="/echo_user_input" method="POST">
         <input name="user_input">
         <input type="submit" value="Submit!">
     </form>
     '''

@app.route("/echo_user_input", methods=["POST"])
def echo_input():
    try:
        input_text = request.form.get("user_input", "") #shoudl be a ticker
        print("getting analysis for: " + input_text)
        host = "api" if os.environ.get('RUNNING_IN_DOCKER', "false")=="true" else "localhost"
        res = requests.get("http://" + host + ":3000/getStockAnalysis/" + input_text).json()
        print(res)
        return res['ticker'] + " is a " + res['analysis']
    except:
        print('An exception occurred')
        return "A problem occured"

@app.route("/health")
def healthcheck():
    return 'healthy'    

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)