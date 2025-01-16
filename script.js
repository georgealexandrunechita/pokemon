const form = document.getElementById('pokemon-form');
const input = document.getElementById('pokemon-name');
const pokemonInfoDiv = document.getElementById('pokemon-info');

async function fetchPokemonData(pokemonName) {
    try {
        // Usa comillas invertidas correctamente para interpolación
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
        if (!response.ok) {
            throw new Error('Pokémon no encontrado');
        }
        const data = await response.json();
        displayPokemonInfo(data);
    } catch (error) {
        // Usa comillas simples para HTML sin interpolación
        pokemonInfoDiv.innerHTML = `<p>${error.message}</p>`;
        pokemonInfoDiv.style.display = 'block';
    }
}

// Corrección del método displayPokemonInfo
function displayPokemonInfo(pokemon) {
    const { name, sprites, types, abilities } = pokemon;

    // Convierte los tipos y habilidades en listas legibles
    const typeList = types.map(type => type.type.name).join(', ');
    const abilityList = abilities.map(ability => ability.ability.name).join(', ');

    // Usa comillas invertidas para la interpolación
    pokemonInfoDiv.innerHTML = `
        <img src="${sprites.front_default}" alt="${name}">
        <h3>${name}</h3>
        <p>Tipo: ${typeList}</p>
        <p>Habilidades: ${abilityList}</p>
    `;
    pokemonInfoDiv.style.display = 'block';
}

// Escucha el evento de envío del formulario
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const pokemonName = input.value.trim();
    if (pokemonName) {
        fetchPokemonData(pokemonName);
    }
});
