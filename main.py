from flask import *
from flask_socketio import SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@app.route("/")
def homepage():
    return render_template("homepage.html")

@socketio.on("msg")
def recvmsg(data):
    print(data)

if __name__ == '__main__':
    socketio.run(app) 