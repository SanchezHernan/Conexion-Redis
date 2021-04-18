import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import List from '../../Components/List/List'

const Cargar = () => {

    const [episodios, setEpisodios] = useState(null)
    const [modoAdd, setModoAdd] = useState(false)
    const [modoDel, setModoDel] = useState(false)
    const [ep, setEp] = useState(null)
    const [pj, setPj] = useState(null)
    const [nuevo, setNuevo] = useState(false)
    const [epToDel, setEpToDel] = useState(null)
    const history = useHistory()
    
    const addEp = () => setModoAdd(true)

    const confirmAdd = (e) => {
        e.preventDefault()
        setModoAdd(false)
        fetch(`http://localhost:3000/cargar/${ep}/${pj}`)
        setEp(null)
        setPj(null)
        setNuevo(!nuevo)
    }

    const changeEpisodio = (value) => setEp(value)

    const changePersonaje = (value) => setPj(value)

    const deleteEp = () => setModoDel(true)

    const changeEpToDel = (value) => setEpToDel(value)

    const confirmDel = () => {
        setModoDel(false)
        fetch(`http://localhost:3000/delete/${epToDel}`)
        setEpToDel(null)
        setNuevo(!nuevo)
    }

    const goToHome = () => history.push('/')


    useEffect(() => {
        const fetchData = async () => {
            const resp = await fetch(`http://localhost:3000/episodios`)
            const eps = await resp.json()
            console.log(eps);
            setEpisodios(eps)
        }
        fetchData()
    }, [nuevo])


    return(
        <div className='pj-container'>
            <div className='volver-btn'>
                <button className="btn btn-outline-secondary" type="button" onClick={goToHome}>Volver</button> 
            </div>
            <List
                title='Episodios'
                chList={episodios}
            />
            <br/>
            {   !modoAdd && !modoDel ?
                <div>
                    <button className='btn btn-outline-primary' onClick={addEp}>Agregar Nuevo</button>
                    <button className='btn btn-outline-primary' onClick={deleteEp}>Eliminar Episodio</button>
                </div>
                :
                <div>
                    {modoAdd ?  
                        <div>
                            <input type="text" className="form-control" placeholder='Nombre del Episodio' onChange={(e) => changeEpisodio(e.target.value)}/>
                            <input type="text" className="form-control" placeholder='Personaje del episodio' onChange={(e) => changePersonaje(e.target.value)}/>
                            <button type="button" className="btn btn-primary" onClick={confirmAdd}>Confirmar</button>
                        </div>
                    :
                        <div>
                            <input type="text" className="form-control" placeholder='Episodio que quiere borrar' onChange={(e) => changeEpToDel(e.target.value)}/>
                            <button type="button" className="btn btn-primary" onClick={confirmDel}>Confirmar</button>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default Cargar