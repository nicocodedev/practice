
function Tarea({testo='testo', eliminar } ) {
  return (
  <div className='tarea'>
    <p > {testo} </p>
    <button onClick={eliminar} >Eliminar</button>
    </div>
  )
}

export default Tarea