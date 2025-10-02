export const PokedraftApi = {

    async getRandomPokemon(params) {
        const urlSearchParams = new URLSearchParams(params);
        const response = await fetch(`http://localhost:3050/dex/pokemons/random?${urlSearchParams.toString()}`);
        return (await response).json();
    }
}