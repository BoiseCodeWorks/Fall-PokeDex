import PokeService from "../Services/PokeService.js";

//Private
let _pokeService = new PokeService()



//Public
export default class PokeController {
    constructor() {
        //NOTE Register all subscribers


        //NOTE Retrieve data
        _pokeService.getAllApi()
    }
}