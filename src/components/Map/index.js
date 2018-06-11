import React, { Component } from 'react';
import { GoogleMap, Marker, InfoWindow, withScriptjs, withGoogleMap } from 'react-google-maps';

class Map extends Component {

    render() {
      return (
        <GoogleMap
            defaultZoom={17}
            defaultCenter={{ lat: 52.363960, lng: 4.882854 }}
        >
            {/* Pathe */}
            <Marker
                position={{ lat:  52.363420, lng: 4.883704 }}
            >
            <InfoWindow>
                <h3>Pathé City</h3>
            </InfoWindow>
            </Marker>
            {/* American */}
            <Marker
                position={{ lat: 52.364974, lng: 4.883029 }}
            />
            {/* Tandoor */}
            <Marker
                position={{ lat: 52.363886, lng: 4.881300 }}
            />
            {/* Bakery */}
            <Marker
                position={{ lat: 52.364829,  lng: 4.884283 }}
            />
            {/* Bulldog */}
            <Marker
                position={{ lat: 52.364021, lng: 4.883311 }}
            />
        </GoogleMap>
      )
    }
}

export default withScriptjs(withGoogleMap(() => <Map/>));