export default class Pokemon {

    constructor(data) {
        this.id = data.id;
        this.sprites = data.sprites;
        this.height = data.height;
        this.baseExperience = data.baseExperience;
        this.name = data.name;
        this.specs = data.specs;
        this.evolutions = data.evolutions;
    }
}