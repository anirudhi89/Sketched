import hashlib
import flask
from flask import request
from google.cloud import datastore

app = flask.Flask(__name__)
app.secret_key = b'lkasdfuipou981193ornlsaf9a0fs'

#Constants:

#Datastore Constants:
ENTITY_TYPE = 'StickyNote'
USERS_TYPE = "Users"


@app.context_processor
def inject_user():
    return { "user": flask.session["user"] }

@app.route('/')
@app.route('/index.html')
@app.route('/index')
def root():
    return flask.render_template("index.html")

@app.route('/upload/confirm', methods = ["POST"])
def upload_confirmation():
    # uploaded_file = flask.request.files.get('file')
    # content_type = uploaded_file.content_type
    # gcs_client = storage.Client()
    # storage_bucket = gcs_client.get_bucket('uploaded-stickies')
    # blob = storage_bucket.blob(uploaded_file.filename)
    # blob.upload_from_string(uploaded_file.read(), content_type=content_type)
    # url = blob.public_url
    return flask.render_template("confirm.html", value = "Upload Received!")

@app.route('/p/<requested_page>')
def templater(requested_page):
    print(flask.session["user"])
    return flask.render_template(requested_page)

@app.route('/submit/confirm', methods=['POST'])
def submit_confirm():
    request_json = request.get_json(force=True)
    url = request_json.get("url")
    tags = request_json.get("tags")
    str = "Success! Image Uploaded"
    tags.replace('undefined', '')
    if ((tags != None) or (tags != "") or (tags != " ") or (tags.isspace())):
        if ((tags.strip() != "") or (tags.strip() != None) or (tags.strip().isspace())):
            str = "Success! Image Uploaded. Your image was tagged as: "
            str += tags
    if url != None:
        # kind = "StickyNote"
        # name = "sticky"+ random.randint(0, 200)
        # task_key = datastore.client.key(kind,name)
        # task = datastore.Entity(key=task_key)
        # task['url'] = url
        # datastore.put(task)
        return str
    else:
        return "Error. Unable to upload image."
    
@app.route('/submit/redirConfirm<message>', methods=["GET"])
def submit_confirmation(message):
    return flask.render_template("confirm.html", value = message)

@app.route("/register", methods=["POST"])
def register():
    username = flask.request.form["username"]
    password1 = flask.request.form["password"]
    password2 = flask.request.form["confirmpassword"]
    errors = []
    if password1 != password2:
        errors.append("Passwords do not match!")

    client = get_client()
    key = client.key(USERS_TYPE, username)
    if client.get(key) is not None:
        errors.append("Already registered!")
    
    if errors:
        return flask.render_template("signup.html", errors=errors)
    
    entity = datastore.Entity(key=key)
    entity["username"] = username
    entity["password"] = hash_password(password1)
    client.put(entity)

    flask.session["user"] = username

    return flask.redirect("index.html")

@app.route("/login", methods=["POST"])
def login():
    username = flask.request.form["username"]
    password = flask.request.form["password"]

    client = get_client()
    key = client.key(USERS_TYPE, username)
    entity = client.get(key)
    if entity is None:
        error = "There is no account registered with this username!"
    elif hash_password(password) != entity["password"]:
        error = "Incorrect password!"
    else:
        error = None

    if error is not None:
        return flask.render_template("signin.html", error=error)
    
    flask.session["user"] = username

    return flask.redirect("index.html")

@app.route("/signup")
def signup():
    return flask.render_template("signup.html")

@app.route("/signin")
def signin():
    return flask.render_template("signin.html")

@app.route("/signout")
def signout():
    flask.session["user"] = None
    return flask.render_template("signout.html")

# @app.route('/get/sketches')
# def get_sketches():
#     request_json = request.get_json(force=True)
#     url = request_json.get("id")
    
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)




#Helper Methods

def hash_password(p):
    return hashlib.sha256(p.encode()).hexdigest()


def get_client():
    return datastore.Client()

def retrieve_item(id):
    client = get_client()
    key = client.key(ENTITY_TYPE, int(id))
    return client.get(key)

def update_item(item):
    client = get_client()
    client.put(item)

def delete_item(id):
    client = get_client()
    key = client.key(ENTITY_TYPE, int(id))
    client.delete(key)

def get_things():
    result = []
    client = get_client()
    query = client.query(kind=ENTITY_TYPE)
    for entity in query.fetch():
        result.append(entity)
    return result



    