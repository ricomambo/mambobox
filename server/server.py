import os
import sqlite3
from flask import Flask, g, jsonify, Response
from flask.ext.cors import CORS

# temperature and humidity
from sensors import dht11

app = Flask(__name__)
CORS(app)

app.config.update(dict(
    DATABASE=os.path.join(app.root_path, 'mambobox.db'),
    DEBUG=True
))

def connect_db():
    db = sqlite3.connect(app.config['DATABASE'])
    db.row_factory = sqlite3.Row
    return db

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = connect_db()
    return db

@app.teardown_appcontext
def teardown_db(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


@app.route("/")
def index():
    return Response("andate", mimetype='text/plain')

@app.route("/sensors")
def get_sensors():
    sensors = ['dht11']
    response = {"sensors":[]}
    for sensor in sensors:
        metric = eval(sensor).read()
        response["sensors"].append(metric)

    return jsonify(response)


if __name__ == "__main__":
    app.run()