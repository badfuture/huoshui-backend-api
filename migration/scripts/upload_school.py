import requests
import json
import os
from pprint import pprint

url = 'http://114.55.26.28:1337/'

url_school = url + 'school'
url_dept = url + 'dept'
url_course = url + 'course'


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
