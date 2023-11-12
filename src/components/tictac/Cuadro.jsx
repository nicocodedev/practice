

function Cuadro( {marca, update, index ,isSelected } ) {
  return <div className={` square ${isSelected ? 'is-selected' :'' }`} onClick={()=> update(index) }> {marca} </div>
}

export default Cuadro