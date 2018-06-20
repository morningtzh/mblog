
from ctypes import *
from platform import *
from pymongo import MongoClient
import time

if __name__ == '__main__':

    # 连接 mongo
    client = MongoClient('mongodb://localhost:27017/')
    db = client.get_database("")
    db.authenticate("", "")

    # 加载动态链接库
    clib = cdll.LoadLibrary("./libscanner.so")

    # 定义变量
    typeCIntArray10 = c_int * 10
    dest_ports = typeCIntArray10()

    dest_ports[0] = c_int(21)
    dest_ports[1] = c_int(22)
    dest_ports[2] = c_int(27017)

    # 跑起来
    clib.SCN_InitScanner(c_int(1000), c_int(3), dest_ports)

    clib.SCN_StartScanner()

    time.sleep(10)

    # 将返回值定义为 *char 
    clib.SCN_StopScanner.restype = c_char_p

    #读返回值
    result = clib.SCN_StopScanner()
    results = result.decode().split("\n")

    # 写数据库
    for result in results:
        [ip, port] = result.split(":")

        db.ipinfo.update({"ip":ip}, {"$push":{"ports":port}}, upsert=True)