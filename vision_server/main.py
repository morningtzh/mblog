'''
Vision Server
'''

import os
#import flask
import flask_restful
from flask import Flask, redirect

from api.login import Login

app = Flask(__name__, static_url_path='', static_folder="dist", root_path=os.getcwd())
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'
api = flask_restful.Api(app)

#jump / to /index.html
@app.route('/')
def index():
    return redirect('/index.html')

class HelloWorld(flask_restful.Resource):
    def get(self):
        return {'hello': 'world'}

api.add_resource(HelloWorld, '/hello')
api.add_resource(Login, '/login')

if __name__ == '__main__':
    print(os.getcwd())

    app.run(debug=True)
