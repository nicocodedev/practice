import { useState } from "react";
import confetti from "canvas-confetti";
import Cuadro from "./Cuadro";
import {WinnerModal} from "./Modal";

function Tictac() {
  const Turnos = { x: "⚡", o: "⚫" };
  const [turn, setTurn] = useState(
    () => {
      const turnFromStorage = window.localStorage.getItem('turn')
      return turnFromStorage ?? Turnos.x
    }
  );

  const [tablero, setTablero] = useState( ()=>{ 
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)}
  );

  const [winner, setWinner] = useState(null)

  const resetGame = ()=>{
    setTablero( Array(9).fill(null) )
    setTurn( Turnos.x )
    setWinner( null )
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  const WINNER_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  const complete = (newTablero)=>{
    return newTablero.every((other)=> other !== null)
   }

  const prueba = ( checkTablero )=>{
    for( const combo of WINNER_COMBOS ){
      const [a,b,c]= combo

        if(checkTablero[a] 
          && checkTablero[a] == checkTablero[b]
          && checkTablero[a] == checkTablero[c] ){

            return  checkTablero[a]

        }
    }
    return null
  }


  const update = (index)=>{
 
    const newTablero = [...tablero]

    if (newTablero[index] || winner) return

    newTablero[index] = turn
    setTablero( newTablero )

    const newTurn = turn === Turnos.x ? Turnos.o : Turnos.x
    setTurn(newTurn)

    window.localStorage.setItem('board', JSON.stringify(newTablero))
    window.localStorage.setItem('turn', newTurn)

     const checko = prueba(newTablero)
     
     if( checko ){
          confetti()
          setWinner( checko )
      
      }
      else if(complete(newTablero)) {
      setWinner(false)
  }  
    
     
  }


  return (
    <section className="tictac">
    <main className={ turn === Turnos.x ? 'board htmx' : 'board htmo'} >
       <button onClick={resetGame}>RESET</button>
      <section className="game">

        {
          tablero.map( (item , index)=> <Cuadro 
            key={ index } 
            marca={ item } 
            update={()=>update(index)}

            /> )
        }

      </section>
      <section className="turn">
        <Cuadro isSelected={turn==Turnos.x } marca={Turnos.x} />
        <Cuadro isSelected={turn==Turnos.o } marca={Turnos.o} />
      </section>
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
    </section>
  );
}

export default Tictac;

