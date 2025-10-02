import usePokedraft from "../store/pokedraftStore.js";

export default function MainMenu() {

    const state = usePokedraft(state => state);

    return (
        <>
            <section className="flex justify-between h-screen items-center">
                Main Menu
            </section>
        </>
    )
}