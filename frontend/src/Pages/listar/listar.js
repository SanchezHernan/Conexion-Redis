import { useHistory } from 'react-router'
import List from '../../Components/List/List'
import Select from '../../Components/Select/Select'
import './listar.css'

const { useState, useEffect } = require("react")


const Listar = () => {

    const [chList, setChList] = useState(null)
    const [epActul, setEpActual] = useState(null)
    const [episodios, setEpisodios] = useState(null)
    const [modoAdd, setModoAdd] = useState(false)
    const [modoDel, setModoDel] = useState(false)
    const [pjToAdd, setPjToAdd] = useState(null)
    const [pjToDel, setPjToDel] = useState(null)
    const [count, setCount] = useState(1)
    const history = useHistory()

    const handleChange = (value) => setEpActual(value)

    const addPersonaje = () => setModoAdd(true)

    const confirmAdd = () => {
        if (pjToAdd) {
            setModoAdd(false)
            fetch(`http://localhost:3000/cargar/${epActul}/${pjToAdd}`)
            setChList([...chList, pjToAdd])
            setPjToAdd(null)
        }
        else alert('Ingrese el nombre del personaje que desea agregar')
    }    
    
    const deletePersonaje = () => setModoDel(true)
    
    const changePjToAdd = (value) => setPjToAdd(value)

    const changePjToDel = (value) => setPjToDel(value)

    const confirmDel = async () => {
        if (pjToDel) {
            fetch(`http://localhost:3000/remove/${epActul}/${count}/${pjToDel}`)
            setModoDel(false)
            const resp = await fetch(`http://localhost:3000/listar/${epActul}`)
            const list = await resp.json()
            setChList(list)
            setPjToDel(null)
        }
        else alert('Ingrese el nombre del personaje')
    }

    const delUno = () => setCount(1)

    const delTodos = () => setCount(0)

    const cancelar = () => {
        setModoAdd(false)
        setModoDel(false)
    }

    const goToHome = () => history.push('/')


    useEffect(() => {
        const fetchData = async () => {
            const resp = await fetch(`http://localhost:3000/episodios`)
            const eps = await resp.json()
            setEpisodios(eps)
        }
        fetchData()
    },[])
    
    useEffect(() => {
        if (episodios)
            setEpActual(episodios[0])
    },[episodios])

    useEffect(() => {
        if(epActul){
            const fetchData = async () => {
                const resp = await fetch(`http://localhost:3000/listar/${epActul}`)
                const list = await resp.json()
                setChList(list)
            }
            fetchData()
        }
    }, [epActul])


    return(
        <div className='pj-container'>
            <div className='volver-btn'>
                <button className="btn btn-outline-secondary" type="button" onClick={goToHome}>Volver</button> 
            </div>
            { episodios &&
                <Select
                    atr={{
                        title: 'Seleccione el Capitulo',
                        episodios: episodios
                    }}
                    handleChange={handleChange}
                />
            }         
            <br/>
            {   chList &&
                <List 
                    title='Personajes'
                    chList={chList}
                />
            }
            <br/>
            {   !modoAdd && !modoDel ? 
                <div className='button-container'>
                    <button className='btn btn-outline-primary' type='button' onClick={addPersonaje}>Agregar Personaje</button>
                    <button className='btn btn-outline-primary' onClick={deletePersonaje}>Eliminar Personaje</button>
                </div>
                :
                <div>
                    {modoAdd ?
                        <div>
                            <input type="text" className="form-control" placeholder='Nombre del Personaje' onChange={(e) => changePjToAdd(e.target.value)}/>
                            <div className='button-container  mt-2'>
                                <button type="button" className="btn btn-outline-primary btn1" onClick={confirmAdd}>Confirmar</button>
                                <button type="button" className="btn btn-outline-danger btn1" onClick={cancelar}>Cancelar</button>
                            </div>
                        </div>
                    :
                        <div className='modoDel'>
                            <input type="text" className="form-control" placeholder='Personaje a Eliminar' onChange={(e) => changePjToDel(e.target.value)}/>
                            <div className="form-check mt-3">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" defaultChecked onChange={delUno}/>
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    Eliminar Uno
                                </label>
                                </div>
                                <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" onChange={delTodos}/>
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                    Eliminar Todos
                                </label>
                            </div>
                            <div className='button-container mt-2'>
                                <button className="btn btn-outline-primary btn1" type="button" onClick={confirmDel}>Confirmar</button>
                                <button type="button" className="btn btn-outline-danger btn1" onClick={cancelar}>Cancelar</button>
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default Listar;