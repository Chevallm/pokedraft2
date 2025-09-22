import usePokedraft from "../store/pokedraftStore.js";
import ChoosePokemon from "./ChoosePokemon.jsx";

export default function Game() {

    const screen = usePokedraft(state => {
        return state.screen;
    });

    const pokemons = usePokedraft(state => state.game.pokemons);

    return (
        <>
            <section className="flex justify-between">
                <section>
                    {pokemons.map((pokemon) => (
                        <>
                            <p key={pokemon}>{pokemon}</p>
                        </>
                    ))}
                </section>
                <section>
                    {screen === "choose_pokemon" ? <ChoosePokemon /> : null}
                </section>
            </section>
        </>
    )
}