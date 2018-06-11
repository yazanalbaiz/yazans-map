import React, { Component } from 'react';
import { stack as Menu } from 'react-burger-menu';
import escapeRegExp from 'escape-string-regexp';
//To sort the locations after revealing info
import sortBy from 'sort-by';

import Map from './components/Map';
import MarkerFilter from './components/MarkerFilter';

import './App.css';
import { MapStyles } from './MapStyles';

class App extends Component {
  state = {
    query: '',
    locations: [
      {
        id: 0,
        name: 'Pathé City Cinema',
        infoShown: true,
        info: null,
        position: { lat:  52.363420, lng: 4.883704 }
      },
      {
        id: 1,
        name: 'The Bulldog Palace',
        infoShown: true,
        info: null,
        position: { lat: 52.364021, lng: 4.883311 }
      },
      {
        id: 2,
        name: 'Kwakman Bakery',
        infoShown: true,
        info: null,
        position: { lat: 52.364829,  lng: 4.884283 }
      },
      {
        id: 3,
        name: 'Tandoor Indian Restaurant',
        infoShown: true,
        info: null,
        position: { lat: 52.363886, lng: 4.881300 }
      },
      {
        id: 4,
        name: 'Hampshire American Hotel',
        infoShown: true,
        info: null,
        position: { lat: 52.364974, lng: 4.883029 }
      }
    ]
  }

  handleInput = (e) => {
      this.setState({ query: e.target.value });
  }

  triggerInfo = (location) => {
    const cutLocations = this.state.locations.filter(loc => loc.id !== location.id);

    const locations = cutLocations.concat({
      ...location,
      infoShown: !location.infoShown
    });
    
    locations.sort(sortBy('id'));

    this.setState({ locations });
  }

  triggerSoloInfo = (location) => {
    const newLocation = {
      ...location,
      infoShown: true
    };

    const cutLocation = this.state.locations.filter(loc => (
      loc.id !== location.id
    )).map(loc => (
      {
        ...loc,
        infoShown: false
      }
    ));

    const locations = cutLocation.concat(newLocation);

    locations.sort(sortBy('id'));

    this.setState({ locations });
  }

  render() {
    const { locations, query } = this.state;

    let shownLocations;

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      shownLocations = locations.filter(location => match.test(location.name));
    } else {
      shownLocations = locations;
    }

    return (
      <div className='container'>
        <div className='box-1'>
          <Menu 
            noOverlay 
            isOpen={true} 
            disableOverlayClick={true} 
            styles={ MapStyles }
            customCrossIcon={ false }
          >
            <li className='bm-header'>Yazan's Leidseplein Bangers</li>
            <li className='bm-input'>
              <MarkerFilter
                query={ query }
                handleInput={ this.handleInput }
              />
            </li>
            
            <ul className='locations-list'>
              {shownLocations.map(location => (
                <li 
                  tabIndex='0' 
                  //Using ARIA role for A11y
                  role='button' 
                  className='list-location'
                  key={ location.id }
                  onClick={() => this.triggerSoloInfo(location)}
                >
                  { location.name }
                </li>
              ))}
            </ul>
          </Menu>
        </div>
        
        <Map
          loadingElement={ <div style={{height: '100%'}}/> }
          containerElement={ <main style={{height: '615px', width: '77%'}}/> }
          mapElement={ <div style={{height: '100%'}}/> }
          googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyDLX20hiAwtHZ60qd92XrTZE_Kz8TqRJ40&v=3'
          className='box-2'
          locations={ shownLocations }
          triggerInfo={this.triggerInfo}
        />
      </div>
    );
  }
}

export default App;
