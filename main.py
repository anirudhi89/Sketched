import flask
from flask import request
import json

app = flask.Flask(__name__)




@app.route('/')
@app.route('/index.html')
@app.route('/index')
def root():
    return flask.render_template("index.html", page_title='Sketched | Home')

@app.route('/upload/confirm', methods = ["POST"])
def upload_confirmation():
    return flask.render_template("confirm.html", value = "Upload Received!")

@app.route('/p/<requested_page>')
def templater(requested_page):
    return flask.render_template(requested_page)

@app.route('/submit/confirm', methods=['POST'])
def submit_confirm():
    return json.loads({'values': request.args.get('url')})
    
@app.route('/submit/confirm')
def submit_confirmation():
    value = request.args.get('values')
    return flask.render_template("confirm.html", values = value)


if __name__ == '__main__':
    app.debug = True
    app.run()
    #JUST FOR DEBUGGING
