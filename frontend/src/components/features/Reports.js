import React, { Component } from 'react';
import ReactMapGL, { NavigationControl, Marker, FlyToInterpolator } from "react-map-gl";
import DATA_SERVICE from '../../services/data'
import LOCATION_SERVICE from '../../services/location'
// import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import axios from 'axios'
// import '../../index.scss';

class Reports extends Component {

  state = {
    viewport: {
      latitude: 0,
      longitude: 0,
      zoom: 14,
      // transitionDuration: 1000,
      // transitionInterpolator: new FlyToInterpolator()
    },

    isNow: false,
    userLocation: {},
    report: {
      
    },
  }

  componentDidMount() {
    this.findUser()
    console.log(this.context.getBearer)
  }

  onChangeMap = (viewport) => {
    this.setState({ viewport: { ...viewport, zoom: 14 } })
  }

  findUser = () => {
    console.log('finding')
    const { viewport } = this.state
    navigator.geolocation.getCurrentPosition(position => {
      const setLocation = {
        lat: position.coords.latitude,
        long: position.coords.longitude,
        crimeTypeId: this.props.match.params.id,
        userId: this.context.getBearer
      }
      const nViewport = {
        ...viewport,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
      this.setState({
        viewport: nViewport,
        report: setLocation
      })
    })
  }

  denounce = async () => {
    const placeName = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.state.report.long},${this.state.report.lat}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`)
    const {report} = this.state
    const updatedReport = {
      ...report,
      street: placeName.data.features[0].properties.address,
      suburb: placeName.data.features[0].context[0].text,
      zipCode: placeName.data.features[0].context[1].text,
      city: placeName.data.features[0].context[2].text,
      country: placeName.data.features[0].context[4].text,
    }
    this.setState({ report: updatedReport })
    
    const response = await LOCATION_SERVICE.report(this.state.report)
    this.props.history.push(`/view/reports/${this.context.getBearer}`)
  }

  handleInput = (e) => {
    const { report } = this.state
    const key = e.target.name
    if (key === 'rightNow' && e.target.checked) {
      this.setState({timeDatePickerStatus: true})
      const now = new Date();
      
      const day = ("0" + now.getDate()).slice(-2);
      const month = ("0" + (now.getMonth() + 1)).slice(-2);
      const today = now.getFullYear() + "-" + (month) + "-" + (day);

      const hours = ("0" + now.getHours()).slice(-2)
      const mins = ("0" + now.getMinutes()).slice(-2)
      const time = `${hours}:${mins}`

      const updatedReport = 
        {
          ...report,
          dateReport: today,
          timeReport: time,
          
        }
      this.setState({report: updatedReport})
    }
    else if (key === 'rightNow' && !e.target.checked) {
      this.setState({timeDatePickerStatus: false})
    }
    report[key] = e.target.type==='checkbox'? e.target.checked : e.target.value
    console.log(e.target.type)
    this.setState({ ...report, key: e.target.value })
    console.log(this.state.report)
  }

  render() {
    const { viewport, report } = this.state;
    return (
      <div>
        <p>Estás reportando: {this.state.crime}</p>
        <input type="date" name="dateReport" disabled={this.state.timeDatePickerStatus} onChange={this.handleInput} value={this.state.report.dateReport} />
        <input type="time" name="timeReport" disabled={this.state.timeDatePickerStatus} onChange={this.handleInput} value={this.state.report.timeReport} />
        <label ><input type="checkbox" name="rightNow" onChange={this.handleInput}/> En este momento</label>
        <p><strong>¿Qué ha sucedido?</strong>(Opcional)</p>
        <textarea name="description" onChange={this.handleInput}/>
        <br/>
        <label className="switch">
          <input type="checkbox" name="anonymous" onChange={this.handleInput} />
          <span className="slider round"></span>
        </label>

        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} 
          onViewportChange={this.onChangeMap} 
          onInteractionStateChange={(onclick)}
          width='80vw'
          height='60vh'
        >
        {/* <GeolocateControl */}
        {/* positionOptions={{ enableHighAccuracy: true }} */}
        {/* trackUserLocation={true} */}
        {/* /> */}
          <div style={{ position: 'absolute', right: 0 }}>
            <NavigationControl
              showZoom={true}
              showCompass={true}
            />
          </div>
          {Object.keys(report).length !== 0 &&
            < Marker
              draggable={true}
              onDragEnd={(event) => {
                console.log(event.lngLat)
                this.setState({
                  report: {
                    lat: event.lngLat[1],
                    long: event.lngLat[0]
                  }
                })
                console.log("stateLatLongUser", this.state.report)
              }}
              latitude={report.lat}
              longitude={report.long}
              offsetLeft={-20} offsetTop={-10}
            >
              <Icon
                name="map pin"
                size="big"
                color="orange"
              />
            </Marker>
          } 
        </ReactMapGL>
        
        <button onClick={this.cancel}>Cancelar</button><button onClick={this.denounce}>Denunciar</button>
      </div>
    );
  }
}


export default Reports;