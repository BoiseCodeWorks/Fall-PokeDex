import PokeService from "../Services/PokeService.js";

//Private
let _pokeService = new PokeService()

//NOTE Draw All Pokemon Names
function _drawApiPokemon() {
    let pokemon = _pokeService.ApiPokemon
    let template = '<ol>'
    pokemon.forEach(p => {
        template += `<li onclick="app.controllers.pokeController.getOne('${p.name}')">${p.name}</li>`
    })
    document.getElementById('api-pokemon').innerHTML = template + "</ol>"
}

function _drawCurrentPokemon() {
    document.getElementById("current-pokemon").innerHTML = _pokeService.CurrentPokemon.Template
}

function _drawMyPokemon() {
    let pokemon = _pokeService.MyPokemon
    let template = '<ol>'
    pokemon.forEach(p => {
        template += `<li onclick="app.controllers.pokeController.setOne('${p._id}')">${p.name}</li>`
    })
    document.getElementById('my-pokemon').innerHTML = template + "</ol>"
}


//Public
export default class PokeController {
    constructor() {
        //NOTE Register all subscribers
        _pokeService.addSubscriber('apiPokemon', _drawApiPokemon)
        _pokeService.addSubscriber('currentPokemon', _drawCurrentPokemon)
        _pokeService.addSubscriber('myPokemon', _drawMyPokemon)


        //NOTE Retrieve data
        _pokeService.getAllApi()
        _pokeService.getMyPokemon()
    }

    getOne(name) {
        _pokeService.getOne(name)
    }
    setOne(id) {
        _pokeService.setOne(id)
    }

    catchPokemon() {
        _pokeService.catch()
    }
    releasePokemon() {
        _pokeService.releasePokemon()
        document.getElementById('current-pokemon').innerHTML = ''
    }

}