import './App.css'
import Game from "./components/Game.jsx";

function App() {

  return (
    <>
      <header>
          <h1>Pokédraft</h1>
      </header>
        <main className="w-full">
            <Game></Game>
        </main>
    </>
  )
}

export default App
