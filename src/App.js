import React, { Component } from 'react';
import { stack as Menu } from 'react-burger-menu';
import Map from './components/Map';
import MarkerFilter from './components/MarkerFilter';

import './App.css';
import { MapStyles } from './MapStyles';

class App extends Component {
  state = {
    query: '',
    locations: [
      'Pathé City Cinema',
      'The Bulldog Palace',
      'Kwakman Bakery',
      'Tandoor Indian Restaurant',
      'Hampshire American Hotel'
    ]
  }

  handleInput = (e) => {
      this.setState({ query: e.target.value });
  }

  render() {
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
                query={ this.state.query }
                handleInput={ this.handleInput }
              />
            </li>
            
            <ul className='locations-list'>
              {this.state.locations.map(location => (
                <li tabindex='0' aria-role='button' className='list-location'>{ location }</li>
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
        />
      </div>
    );
  }
}

export default App;
