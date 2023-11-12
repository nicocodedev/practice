import { useState } from "react";

const Cuadro = ({ contenido, handleClick }) => <div className="cuadro" onClick={handleClick}> {contenido} </div>;

function Calculadora() {

  const Numeros = [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', "."];
  const Operadores = [" + ", " - ", " * ", " / "];
  const OtrosOp= [ "AC", "(", ")", "<" ]

  const [screen, setScreen] = useState('')
  const [dato, setDato] = useState()
  const [errores, setErrores] = useState(false)

  const handleClick = (item)=>{
    const newScreen = screen + item
    setScreen(newScreen)
    setDato(newScreen)
    setErrores(false)
  }

  const result = ()=>{
    try {
      const newResult = eval(dato)
      setScreen(newResult)
    } catch (error) {
      setErrores(true)
      console.log((error));
    }
  }

  const deleted = ()=>{
    try {
      let borrar = dato.slice(0 , -1 )
      setScreen(borrar)
      setDato(borrar)
      setErrores(false)
    } catch (error) {
      return
    }
  }

  const deleteAll = ()=>{
    setScreen('')
    setDato('')
    setErrores(false)
  }

  return (<>
    <main className="main">
      <textarea className={`screen ${errores? 'error' : ''} `} disabled value={screen} placeholder="00" />
        <section className="more">
        <Cuadro contenido={OtrosOp[0]} handleClick={deleteAll}  />
        <Cuadro contenido={OtrosOp[1]} handleClick={()=>handleClick('(')} />
        <Cuadro contenido={OtrosOp[2]} handleClick={()=>handleClick(')')} />
        <Cuadro contenido={OtrosOp[3]} handleClick={deleted} /> 
        </section>
      <div className="boardcalc">
        <section className="num">
          {
            Numeros.map( (item, index)=> <Cuadro key={index} contenido={item} handleClick={()=>handleClick(item)} /> )
            }
          <Cuadro contenido={' = '} handleClick={result} />
        </section>
        <section className="op">
          {
            Operadores.map( (item, index)=> <Cuadro key={index} contenido={item} handleClick={()=>handleClick(item)} /> )
            }
          </section>
      </div>
    </main>
    </>
  );
}

export default Calculadora;
