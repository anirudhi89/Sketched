import flask

app = flask.Flask(__name__)



@app.route('/')
@app.route('/index.html')
@app.route('/index')
def root():
    return flask.render_template("index.html", page_title='Home')

@app.route('/draw.html')
@app.route('/draw')
def draw():
    return flask.render_template("draw.html", page_title='Draw')

@app.route('/search.html')
@app.route('/search')
def search():
    return flask.render_template("search.html", page_title='Search')

@app.route('/about.html')
@app.route('/about')
def search():
    return flask.render_template("about.html", page_title='About')

@app.route('/contact.html')
@app.route('/contact')
def search():
    return flask.render_template("contact.html", page_title='Contact')