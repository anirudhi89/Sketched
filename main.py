import flask

app = flask.Flask(__name__)



@app.route('/')
@app.route('/index.html')
@app.route('/index')
def root():
    return flask.render_template("index.html", page_title='Sketched | Home')

@app.route('/p/<requested_page>')
def templater(requested_page):
    return flask.render_template(requested_page)
