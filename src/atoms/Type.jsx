export default function Type (props) {

    const typeTranslation = {
        water: 'Eau',
        fire: 'Feu',
        grass: 'Plante',
        poison: 'Poison',
    };

    const typeColor = {
        water: '#2481ef',
        fire: '#e72324',
        grass: '#3da224',
        poison: '#923fcc',
    }

    return (
        <>
            <div className="rounded-md text-center text-white p-1 shadow-lg" style={{backgroundColor: typeColor[props.name]}}>{typeTranslation[props.name]}</div>
        </>
    )
}