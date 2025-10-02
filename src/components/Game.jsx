import usePokedraft from "../store/pokedraftStore.js";
import ChoosePokemon from "./ChoosePokemon.jsx";
import MainMenu from "./MainMenu.jsx";
import SetStat from "./SetStat.jsx";

export default function Game() {

    const state = usePokedraft(state => state);
    const pokemons = state.game.pokemons;

    return (
        <>
            <section className="flex justify-between h-screen items-center">
                <section className="p-4 bg-white rounded-r text-black">
                    <div className="mb-2">Team</div>
                    <div className="flex flex-col gap-2">
                        {pokemons.map((pokemon, index) => (
                            <section key={index}>
                                <div className="flex gap-2 items-center">
                                    <img src={`icons/${pokemon.id}.png`}/>
                                    <p>{pokemon.name}</p>
                                </div>

                            </section>
                        ))}
                    </div>

                </section>
                <section className="flex justify-center items-center w-1/2">
                    {state.screen === "choose_pokemon" ? <ChoosePokemon /> : null}
                    {state.screen === "set_stat" ? <SetStat /> : null}
                    {state.screen === "main_menu" ? <MainMenu /> : null}
                </section>
                <section></section>
            </section>
        </>
    )
}