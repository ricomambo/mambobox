import os
import sqlite3
from flask import Flask, g

app = Flask(__name__)

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
    return "acá dice algo del estado actual de las cosas dentro de la caja"


if __name__ == "__main__":
    app.run()