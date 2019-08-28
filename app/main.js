import PokeController from "./Controllers/PokeController.js";


class App {
    constructor() {
        this.controllers = {
            pokeController: new PokeController()
        }
    }
}

window['app'] = new App()