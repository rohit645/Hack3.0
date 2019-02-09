from flask import *
from flask_socketio import *

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@app.route("/")
def homepage():
    return render_template("homepage.html")

@app.route("/skrible")
def skrible():
    return render_template("skrible.html")


@socketio.on("draw")
def recvmsg(JSON):
    emit('click', JSON, broadcast = True)
    print("debug")

if __name__ == '__main__':
    socketio.run(app, host="0.0.0.0")
