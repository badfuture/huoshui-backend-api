# -*- coding: utf-8 -*-

import requests
import json
import os
from pprint import pprint

url_school = 'http://localhost:1337/school'
url_dept = 'http://localhost:1337/dept'
url_course = 'http://localhost:1337/course'
url_position = 'http://localhost:1337/position'
url_prof = 'http://localhost:1337/prof'
url_user = 'http://localhost:1337/auth/signup'


json_dir = '../jsons'
school_json = os.path.join(json_dir, 'school.json')
tag_json =os.path.join(json_dir, 'tag.json')
course_json =os.path.join(json_dir, 'Courses.json')
user_json =os.path.join(json_dir, '_User.json')

user_data = json.loads(open(user_json).read())['results']


def getSchoolId():
  model = {}
  model['name'] = '西南交通大学'
  r = requests.get(url_school, params=model)
  if 'id' in r.json()[0]:
    return r.json()[0]['id']
  else:
    return None

def getDeptId(user):
  model = {}
  model['shortname'] = user['dept']
  r = requests.get(url_dept, params=model)
  if (len(r.json()) > 0) :
    if 'id' in r.json()[0]:
      return r.json()[0]['id']
    else:
      return None
  else:
    print('failed: ' + user['username'])
    return None


def initModelUser(user):
  model = {}
  model['email'] = user['email']
  model['username'] = user['username']
  model['year'] = user['year']
  model['dept'] = getDeptId(user)
  model['school'] = getSchoolId()
  model['password'] = user['password']
  model['salt'] = user['salt']
  model['origin'] = 'leancloud'
  return model

for user in user_data:
  print(user['username'])
  model = initModelUser(user)
  r = requests.post(url_user, params=model)
