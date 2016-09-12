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

school_data = json.loads(open(school_json).read())

def initModelSchool(raw):
    model = {}
    model['name'] = raw['name']
    if 'campus' in raw:
        model['campus'] = raw['campus']
    return model

def initModelDept(raw, schoolId):
    model = {}
    model['shortname'] = raw['shortname']
    model['longname'] = raw['longname']
    model['school'] = schoolId
    return model


for school in school_data:
    #print json.dumps(entry, indent=2, sort_keys=True)
    print(school['name'])
    model = initModelSchool(school)
    r = requests.post(url_school, params=model)
    schoolId = r.json()['id']
    if 'depts' in school:
        for dept in school['depts']:
            model = initModelDept(dept,schoolId)
            r = requests.post(url_dept, params=model)





"""




"""
