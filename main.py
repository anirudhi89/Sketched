from crypt import methods
import flask

app = flask.Flask(__name__)




@app.route('/')
@app.route('/index.html')
@app.route('/index')
def root():
    return flask.render_template("index.html", page_title='Sketched | Home')

@app.route('upload/confirmation',methods="POST")
def upload_confirmation():
    return "Upload Received"

@app.route('/p/<requested_page>')
def templater(requested_page):
    return flask.render_template(requested_page)
