import flask

app = flask.Flask(__name__)


@app.route('/')
@app.route('/index.html')
@app.route('/index')
def hello_world():
    return flask.Response("Hello World", mimetype='text/html')


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
