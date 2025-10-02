import {create} from "zustand";

const usePokedraft = create((set) => ({

    // State
    screen: "choose_pokemon",
    screenData: undefined,
    game: {
        pokemons: [],
    },


    // Actions
    pickPokemon: (pokemon) =>
        set((state) => {

            return {
                ...state,
                game: {
                    ...state.game,
                    pokemons: [...state.game.pokemons, pokemon],
                }
            }
    }),

    setScreen: (screen, pokemon) =>
        set((state) => {
            return {
                ...state,
                screen: screen,
                screenData: pokemon,
            }
        })
}));

export default usePokedraft;
