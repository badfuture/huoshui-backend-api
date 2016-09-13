

//set to production model
export NODE_ENV=production

/*****************************************
sails console
******************************************/
//start sails console
sails console

//find
School.find().exec(function(err, foundRecords){console.log('records: ', foundRecords);});

User.find({username: ['sailsinaction', 'nikolateslaidol']}).exec(function(err,
       foundRecords){if (err) console.log(err); console.log(foundRecords); });

School.find({name: {'contains': '西'}}).exec(function(err, found) {if (err)
       console.log(err);console.log(found);});

//create
User.create({email: 'sailsinaction@gmail.com',username:'sailsinaction', deleted:
       false,banned: false,admin: false}).exec(function(err, foundRecords){ if (err)
       console.log(err); console.log(foundRecords);});

//count
School.count().exec(function(err, count){if (err) console.log(err); console.log(count);});


/**********************************
commands
***********************************/
sails new brushfire
sails lift
sails generate api user
sails generate controller user
npm install the‐ultimate‐question –save
