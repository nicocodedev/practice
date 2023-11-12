import Lista from "./components/notes/Lista";
import "./App.css";
import './calc.css'
import './tictac.css'
import Calculadora from "./components/calculadora/Calculadora";
import Tictac from "./components/tictac/TicTac";

function App() {
  return (
    <>
      <Lista />
      <Calculadora />
      <Tictac />
    </>
  );
}

export default App;
