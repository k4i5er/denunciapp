import React, { Component } from 'react';
import { MyContext } from '../../context'
import { Link } from 'react-router-dom'
import DATA_SERVICE from '../../services/data'
import axios from 'axios'
import { wrap } from 'module';

class CrimeView extends Component {

  state = {
    crimes: []
  }

  async componentDidMount() {
    const crimes = await DATA_SERVICE.getCrimes()
    this.setState({crimes: crimes.data.crime})
  }

  render() {
    if(!this.state.crimes) return <p>Loading...</p>
    const { crimes } = this.state
    return (
      <div style={{width:'100vw', height:'100vh', display: 'flex', flexDirection:'row', flexWrap: 'wrap', justifyContent:'center' }}>
        {crimes.map(crime => (
          <Link to={`/report/${crime._id}`} key={crime._id}><div  style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}><img src={crime.crimeImg} /><p>{crime.crimeName}</p></div></Link>
        ))
        }
        
      </div>
    )
  }
}

CrimeView.contextType = MyContext

export default CrimeView