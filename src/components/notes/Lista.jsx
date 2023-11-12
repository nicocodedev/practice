import Form from './Form'
import Tarea from './Tarea'
import { useState, useEffect } from 'react'

function Lista() {
    const [misTareas, setMisTareas] = useState([]);

    const [recopilada, setRecopilada] = useState('')
        
    
    useEffect( ()=>{

        const data = localStorage.getItem('tareasLocales')
        if (data){
            setMisTareas(JSON.parse(data))
        }
        
    }, [] )

    useEffect( ()=>{
        localStorage.setItem('tareasLocales' , JSON.stringify(misTareas))
    } , [ misTareas ] )

    const recopila = (e)=>{
        const recopilacion = e.target.value
        setRecopilada(recopilacion);
    }

    const ponela = ()=>{


        if (recopilada.trim()){

            const objeto = { texto : recopilada }
            
            const arrai = [objeto, ...misTareas]
    
            setMisTareas(arrai)
            setRecopilada('')
        }

    }

    const eliminar = ( item )=>{
        const nueva = misTareas.filter(other=> other !== item)
       setMisTareas(nueva);
       return
    } 

    const handleKey = (e)=>{
        e.key=='Enter'? ponela() :''; 
    }

  return (
    <section className='list'> 
        <div className='list__note'> 
        <Form recopila={ recopila} ponela={ponela } valueInput={recopilada} handleKey={handleKey}/>
        <div className='division'>
        {   
            misTareas.map(( item , i)=> <Tarea key={i} testo={ item.texto} eliminar={()=>eliminar(item,i)} />
            
            )
        }
        </div>
        </div>
    </section>
  )
}

export default Lista