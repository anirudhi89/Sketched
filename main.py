import flask
from flask import request
import json
import random
from google.cloud import datastore

app = flask.Flask(__name__)

client = datastore.Client(project='sketched')


@app.route('/')
@app.route('/index.html')
@app.route('/index')
def root():
    # verify_auth()
    return flask.render_template("index.html", page_title='Sketched | Home')

@app.route('/upload/confirm', methods = ["POST"])
def upload_confirmation():
    return flask.render_template("confirm.html", value = "Upload Received!")

@app.route('/p/<requested_page>')
def templater(requested_page):
    return flask.render_template(requested_page)

@app.route('/submit/confirm', methods=['POST'])
def submit_confirm():
    request_json = request.get_json(force=True)
    url = request_json.get("url")
    if url != None:
        kind = "StickyNote"
        name = "sticky"+ random.randint(0, 200)
        task_key = datastore.client.key(kind,name)
        task = datastore.Entity(key=task_key)
        task['url'] = url
        datastore.put(task)
        return "Success! Image Uploaded"
    else:
        return "Error. Unable to upload image."
    
@app.route('/submit/redirConfirm<message>', methods=["GET"])
def submit_confirmation(message):
    return flask.render_template("confirm.html", value = message)

@app.route('get/sketches')
def get_sketches():
    request_json = request.get_json(force=True)
    url = request_json.get("id")
    

if __name__ == '__main__':
    app.debug = True
    app.run()
    #JUST FOR DEBUGGING




#Helper Methods

def get_from_ds(id):
    kind = "Sticky Note"
    name = 'sample stickyNote'
    user = id
    client.query(user=id)
    