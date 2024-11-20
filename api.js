const API_URL = "https://pokeapi.co/api/v2/pokemon/"

export async function fetchPokemon(pokemon) {
    const NEW_URL = API_URL.concat(pokemon)
    const res = await fetch(NEW_URL);
    let data = await res.json()

    return data
}