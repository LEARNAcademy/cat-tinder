import {EventEmitter} from 'events'
import Dispatcher from '../Dispatcher'

class CatStore extends EventEmitter{
  constructor(){
    super()
    this.cats = [
      {
        color: 'blue',
        breed: 'siamiese',
        gender: 'Male',
        habitat: 'Outdoor',
        personality: 'smug',
        age: '8'
      },
      {
        color: 'green',
        breed: 'minx',
        gender: 'Male',
        habitat: 'Outdoor',
        personality: 'smart',
        age: '4'
      }
    ]
    this.newCat = {}
  }

  getCats(){
    return this.cats
  }

  getNewCat(){
    return this.newCat
  }

  updateNewCat(attributes){
    this.newCat = attributes
    debugger
    this.cats.push(attributes)
    this.emit('change')
  }

  updateCats(attributes){
    this.cats = attributes
    this.emit('change')
  }

  handleActions(action){
    switch(action.type){
      case("CREATE_CAT"):{
        this.updateNewCat(action.cat)
        break
      }
      case("UPDATE_CATS"):{
        this.updateCats(action.cats)
        break
      }
      default:{}
    }
  }
}

const store = new CatStore()
Dispatcher.register(store.handleActions.bind(store))
window.store = store
export default store
