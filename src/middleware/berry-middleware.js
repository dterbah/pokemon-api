import pokeStore from './../data/AppStore.js'
import berryLoader from './../api/load-berries.js';

export default async function checkStore(to, from, next) {
    const berryId = parseInt(to.params.berryId);
    let berry = pokeStore.getters.getBerryById(berryId);
    if(!berry) {
        berry = await berryLoader(berryId);
        pokeStore.commit('ADD_BERRY', berry);
    }

    return next();
}