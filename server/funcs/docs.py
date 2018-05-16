from urllib.parse import quote_plus
from pymongo import MongoClient
import pymongo
from bson.objectid import ObjectId
import time
import datetime
import re

from funcs.base.config import CONFIG

client = MongoClient(CONFIG["MONGODB"]["ADDRESS"])
db = client.get_database(CONFIG["MONGODB"]["DATABASE"])

if CONFIG["MONGODB"]["AUTH"]:
    db.authenticate(CONFIG["MONGODB"]["USERNAME"], CONFIG["MONGODB"]["PASSWORD"])


def counttime(timedelta):
    post_before = ''

    if timedelta.days:
        if timedelta.days // 30:
            post_before = str(timedelta.days // 30) + " months ago"
        else:
            post_before = str(timedelta.days) + " months ago"

    else:
        if timedelta.seconds // 3600:
            post_before = str(timedelta.seconds // 3600) + " hours ago"
        elif timedelta.seconds // 60:
            post_before = str(timedelta.seconds // 60) + " minutes ago"
        else:
            post_before = str(timedelta.seconds) + " seconds ago"

    return post_before


def get_doc_list(doc_type='all', option={}):
    cursor = db.docs.find().sort([('_id', pymongo.DESCENDING)]).skip(option.get("start", 0)).limit(option.get("limit", 10))

    doc_list = []

    for document in cursor:
        write_time = document["write_time"]
        post_before = counttime(datetime.datetime.utcnow() - write_time)

        doc = {
            "id": str(document["_id"]),
            "doc_type": document["doc_type"],
            "title": document.get("title", ''),
            "content": document.get("content", ''),
            "category": document.get("category", "unclassed") if doc_type == "moment" else "moment",
            "hashtag": document.get("hashtag", []),
            "writer": document.get("writer", "MorningTZH"),
            "share_url": document.get("share_url", None),
            "write_time": document.get("write_time", datetime.datetime.utcnow()),
            "edit_time": document.get("edit_time", datetime.datetime.utcnow()),
            "summary": document.get("summary", ''),
            "like_num": document.get("like_num", 0),
            "read_num": document.get("read_num", 0),
            "comments": document.get("comments", []),
            "attachments": document.get("attachments", []),
            "post_before": post_before,
        }

        doc_list.append(doc)

    print(doc_list)

    return doc_list


def get_doc(id=None):
    print("get_doc", id, ObjectId(id))
    document = db.docs.find_one({"_id": ObjectId(id)})

    if document is not None:
        doc = {
            "id": str(document["_id"]),
            "doc_type": document["doc_type"],
            "title": document.get("title", ''),
            "content": document.get("content", ''),
            "category": document.get("category", "unclassed"),
            "hashtag": document.get("hashtag", []),
            "writer": document.get("writer", "MorningTZH"),
            "share_url": document.get("share_url", None),
            "write_time": document.get("write_time", datetime.datetime.utcnow()),
            "edit_time": document.get("edit_time", datetime.datetime.utcnow()),
            "summary": document.get("summary", ''),
            "like_num": document.get("like_num", 0),
            "read_num": document.get("read_num", 0),
            "comments": document.get("comments", []),
            "attachments": document.get("attachments", []),
        }
    else:
        raise Exception("can't find document by id {id}".format(id=id))

    return doc


def add_doc(doc_type, content, attachments={}):
    """
    Add Doc
        request data:
            doc_type: moment|blog
            writer: string
            hashtag: list
            content: string

        response data:
            errno:
            describe
    """

    #content_first_break_index = content.find('\n')

    print(content)
    content_first_break_index = re.search(r'\n', content, re.M).span()[0]

    print(content_first_break_index)

    try:
        doc = {
            "doc_type": doc_type,
            "title": "" if doc_type == "moment" else content[0:content_first_break_index],
            "content": content,
            "category":  "moment" if doc_type == "moment" else attachments.get("category", "unclassed"),
            "hashtag": attachments.get("hashtag", []),
            "writer": attachments.get("writer", "MorningTZH"),
            "share_url": attachments.get("share_url", None),
            "write_time": datetime.datetime.utcnow(),
            "edit_time": datetime.datetime.utcnow(),
            "summary": content if doc_type == "moment" else re.sub('[\r\n\t#*]', '', content[
                content_first_break_index: content_first_break_index + 140
            ]),
            "like_num": 0,
            "read_num": 0,
            "comments": [],
            "attachments": []
        }

        print(doc)

        db.docs.insert(doc)

    except IOError as e:
        print("add_doc", e)
        raise Exception("nanana")

def like():
    pass

