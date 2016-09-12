import requests
import json
import os
from pprint import pprint
import global_config as cfg

url_school = cfg.url_school
url_dept = cfg.url_dept
url_course = cfg.url_course
url_position = cfg.url_position
url_prof = cfg.url_prof
url_user = cfg.url_user
url_review = cfg.url_review

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
