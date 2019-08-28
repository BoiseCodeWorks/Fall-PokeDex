export default class Pokemon {
    constructor(data) {
        this.name = data.name
        this.img = data.img || data.sprites.front_default
        this.weight = data.weight
        this.height = data.height
        this.types = data.types
    }

    generateTypeClasses() {
        let classes = ''
        this.types.forEach(t => classes += t.type.name + ' ')
        return classes
    }

    get Template() {
        return `
        <div class="card ${this.generateTypeClasses()}">
            <img src="${this.img}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${this.name}</h5>
                <p class="card-text">Weight: ${this.weight} - Height: ${this.height}</p>
            </div>
        </div>
    `
    }
}

