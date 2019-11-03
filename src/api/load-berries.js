import axios from 'axios';

import pokeStore from '../data/AppStore.js';
import Berry from '../data/Berry.js';

import URL from './url.js';

// function that load a berry by its id
const berryLoader = async (berryId) => {
    // verify if the berry exists in the store
    let result = pokeStore.getters.getBerryById(berryId);
    if(result) return undefined;

    let url = URL.berriesLink + berryId;
    let berryRequestData = await axios.get(url);
    berryRequestData = berryRequestData.data;

    const data = {
        name: berryRequestData.name,
        id: berryId,
        specs: {
            size: berryRequestData.size,
            smoothness: berryRequestData.smoothness,
            soilDryness: berryRequestData.soil_dryness,
            maxHarvest: berryRequestData.max_harvest,
            naturalGiftPower: {
                value: berryRequestData.natural_gift_power,
                name: berryRequestData.natural_gift_type.name
            },
            growthTime: berryRequestData.growth_time,
            firmness: berryRequestData.firmness.name,
            flavors: berryRequestData.flavors.map(flavorData => {
                return {
                    name: flavorData.flavor.name,
                    potency: flavorData.potency
                }
            }),
        },
        sprite: berryRequestData.item.name + '.png',
    }

    const berry = new Berry(data);
    return berry;
}

export default berryLoader;