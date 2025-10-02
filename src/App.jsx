import './App.css'
import Game from "./components/Game.jsx";

import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient();

function App() {

  return (
    <>
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            <main className="w-full">
                <Game></Game>
            </main>
        </QueryClientProvider>
    </>
  )
}

export default App
