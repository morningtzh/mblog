from flask import session, request
import flask_restful

# from aip import AipFace
#
# BAIDU_APPID = "1516441"
# BAIDU_APIKEY = "nh8HwKjG1uWZzxnmgktLgt22"
# BAIDU_SECRETKEY = "ctzoWqkyuefPu52OyyDGYaZUifGBBPkM"

#client = AipFace(BAIDU_APPID, BAIDU_APIKEY, BAIDU_SECRETKEY)


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
        session['qw'] = '111'
        return {'hello': 'world'}

    def post(self):
        return {'ddd': 'ddddd'}
