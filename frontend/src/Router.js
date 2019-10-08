import React, { Component } from "react";
import ReactMapGL, { NavigationControl, Marker, FlyToInterpolator } from "react-map-gl";
import { Icon } from 'semantic-ui-react'

export default class Router extends Component {
  state = {
    viewport: {
      latitude: 0,
      longitude: 0,
      zoom: 14,
      // transitionDuration: 1000,
      // transitionInterpolator: new FlyToInterpolator()
    },
    userLocation: {}
  }

  componentDidMount() {
    this.findUser()
  }

  onChangeMap = (viewport) => {
    console.log(viewport)
    this.setState({ viewport: { ...viewport, zoom: 14 } })
  }

  findUser = () => {
    console.log('finding')

    const { viewport, userLocation } = this.state
    navigator.geolocation.getCurrentPosition(position => {
      const setLocation = {
        lat: position.coords.latitude,
        long: position.coords.longitude
      }
      const nViewport = {
        ...viewport,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
      this.setState({
        viewport: nViewport,
        userLocation: setLocation
      })
    })
  }

  render() {
    const { viewport, userLocation } = this.state;
    return (
      <div styles={{ width: '100vw', height: '100vh' }}>
        <button onClick={this.findUser}>Encuéntrame</button>
        <ReactMapGL {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          onViewportChange={this.onChangeMap}
          onInteractionStateChange={(onclick)}
          width='80vw'
          height='60vh'
        >
          {/* <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        /> */}
          <div style={{ position: 'absolute', right: 0 }}>
            <NavigationControl
              showZoom={true}
              showCompass={true}
            />
          </div>
          {Object.keys(userLocation).length !== 0 &&
            < Marker
              draggable={true}
              onDragEnd={(event) => {
                console.log(event.lngLat)
                this.setState({
                  userLocation: {
                    lat: event.lngLat[1],
                    long: event.lngLat[0]
                  }
                })
                console.log("stateLatLongUser", this.state.userLocation)
              }}
              latitude={userLocation.lat}
              longitude={userLocation.long}
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
      </div >
    );
  }
}



// import React, { useState, Component } from 'react';
// import MapGL, { GeolocateControl, Marker } from 'react-map-gl'
// import { render } from 'react-dom'
// // import './Router.css';

// const geolocateStyle = {
//   position: 'absolute',
//   top: 0,
//   left: 0,
//   margin: 10
// };

// export default class Router extends Component {
//   state = {
//     viewport: {
//       latitude: 37.8,
//       longitude: 96,
//       zoom: 3,
//       bearing: 0,
//       pitch: 0
//     }
//   };

//   _onViewportChange = viewport => this.setState({ viewport });

//   render() {
//     const { viewport } = this.state;

//     return (
//       <MapGL
//         {...viewport}
//         width="100%"
//         height="100%"
//         mapStyle="mapbox://styles/mapbox/dark-v9"
//         onViewportChange={this._onViewportChange}
//         mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
//       >
//         <GeolocateControl
//           style={geolocateStyle}
//           positionOptions={{ enableHighAccuracy: true }}
//           trackUserLocation={true}
//         />
//       </MapGL>
//     );
//   }
// }

// export function renderToDom(container) {
//   render(<Router />, container);
// }

// function Router() {
//   const [viewport, setViewport] = useState({
//     latitude: 19.400210,
//     longitude: -99.173395,
//     zoom: 10
//   })

//   console.log('zoom:', viewport.zoom, viewport.latitude, viewport.longitude)
//   return (
//     <div className="Map">
//       <ReactMapGL
//         {...viewport}
//         width='100vw'
//         height='100vh'
//         mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
//         onViewportChange={viewport => {
//           setViewport(viewport)
//         }}
//       >
//         <GeolocateControl
//           positionOptions={{ enableHighAccuracy: false }}
//           trackUserLocation={true}

//         />
//         MARKERS...
//       </ReactMapGL>
//     </div >
//   );
// }

// export default Router;
