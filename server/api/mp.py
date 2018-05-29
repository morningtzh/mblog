from flask import session, request
import flask_restful
from funcs.base.config import CONFIG
import hashlib

class Mp(flask_restful.Resource):


    def get(self):
        
        print(request.args)
        print(request.args.keys())

        signature = request.args.get("signature")
        timestamp = request.args.get("timestamp")
        nonce = request.args.get("nonce")
        token = "lalala"

        check_sign = hashlib.sha1("".join([token,timestamp,nonce].sort()))

        print(signature, check_sign)


        return request.args.get("echostr")