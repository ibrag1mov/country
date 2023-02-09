import { Link } from 'react-router-dom'
import './card.scss'

export const Card = ({obj, to}) =>{
  return(  <div className="card" id='1'>
        <img src={obj.flags.svg} className="card-img" width={'100%'} height='180px'/>
        <div className="card-body">
            <h4 className="card-title">{obj.name.common}</h4>
            <p className="card-text">Population: {obj.population}</p>
            <p className="card-text">Region: {obj.region}</p>
            <p className="card-text">Capital: {obj.capital?.[0]}</p>
            <Link key={obj.capital?.[0]} to={to} className='btn btn-primary' data-set-id='1'>More...</Link>
        </div>
    </div>
  )
}