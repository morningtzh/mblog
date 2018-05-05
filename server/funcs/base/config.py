import json


CONFIG = {}

with open("config.json",'r') as load_f:
    CONFIG = json.load(load_f)
    print(CONFIG)

