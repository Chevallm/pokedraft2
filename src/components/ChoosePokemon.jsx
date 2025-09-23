import usePokedraft from "../store/pokedraftStore.js";
import Type from "../atoms/Type.jsx";

export default function ChoosePokemon() {

    const state = usePokedraft(state => state);

    const pokemons = [
        {
            name: 'Carapuce',
            id: '007',
            sprite: 'https://play.pokemonshowdown.com/sprites/ani/squirtle.gif',
            types: ['water']
        },
        {
            name: 'Bulbizare',
            sprite: 'https://play.pokemonshowdown.com/sprites/ani/bulbasaur.gif',
            id: '001',
            types: ['grass', 'poison']
        },
        {
            name: 'Salamèche',
            sprite: 'https://play.pokemonshowdown.com/sprites/ani/charmander.gif',
            id: '004',
            types: ['fire']
        }
    ];

    const onPokemonPick = (pokemonId) => {
        state.pickPokemon({pokemonId: pokemonId});
    }

    return (
        <>
            <section className="grid grid-cols-3 gap-4 h-full w-full">
                {pokemons.map((pokemon) => (
                    <div
                        key={pokemon.id}
                        className="flex flex-col justify-around bg-white rounded-lg p-4 items-center gap-2"
                    >
                        <img
                            src={pokemon.sprite}
                            className="max-w-[100px]"
                            alt={pokemon.name}
                        />
                        <p className="pb-2 font-semibold text-black">{pokemon.name}</p>
                        <div className="flex gap-2">
                            {pokemon.types.map((type) => (
                                <Type name={type} className="min-w-[1/2]">
                                    {type}
                                </Type>
                            ))}
                        </div>
                        <button
                            className="w-full border-1 border-stone-800 text-black font-bold py-2 px-4 rounded-full shadow"
                            onClick={() => onPokemonPick(pokemon.id)}
                        >
                            Choisir
                        </button>
                    </div>
                ))}
            </section>

        </>
    )
}