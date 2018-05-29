from flask import session, request
import flask_restful
from funcs.base.config import CONFIG

class Mp(flask_restful.Resource):


    def get(self):
        
        print(request.args)
        print(request.args.keys())

    return {"errno":200}