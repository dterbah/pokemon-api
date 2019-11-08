import axios from 'axios';

import pokeStore from '../data/AppStore.js';
import Item from '../data/Item.js';
import URL from './url.js';

// function that load an item by its id
const itemLoader = async (itemId) => {
    let result = pokeStore.getters.getItemByid(itemId);
    if(result) return undefined;

    let url = URL.itemLink + itemId;
    const itemRequestData = await axios.get(url);
    const rawData = itemRequestData.data;

    const data = {
        attributes: rawData.attributes.map(attribute => attribute.name),
        specs: {
            category: rawData.category.name.sanitize().firstLetterToUpper(),
            effects: rawData.effect_entries.map(entry => {
                return {
                    resume: entry.effect,
                    short_effect: entry.language.short_effect
                };
            }),
            cost: rawData.cost,

        },
        id: rawData.id,
        name: rawData.name.firstLetterToUpper().sanitize(),
        sprite: rawData.sprites.default
    }
    
    const item = new Item(data);
    return item;
}

export default itemLoader;