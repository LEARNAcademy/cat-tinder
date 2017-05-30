import {EventEmitter} from 'events'
import Dispatcher from '../Dispatcher'

class UserStore extends EventEmitter{
  constructor(){
    super()
    this.user = null
    this.message = ""
  }

  getUser(){
    return this.user
  }

  updateUser(attributes){
    this.user = attributes
    this.message = "User Created"
    this.emit('message')
  }

  getMessage(){
    return this.message
  }

  handleActions(action){
    switch(action.type){
      case("CREATE_USER"):{
        this.updateUser(action.user)
        break
      }
      default:{}
    }
  }

}
const store = new UserStore()
Dispatcher.register(store.handleActions.bind(store))
window.user_store = store
export default store
