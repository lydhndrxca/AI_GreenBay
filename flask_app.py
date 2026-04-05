import os
from flask import Flask, send_file

app = Flask(__name__)

@app.route("/")
def home():
    return send_file(os.path.join(os.path.dirname(os.path.abspath(__file__)), "Green Bay Explorer.html"))

if __name__ == "__main__":
    app.run(debug=True)
