import json

with open('riak_status.json') as data_file:
    stats = json.load(data_file)

for key in stats:
    if stats[key]["description"] == '' and stats[key]["category"] != "versions":
        print key
