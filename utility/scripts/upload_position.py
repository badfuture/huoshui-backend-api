import requests
import json
import os
from pprint import pprint

url_school = 'http://localhost:1337/school'
url_dept = 'http://localhost:1337/dept'
url_course = 'http://localhost:1337/course'
url_position = 'http://localhost:1337/position'

json_dir = '../jsons'
school_json = os.path.join(json_dir, 'school.json')
tag_json =os.path.join(json_dir, 'tag.json')
course_json =os.path.join(json_dir, 'course.json')
position_json =os.path.join(json_dir, 'position.json')

position_data = json.loads(open(position_json).read())

def initModelPosition(position):
    model = {}
    model['name'] = position['name']
    return model


for position in position_data:
    print(position['name'])
    model = initModelPosition(position)
    r = requests.post(url_position, params=model)



"""

"""
