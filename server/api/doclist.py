from flask import session, request, jsonify
import flask_restful

from funcs.docs import get_doc_list


class DocList(flask_restful.Resource):
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
                doc_list:
                    index: num
                    writer: string
                    write_time: string
                    edit_time: string
                    hashtag: list
                    like_num: num
                    content: string
        """

        doc_type = request.args.get("doc_type", "all")
        start = int(request.args.get("start", "0"))

        print(start, type(start))
        option = {
            "start": start
        }

        print(option)
        docs = get_doc_list( doc_type, option)

        return jsonify({
            "errno": 0,
            "describe": "ok",
            "docs": docs
        })

    def post(self):
        return {'ddd': 'ddddd'}
