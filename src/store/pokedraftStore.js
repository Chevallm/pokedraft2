import {create} from "zustand";

const usePokedraft = create((set) => ({

    // State
    screen: "choose_pokemon",
    game: {
        pokemons: [],
    },


    // Actions
    pickPokemon: ({pokemonId}) =>
        set((state) => ({
            game: {
                ...state.game,
                pokemons: [...state.game.pokemons, pokemonId],
            },
        })),
}));

export default usePokedraft;
