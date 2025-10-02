export default function Type (props) {

    const typeColor = {
        Water: '#2b99fe',
        Fire: '#ff662d',
        Grass: '#45c725',
        Poison: '#9f4fd6',
        Electric: '#ffdf00',
        Psychic: '#ff6985',
        Ground: '#b07d3b',
        Fighting: '#ffa803',
        Rock: '#c0bb8c',
        Ghost: '#724775',
        Dark: '#524a4b',
        Stellar: '#e9e9e9',
        Ice: '#44dfff',
        Steel: '#6fb7dd',
        Fairy: '#ffb5ff',
        Flying: '#9dd3ff',
        Bug: '#a8ae26',
        Normal: '#acacac',
        Dragon: '#5866e1'
    }

    return (
        <>
            <div className="rounded-md text-center text-black p-1 shadow-lg" style={{backgroundColor: typeColor[props.name]}}>{props.name}</div>
        </>
    )
}