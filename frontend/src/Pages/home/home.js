import { useHistory } from "react-router"
import starwars from '../../Image/Star_Wars_Logo.svg'

const Home = () => {

  const history = useHistory()

  const goToEp = () => history.push('./cargar')

  const goToPj = () => history.push('./listar')


  return(
    <div>
      <img src={starwars} alt='...'/>
      <div className='button-container mt-2'>
        <button className="btn btn-outline-primary btn1" type="button" onClick={goToEp}>Ir a Episodios</button>
        <button className="btn btn-outline-primary btn1" type="button" onClick={goToPj}>Ir a Personajes</button>
      </div>
    </div>
  )
}

export default Home;