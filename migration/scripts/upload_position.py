import requests
import json
import os
from pprint import pprint

url = 'http://114.55.26.28:1337/'

url_school = url + 'school'
url_dept = url + 'dept'
url_course = url + 'course'
url_position = url + 'course'
url_prof = url + 'prof'
url_user = url + 'signup'
url_user = url + 'review'

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
