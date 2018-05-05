from flask import session, request, jsonify
import flask_restful


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
            "likeNum": 214423,
            "keywordList": ['wasabi', 'idea', '大傻', '666'],
            "blogCategoryList": ['111', '222', '333'],
            "hashtagList": ['#sdf', '#b4rwef', '#bdsvw4', '#444', '#fvdrbv'],
        }

        return jsonify({
            "error": 0,
            "global_data": global_data
        })

    def post(self):
        return {'ddd': 'ddddd'}
