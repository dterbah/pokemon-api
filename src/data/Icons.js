const statsToColors = {
    speed: 'bg-warning',
    'special-defense': 'bg-info',
    defense: 'bg-info',
    'special-attack': 'bg-danger',
    attack: 'bg-danger',
    hp: 'bg-success'
};

function statToColor (statName) {
    return statsToColors[statName];
}

export default statToColor;