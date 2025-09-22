import usePokedraft from "../store/pokedraftStore.js";

export default function ChoosePokemon() {

    const state = usePokedraft(state => state);

    const pokemons = [
        {
            name: 'Carapuce',
            id: '004'
        },
        {
            name: 'Bulbizare',
            id: '001'
        },
        {
            name: 'Salamèche',
            id: '007'
        }
    ];

    const onPokemonPick = (pokemonId) => {
        state.pickPokemon({pokemonId: pokemonId});
    }

    return (
        <>
            <section className="flex gap-4">
                {pokemons.map((pokemon) =>
                    <div className="flex flex-col gap-4" key={pokemon.id}>
                        <div className="card bg-white text-black rounded-lg p-4">
                            <p>{pokemon.name}</p>
                        </div>

                        <button className="w-full" onClick={() => onPokemonPick(pokemon.id)}>Choisir</button>
                    </div>
                )}
            </section>
        </>
    )
}