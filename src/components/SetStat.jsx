import usePokedraft from "../store/pokedraftStore.js";
import {useState} from "react";
import KiviatRadar from "./RadarGraph.jsx";
import RollNumber from "../atoms/RollNumber.jsx";

export default function SetStat() {

    const state = usePokedraft(state => state);
    const pokemon = state.screenData;

    const [rollValue, setRollValue] = useState(undefined);
    const [showValue, setShowValue] = useState(false);
    const [stats, setStats] = useState({
        hp: {value: pokemon.baseStats.hp, color: 'blue', label: 'HP', name: 'hp'},
        atk: {value: pokemon.baseStats.atk, color: 'red', label: 'Attack', name: 'attack'},
        def: {value: pokemon.baseStats.def, color: 'green', label: 'Defense', name: 'defense'},
        spa: {value: pokemon.baseStats.spa, color: 'purple', label: 'Special attack', name: 'spAttack'},
        spd: {value: pokemon.baseStats.spd, color: 'orange', label: 'Special defense', name: 'spDefense'},
        spe: {value: pokemon.baseStats.spe, color: 'yellow', label: 'Speed', name: 'speed'}
    });
    const [step, setStep] = useState('roll');

    function roll() {
        const value = Math.floor(Math.random() * 31);
        setRollValue(value);
        setShowValue(true);
        setStep('set');
    }

    function setStat(pokemon, statName) {
        const updatedStats = {...stats};
        updatedStats[statName].value = updatedStats[statName].value + rollValue;
        setStats(updatedStats);
    }

    return (
        <>
            <section className="flex-col text-center p-4 w-full">
                <section className="mb-4">
                    <h1>Attribuer les statistiques de {pokemon.name}</h1>
                    <section className="bg-white text-gray-800 p-4 rounded flex flex-col items-center">

                        <img src={`sprites/${pokemon.id}.png`} width="96"/>

                        <p>En cliquant sur le bouton vous obtiendrez une valeur entre 0 et 31 qui corresponds aux <abbr
                            title="Les IV, ou individual values, sont des valeurs numériques définies pour chaque statistique d'un Pokémon donné.">
                            IV</abbr>
                        </p>
                        <button
                            className={`w-full flex items-center justify-between ${step === 'set' ? 'bg-gray-300 cursor-not-allowed' : 'bg-white cursor-pointer hover:shadow-md'} border-1 border-gray-700 text-gray-800 font-bold py-2 px-4 rounded-full shadow`}
                            disabled={step === 'set'}
                            onClick={() => roll()}>
                            <img src={`icons/clefairy.png`} width="36"/> Roll <img src={`icons/clefairy.png`}
                                                                                   width="36"/>
                        </button>

                        <p>
                            {showValue && (<>
                                <RollNumber value={rollValue} duration={1000}></RollNumber>
                            </>)}
                        </p>

                        <KiviatRadar stats={stats} select={(stat) => setStat(stat)}></KiviatRadar>
                    </section>

                </section>

            </section>
        </>
    )
}