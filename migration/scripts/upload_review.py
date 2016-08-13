# -*- coding: utf-8 -*-

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
user_json =os.path.join(json_dir, 'user.json')
review_json =os.path.join(json_dir, 'review.json')

review_data = json.loads(open(review_json).read())['results']

def getSchoolId():
  model = {}
  model['name'] = '西南交通大学'
  r = requests.get(url_school, params=model)
  if 'id' in r.json()[0]:
    return r.json()[0]['id']
  else:
    return null

def getUserId(review):
  model = {}
  model['email'] = review['authorId']['email']
  r = requests.get(url_user, params=model)
  if 'id' in r.json()[0]:
    return r.json()[0]['id']
  else:
    return null


def getCourseId(review):
  profName = review['profName']
  courseName = review['courseName']
  r = requests.get(url_course + '?name=' + courseName)
  if (len(r.json()) > 0):
    for course in r.json():
      if (course['prof']['name'] == profName):
        return course['id']
      else:
        return null

def initModelReview(review):
  model = {}
  model['school'] = getSchoolId()
  model['course'] = getCourseId(review)
  model['author'] = getUserId(review)
  model['text'] = review['comment']
  model['downVote'] = review['downVote']
  model['upVote'] = review['upVote']
  model['professional'] = review['rating']['rate1']
  model['expressive'] = review['rating']['rate2']
  model['kind'] = review['rating']['rate3']
  model['checkAttendance'] = review['attendance']['value'] + 1
  model['lotsHomework'] = review['homework']['value'] + 1
  model['birdy'] = review['bird']['value'] + 1
  model['hasExam'] = review['exam']['touched']
  model['examprep'] = 4 if (review['exam']['examprep']['checked']) else 1
  model['openbook'] = 4 if (review['exam']['openbook']['checked']) else 1
  model['oldquestion'] = 4 if (review['exam']['oldquestion']['checked']) else 1
  model['easymark'] = 4 if (review['exam']['easiness']['checked']) else 1
  return model

for review in review_data:
  print(review['courseName'] + ': ' + review['profName'])
  #print(getCourseId(review))
  #model = initModelReview(review)
  #r = requests.post(url_review, params=model)

#add course to each tag
#find course Id form profname and courseName
