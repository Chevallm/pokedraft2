export const PokedraftApi = {

    async getRandomPokemon(quantity = 1) {
        const response = await fetch('http://localhost:3000/dex/pokemons/random?quantity=' + quantity)
        return (await response).json();
    }
}