import React, { Component } from 'react';
import { MyContext } from '../../context'
import { Link } from 'react-router-dom'
import DATA_SERVICE from '../../services/data'
import axios from 'axios'

class ReportsView extends Component {

  state = {
    reports: []
  }

  async componentDidMount() {
    const reports = await DATA_SERVICE.getReports()
    this.setState({reports: reports.data.reports})
  }
  render() {
    if(!this.state.reports) return <p>Loading...</p>
    const { reports } = this.state
    return (
      <div style={{width:'100vw', height:'100vh', display: 'flex', flexDirection:'row', flexWrap: 'wrap', justifyContent:'center' }}>
        <p>Hola {this.context.getUserFullname}</p>
        {reports.map(report => (
          <div key={report._id} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
            <img src={report.crimeType.crimeImg} width="50px" />
            <p>{report.crimeType.crimeName}</p>
            <p>Fecha: {report.date}</p>
            <p>Dirección del suceso: {`${report.address.street}, ${report.address.suburb}, ${report.address.zipCode}, ${report.address.city}, ${report.address.country}`}</p>
            <p>{report.isAnonymous ? `Reporte anónimo para la comunidad` : `Reporte público`}</p>
            <p>{report.reportDescription.length > 0 ? `Descripción de lo sucedido: ${report.reportDescription}` : ''}</p>
            <p>Valoración de la comunidad: {report.rating}</p>
            <p>Agradecimientos de la comunidad: {report.greetings}</p>
          </div>
        ))
        }
        
      </div>
    )
  }
}

ReportsView.contextType = MyContext

export default ReportsView