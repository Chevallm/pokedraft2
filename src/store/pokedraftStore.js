import {create} from "zustand";

const usePokedraft = create((set) => ({

    // State
    screen: "choose_pokemon",
    game: {
        pokemons: [],
    },

    pokedex: [],


    // Actions
    pickPokemon: ({pokemonId}) =>
        set((state) => {

            const pokemon = state.pokedex.find(pokemon => pokemon.id === pokemonId);

            return {
                ...state,
                game: {
                    ...state.game,
                    pokemons: [...state.game.pokemons, pokemon],
                }
            }
        }),
}));

export default usePokedraft;
