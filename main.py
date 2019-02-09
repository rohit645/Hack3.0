from flask import *

app = Flask(__name__)

@app.route("/")

def homepage():
    return render_template("homepage.html")


app.run(debug = True)