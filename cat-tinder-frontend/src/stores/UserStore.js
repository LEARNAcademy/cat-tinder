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
    localStorage.setItem('authToken', attributes.authToken);
    localStorage.setItem('authTokenExpiration', attributes.authTokenExpiration);
    localStorage.setItem('email', attributes.email);
    this.emit('login')
  }

  setUserFromLocal(){
    let token = localStorage.getItem('authToken')
    let expire = new Date(localStorage.getItem('authTokenExpiration'))
    if(token && expire >= new Date()){
      this.user = {
        authToken: token,
        authTokenExpiration: expire,
        email: localStorage.getItem('email')
      }
      this.emit('login')
    }
  }

  getMessage(){
    return this.message
  }

  logout(){
    this.user = null
    localStorage.setItem('authToken', null);
    localStorage.setItem('authTokenExpiration', null);
    localStorage.setItem('email', null);
    this.emit('login')
  }

  handleActions(action){
    switch(action.type){
      case("CREATE_USER"):{
        this.updateUser(action.user)
        this.message = "User Created"
        this.emit('message')
        break
      }
      case("LOGOUT"):{
        this.logout()
        break
      }
      case("CHECK_LOGIN"):{
        this.setUserFromLocal()
        break
      }
      case("LOGIN_USER"):{
        this.updateUser(action.user)
        this.message = "User Logged In"
        this.emit('message')
        this.emit('login')
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
