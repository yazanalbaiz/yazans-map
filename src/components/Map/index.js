/* global google */

import React, { Component } from 'react';
import { GoogleMap, Marker, InfoWindow, withScriptjs, withGoogleMap } from 'react-google-maps';
import { Tooltip } from 'react-tippy';

import './style.css'
import 'react-tippy/dist/tippy.css'


class Map extends Component {

    render() {
        const { locations, triggerInfo } = this.props;

      return (
        <GoogleMap
            defaultZoom={17}
            defaultCenter={{ lat: 52.364433, lng: 4.883026}}
        >
            { locations.map(location => (
                <Marker 
                    icon={{
                        url: location.icon,
                        color:  'rgb(210, 147, 147)'
                    }}
                    key={ location.id } 
                    position={ location.position }
                    onClick={() => triggerInfo(location) }
                    defaultAnimation= {google.maps.Animation.DROP}
                    animation={google.maps.Animation.DROP}
                >
                    {location.infoShown && (
                        <InfoWindow className='info-window'>
                            <div className='info-container'>
                                <h4 className='info-header'>
                                    {typeof location.info !== 'string' && (
                                        <Tooltip
                                            title={`${ location.name }'s Foursquare Page`}
                                            position='top'
                                            size='small'
                                            className='tooltip'
                                        >
                                            <a className='info-link' href={`https://foursquare.com/v/${location.info.id}`} target="_blank">{ location.name }</a>
                                        </Tooltip>
                                    )}
                                    {typeof location.info === 'string' && (
                                       <span>{ location.name }</span>
                                    )}
                                </h4>
                                {(typeof location.info !== 'string' && location.info.category.length) > 0 && (
                                    <div className='info-container'>
                                        <p className='info-outer'>
                                            Category: <span className='info-inner'>{location.info.category}</span>
                                        </p>
                                        <p className='info-outer'>
                                            Address: <span className='info-inner'>{location.info.address}</span>
                                        </p>
                                        <p className='info-outer'>
                                            Postal Code: <span className='info-inner'>{location.info.postal}</span>
                                        </p>
                                        <p className='info-outer'>
                                            City: <span className='info-inner'>{location.info.city}</span>
                                        </p>
                                        <p className='info-outer'>
                                            Country: <span className='info-inner'>{location.info.country}</span>
                                        </p>
                                    </div>
                                )}
                            </div>
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