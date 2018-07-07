from flask import Flask, request, g, session, jsonify, redirect
import flask_restful


import json
import uuid

from api.user import User
from api.globaldata import GlobalData
from api.doc import Doc
from api.doclist import DocList
from api.mp import Mp

from funcs.base.config import CONFIG

import os

app = Flask(__name__, static_url_path='', static_folder="../dist", root_path=os.getcwd())
app.secret_key = CONFIG["FLASK"]["SALT"]
api = flask_restful.Api(app)


@app.before_request
def session_check():
    app.logger.debug("lalala")

    print(session)

    if session.get("ip", 'noip') != request.remote_addr:
        session.clear()
        session["ip"] = request.remote_addr

        return redirect('/index.html')


@app.after_request
def after_request(response):
    response.set_cookie("Login", str(session.get("login",False)))
    return response

api.add_resource(GlobalData, '/globaldata')
api.add_resource(User, '/user')
api.add_resource(Doc, '/doc')
api.add_resource(DocList, '/doclist')
api.add_resource(Mp, '/mp')

@app.route('/')
def index():
    return redirect('/index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
