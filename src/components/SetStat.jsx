import usePokedraft from "../store/pokedraftStore.js";
import {useState} from "react";
import KiviatRadar from "./RadarGraph.jsx";

export default function SetStat() {

    const state = usePokedraft(state => state);

    const [rollValue, setRollValue] = useState(undefined);
    const [showValue, setShowValue] = useState(false);
    const [stats, setStats] = useState({
        hp: {value: 0, color: 'blue', label: 'HP', name: 'hp'},
        attack: {value: 0, color: 'red', label: 'Attack', name: 'attack'},
        defense: {value: 0, color: 'green', label: 'Defense', name: 'defense'},
        spAttack: {value: 0, color: 'purple', label: 'Special attack', name: 'spAttack'},
        spDefense: {value: 0, color: 'orange', label: 'Special defense', name: 'spDefense'},
        speed: {value: 0, color: 'yellow', label: 'Speed', name: 'speed'}
    });

    function roll() {
        const value = Math.floor(Math.random() * 31);
        setRollValue(value);
        setShowValue(true);
    }

    function setStat(pokemon, statName) {
        const updatedStats = {...stats};
        updatedStats[statName].value = updatedStats[statName].value + rollValue;
        setStats(updatedStats);
    }

    const pokemon = state.screenData;

    return (
        <>
            <section className="flex-col text-center p-4 w-full">
                <section className="mb-4">
                    <h1>Attribuer les statistiques de {pokemon.name}</h1>
                    <section className="bg-white text-gray-800 p-4 rounded">
                        <button
                            className="w-full bg-white border-1 cursor-pointer border-gray-700 text-gray-800 font-bold py-2 px-4 rounded-full shadow hover:shadow-md"
                            onClick={() => roll()}>
                            <img src={``}/>Roll<img src={``}/>
                        </button>

                        <p>{showValue && rollValue}</p>

                        <KiviatRadar stats={stats} select={(stat) => setStat(stat)}></KiviatRadar>
                    </section>

                </section>

            </section>
        </>
    )
}