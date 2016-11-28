
#node --stack-size=32000 app.js
forever start -o out.log -e err.log app.js
