from flask import session, request
import flask_restful
from funcs.base.config import CONFIG

from aip import AipFace
import base64

BAIDU_APPID = CONFIG["BAIDU_AI"]["BAIDU_APPID"]
BAIDU_APIKEY = CONFIG["BAIDU_AI"]["BAIDU_APIKEY"]
BAIDU_SECRETKEY = CONFIG["BAIDU_AI"]["BAIDU_SECRETKEY"]

client = AipFace(BAIDU_APPID, BAIDU_APIKEY, BAIDU_SECRETKEY)


class User(flask_restful.Resource):
    '''
    Login
        Use for Login
    '''

    def get(self):
        '''
        Login
            Use for Login
        '''

        result = client.match([
            {
                'image': request.args.get("base64Img"),
                'image_type': 'BASE64',
            },
            {
                'image': CONFIG["USER"]["COMP_FACE"],
                'image_type': 'BASE64',
            }
        ])

        print(result)

        if result["score"] > 80:
            errno = 0
        else:
            errno = 200

        return {"errno": errno}

    def post(self):
        '''
        Login
            Use for Login
        '''

        img_base64 = request.form.get("base64Img")

        result = client.match([
            {
                'image': img_base64,
                'image_type': 'BASE64',
            },
            {
                'image': CONFIG["USER"]["COMP_FACE"],
                'image_type': 'BASE64',
            }
        ])

        print(result, type(result))

        if 0 == result["error_code"] and result["result"]["score"] > 80:
            errno = 0
        else:
            errno = 200        

        return {"errno": errno}
