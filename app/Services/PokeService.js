import Pokemon from "../Models/Pokemon.js";

let _pokeApi = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/pokemon'
})

let _sandBox = axios.create({
    baseURL: '//bcw-sandbox.herokuapp.com/api/none/pokemon'
})


//Private
let _state = {
    myPokemon: [],
    apiPokemon: [],
    currentPokemon: {}
}

//NOTE methods to run when a given property in state changes
let _subscribers = {
    myPokemon: [],
    apiPokemon: [],
    currentPokemon: []
}

function _setState(propName, data) {
    //NOTE add the data to the state
    _state[propName] = data
    //NOTE run every subscriber function that is watching that data
    _subscribers[propName].forEach(fn => fn());
}

//Public
export default class PokeService {
    //#region GETTERS
    get MyPokemon() {
        return _state.myPokemon.map(p => new Pokemon(p))
    }
    get ApiPokemon() {
        return _state.apiPokemon
    }
    get CurrentPokemon() {
        return new Pokemon(_state.currentPokemon)
    }
    //endregion

    //NOTE adds the subscriber function to the array based on the property it is watching
    addSubscriber(propName, fn) {
        _subscribers[propName].push(fn)
    }


    setOne(id) {
        let poke = _state.myPokemon.find(p => p._id == id)
        _setState('currentPokemon', poke)
    }


    //#region PokeAPI
    getAllApi() {
        _pokeApi.get()
            .then(res => {
                _setState('apiPokemon', res.data.results)
                console.log(res.data.results)
            })
            .catch(err => console.error(err))
    }

    getOne(name) {
        _pokeApi.get(name)
            .then(res => {
                let poke = new Pokemon(res.data)
                _setState('currentPokemon', poke)
                console.log(poke);
            })
            .catch(err => console.error(err))
    }
    //endregion



    //#region SANDBOX
    //get
    getMyPokemon() {
        _sandBox.get()
            .then(res => {
                let data = res.data.data.map(p => new Pokemon(p))
                _setState('myPokemon', data)
                console.log(data);

            })
            .catch(err => console.error(err))
    }

    //post
    catch() {
        _sandBox.post('', _state.currentPokemon)
            .then(res => {
                _state.myPokemon.push(new Pokemon(res.data.data))
                _setState('myPokemon', _state.myPokemon)
            })
            .catch(err => console.error(err))
    }
    //put
    //delete

    //api/NAME/pokemon/:id
    releasePokemon(cb) {
        _sandBox.delete(_state.currentPokemon._id)
            .then(res => {
                let index = _state.myPokemon.findIndex(p => p._id == _state.currentPokemon._id)
                _state.myPokemon.splice(index, 1)
                _setState('myPokemon', _state.myPokemon)
                //this.getOne(_state.currentPokemon.name)
                // _state.currentPokemon._id = undefined
                // _setState('currentPokemon', _state.currentPokemon)
            })
    }
    //#endregion



}
