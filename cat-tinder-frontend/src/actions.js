import catStore from './stores/CatStore'
import userStore from './stores/UserStore'
import Dispatcher from './Dispatcher'

export function loginOrRedirect(props){
  let currentUser = userStore.getUser()
  if(currentUser === null){
    props.history.push("/login")
    return false
  }
  return true
}

export function userLogout(){
  Dispatcher.dispatch({
    type: 'LOGOUT'
  })
}
export function checkLogin(){
  Dispatcher.dispatch({
    type: 'CHECK_LOGIN'
  })
}

export function updateCats(){
  // make the api calls to get the list of cats
  const params = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  }
  fetch("http://localhost:4000/cats", params).then(function(response){
    if(response.status === 200){
      response.json().then(function(body){
        Dispatcher.dispatch({
          type: 'UPDATE_CATS',
          cats: body.cats
        })
      })
    }
  }).catch(function(error){
    //TODO handle errors
  })
  // update the store with a dispatch
}


export function addCat(attributes){
  // set up the headers and request
  let currentUser = userStore.getUser()
  if(currentUser){
    attributes.authToken = currentUser.authToken
  }
  const params = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(attributes)
  }
  // send state to the backend server
  fetch("http://localhost:4000/create_cat", params).then(function(response){
    // if post is successful update the message to be successful
    // and update the state to equal what we get back from the server
    if(response.status === 200){
      response.json().then(function(body){
        // send the cat to the store
        Dispatcher.dispatch({
          type: 'CREATE_CAT',
          cat: body.cat
        })
      })
    } else if(response.status === 401) {
      catStore.updateMessage("You Need To Log In First")
      //TODO redirect to login
    }
  }).catch(function(error){
    catStore.updateMessage("There was an error: " + error)
  })
}

export function loginUser(attributes){
  // set up the headers and request
  const params = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(attributes)
  }
  // send state to the backend server
  fetch("http://localhost:4000/login_user", params).then(function(response){
    // if post is successful update the message to be successful
    // and update the state to equal what we get back from the server
    if(response.status === 200){
      response.json().then(function(body){
        // send the cat to the store
        Dispatcher.dispatch({
          type: 'LOGIN_USER',
          user: body.user
        })
      })
    }
  }).catch(function(error){
    userStore.updateMessage("There was an error: " + error)
  })
}

export function addUser(attributes){
  // set up the headers and request
  const params = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(attributes)
  }
  // send state to the backend server
  fetch("http://localhost:4000/create_user", params).then(function(response){
    // if post is successful update the message to be successful
    // and update the state to equal what we get back from the server
    if(response.status === 200){
      response.json().then(function(body){
        // send the cat to the store
        Dispatcher.dispatch({
          type: 'CREATE_USER',
          user: body.user
        })
      })
    }
  }).catch(function(error){
    userStore.updateMessage("There was an error: " + error)
  })
}
