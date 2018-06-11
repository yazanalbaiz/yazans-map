import React, { Component } from 'react';
import { GoogleMap, Marker, InfoWindow, withScriptjs, withGoogleMap } from 'react-google-maps';

class Map extends Component {

    render() {
        const { locations, triggerInfo } = this.props;

      return (
        <GoogleMap
            defaultZoom={17}
            defaultCenter={{ lat: 52.363960, lng: 4.882854 }}
        >
            { locations.map(location => (
                <Marker 
                    icon={{
                        url: location.icon
                    }}
                    key={ location.id } 
                    position={ location.position }
                    onClick={() => triggerInfo(location) }
                    defaultAnimation='bounce'
                >
                    {location.infoShown && (
                        <InfoWindow>
                            <h4>{ location.name }</h4>
                        </InfoWindow>
                    )}
                </Marker>
            ))}
        </GoogleMap>
      )
    }
}

export default withScriptjs(withGoogleMap((props) => 
    <Map 
        locations={props.locations}
        triggerInfo={props.triggerInfo}
    />));