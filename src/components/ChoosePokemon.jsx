import usePokedraft from "../store/pokedraftStore.js";
import Type from "../atoms/Type.jsx";
import {useQuery} from "@tanstack/react-query";
import {PokedraftApi} from "../service/PokedraftApi.js";

export default function ChoosePokemon() {

    const state = usePokedraft(state => state);

    const randomPokemonQuery = useQuery({
        queryKey: [],
        queryFn: () => PokedraftApi.getRandomPokemon(3)
    })

    const {isPending, error, data, isFetching} = randomPokemonQuery;

    const onPokemonPick = (pokemon) => {
        state.pickPokemon(pokemon);
        state.pickPokemon(pokemon);
        state.pickPokemon(pokemon);
        state.setScreen('set_stat', pokemon);
    }

    if (isPending) {
        return 'Loading';
    }

    if (error) {
        return `Erreur: ${error.message}`;
    }

    return (
        <>
            <section className="flex-col text-center">
                <section className="mb-4">
                    <h1>Choisir 1 pokémon</h1>
                </section>

                {isFetching ? 'Updating...' : ''}
                <section className="grid grid-cols-3 gap-4 h-full w-full">
                    {data.map((pokemon, index) => (
                        <div
                            key={index}
                            className="flex flex-col justify-around bg-white rounded-lg p-4 items-center gap-2"
                        >
                            <img
                                src={`sprites/${pokemon.id}.png`}
                                className="max-w-[100px]"
                                alt={pokemon.name}
                            />
                            <p className="pb-2 font-semibold text-black">{pokemon.name}</p>
                            <div className="flex gap-2">
                                {pokemon.types.map((type) => (
                                    <Type name={type} key={type} className="min-w-[1/2]">
                                        {type}
                                    </Type>
                                ))}
                            </div>
                            <button
                                className="w-full border-1 cursor-pointer border-gray-700 text-gray-800 font-bold py-2 px-4 rounded-full shadow hover:shadow-md"
                                onClick={() => onPokemonPick(pokemon)}
                            >
                                Choisir
                            </button>
                        </div>
                    ))}
                </section>
            </section>
        </>
    )
}