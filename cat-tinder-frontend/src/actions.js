import Dispatcher from './Dispatcher'

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
        Dispatcher.dispatch({
          type: 'CREATE_CAT',
          cat: body.cat
        })
      })
    } else {
      // else update the message to say there was a failure
    }
  }).catch(function(error){
    //TODO error handling
  })

}
