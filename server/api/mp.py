from flask import session, request
import flask_restful
from funcs.base.config import CONFIG
import hashlib

class Mp(flask_restful.Resource):

    def get(self):
        
        print("???????????????????")

        signature = request.args.get("signature")
        timestamp = request.args.get("timestamp")
        nonce = request.args.get("nonce")
        token = "lalala"

        check_list = sorted([token,timestamp,nonce])

        print(check_list)     

        check_sign = hashlib.sha1("".join(check_list).encode())

        print(signature, check_sign.hexdigest())

        if signature == check_sign.hexdigest():
            echostr = request.args.get("echostr")
        else:
            echostr = 0

        return {
            "echostr": echostr
        }