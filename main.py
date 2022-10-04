import flask

app = flask.Flask(__name__)

@app.route('/')
@app.route('/index.html')
@app.route('/index')
def hello_world():
    return flask.Response("Hello World", mimetype='text/html')