from flask import Flask, request, g, session, jsonify
import flask_restful

import json
import uuid

from api.user import User

import os

app = Flask(__name__, static_url_path='', static_folder="static", root_path=os.getcwd())
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'
api = flask_restful.Api(app)

@app.before_request
def session_check():
    app.logger.debug("lalala")

    print(session)

    if session.get("ip", 'noip') != request.remote_addr:
        session.clear()
        session["ip"] = request.remote_addr

        resp = app.make_response(jsonify({"err": "333"}))
        return resp


@app.after_request
def after_request(response):
    return response


api.add_resource(User, '/')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
