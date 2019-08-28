import Pokemon from "../Models/Pokemon.js";

let _pokeApi = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/pokemon'
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
        return _state.apiPokemon.map(p => new Pokemon(p))
    }
    get CurrentPokemon() {
        return new Pokemon(_state.currentPokemon)
    }
    //endregion

    //NOTE adds the subscriber function to the array based on the property it is watching
    addSubscriber(propName, fn) {
        _subscribers[propName].push(fn)
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

    //getOne



    //#region SANDBOX
    //get
    //post
    //put
    //delete
    //#endregion



}
