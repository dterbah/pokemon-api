export default class Pokemon {

    constructor(data) {
        this.id = data.id;
        this.sprites = data.sprites;
        this.height = data.height;
        this.baseExperience = data.baseExperience;
        this.moves = data.moves;
        this.name = data.name;
    }
}