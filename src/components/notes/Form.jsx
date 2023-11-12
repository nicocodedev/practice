
function Form({ recopila , ponela, valueInput, handleKey }) {

  return (
    <>
        <h4>Lista de Tareas</h4>
        <div className='first__form'>

        <input className='first__form__inpt' type="text" placeholder='Esciribe una nota...' onChange={ recopila } value={valueInput} onKeyDown={handleKey} autoFocus />
        <button className='first__form__btn' onClick={ponela} >Add</button>

        </div>
    </>
  )
}

export default Form