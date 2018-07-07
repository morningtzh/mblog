from flask import session, request, jsonify
import flask_restful

from funcs.docs import *
import json


class Doc(flask_restful.Resource):
    """
    DocList
        Use for Get documents list
    """

    def get(self):
        """
        Get DocList
            Use for Get documents list

            request data:
                doc_type: all|moment|blog
                option:
                    time: list or string
                    index: string
                    hashtag: list or string
                    category: string

            response data:
                errno: int
                describe: string
                doc_list:
                    index: num
                    writer: string
                    write_time: string
                    edit_time: string
                    category: string
                    hashtag: list
                    like_num: num
                    content: string
        """

        doc_id = request.args.get("id")

        try:
            doc = get_doc(doc_id)

        except Exception as e:
            print(e)
            return {
                "error": 1,
                "describe": "找不到你要的博客"
            }

        return jsonify({
            "errno": 0,
            "describe": "ok",
            "doc": doc
        })

    def post(self):
        """
        Post Doc
            Use for Get documents list

            request data:
                doc_type: moment|blog
                writer: string
                hashtag: list
                content: string

            response data:
                errno:
                describe
        """

        if session.get("login",False) is not True:
            return {
                "errno": 699,
                "describe": "需要登录"
            }

        errno = 0
        describe = "ok"
        print(request.form)
        if "doc_type" not in request.form or "content" not in request.form:
            errno = 200
            describe = "arg error"

            return {
                "errno": errno,
                "describe": describe
            }

        doc_type = request.form.get("doc_type")
        content = request.form.get("content")
        hashtag = request.form.get("hashtag")
        category = request.form.get("category", 'unclassed')
        share_url = request.form.get("share_url")

        hashtag = [] if hashtag == None or hashtag == "" else hashtag.split( "," )

        if doc_type not in ['blog', 'moment']:
            errno = 200
            describe = "arg error"

            return {
                "errno": errno,
                "describe": describe
            }

        if isinstance(hashtag, str):
            hashtag = json.loads(hashtag)

        attachments = {
            "writer": "MorningTZH",
            "hashtag": hashtag,
            "category": category,
            "share_url": share_url,
        }

        add_doc(doc_type, content, attachments)

        return {'errno': 0, "describe": "发表成功"}


    def patch(self):
        """
        Patch Doc
            Use for Get documents list

            request data:
                id: string
                type: like|content|
                data:  

            response data:
                errno: int
                describe: string
            
        """

        if session.get("login",False) is not True:
            return {
                "errno": 699,
                "describe": "需要登录"
            }

        id = request.form.get("id")
        content = request.form.get("content")
        hashtag = request.form.get("hashtag")

        hashtag = [] if hashtag == None or hashtag == "" else hashtag.split( "," )
        if isinstance(hashtag, str):
            hashtag = json.loads(hashtag)

        edit_doc(id, content, hashtag)

        return {"errno":0}