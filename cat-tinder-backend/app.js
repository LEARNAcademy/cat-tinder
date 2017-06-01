var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var Cat = require('./models').Cat
var User = require('./models').User

var corsPrefetch = require('cors-prefetch-middleware').default
var imagesUpload = require('images-upload-middleware').default

app.use(corsPrefetch)

app.use(express.static('public'))
app.use(bodyParser.json())

const authorization = function(request, response, next){
  const token = request.query.authToken || request.body.authToken
  if(token){
    User.findOne({
      where: {authToken: token}
    }).then((user)=>{
      if(user){
        request.currentUser = user
        next()
      }else{
        response.status(401)
        response.json({message:'Authorization Token Invalid'})
      }
    })
  }else{
    response.status(401)
    response.json({message: 'Authorization Token Required'})
  }
}

app.get('/', function (request, response) {
  response.json({message: 'API Example App'})
});

app.get('/cats', function(request, response){
  Cat.findAll().then(function(cats){
    response.status(200)
    response.json({status: 'success', cats: cats})
  })
})

app.post('/create_cat', authorization, function(request, response){
  console.log(request.body)
  let catParams = request.body.cat
  Cat.create(catParams).then(function(cat){
    response.status(200)
    response.json({status: 'success', cat: cat})
  }).catch(function(error){
    response.status(400)
    response.json({status: 'error', error: error})
  })
})

app.post('/login_user', function(request, response){
  // look up the user by username
  User.findOne({where: {username: request.body.user.username}}).then(function(user){
    if(user){
      // check the password and return 200 & the user if valid
      if(user.verifyPassword(request.body.user.password)){
        response.status(200)
        response.json({status: 'success', user: user})
      } else {
        response.status(401)
        response.json({status: 'error', error: 'could not log in'})
      }
    } else {
      response.status(401)
      response.json({status: 'error', error: 'could not log in'})
    }
  })
  // return 401 unauthorized if not valid
})

app.post('/create_user', function(request, response){
  console.log(request.body)
  let userParams = request.body.user
  User.create(userParams).then(function(user){
    response.status(200)
    response.json({status: 'success', user: user})
  }).catch(function(error){
    response.status(400)
    response.json({status: 'error', error: error})
  })
})


app.post('/files', imagesUpload(
    './public/files',
    'http://localhost:4000/files'
));

app.listen(4000, function () {
 console.log('listening on port 4000!');
});
