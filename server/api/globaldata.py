from flask import session, request, jsonify
import flask_restful

from funcs.docs import *

class GlobalData(flask_restful.Resource):
    """
    Login
        Use for Login
    """

    def get(self):
        '''
        Login
            Use for Login
        '''

        global_data = {
            "blogNum": 999,
            "momentNum": 666,
            "likeNum": get_like_num(),
            "blogCategoryList": ['111', '222', '333'],
            "hashtagList": get_hashtags(),
        }

        return jsonify({
            "error": 0,
            "global_data": global_data
        })

    def post(self):
        return {'ddd': 'ddddd'}
