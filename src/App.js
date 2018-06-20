//NPM Modules
import React, { Component } from 'react';
import { stack as Menu } from 'react-burger-menu';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by'; //To sort arrays
//APIs
import * as FoursquareAPI from './FoursquareAPI';
//Componenets
import Map from './components/Map';
import MarkerFilter from './components/MarkerFilter';
//Styles
import './App.css';
import { MapStyles } from './MapStyles';
//icons
import cake from './icons/cake.svg';
import cafe from './icons/cafe.svg';
import hotel from './icons/hotel.svg';
import movie from './icons/movie.svg';
import restaurant from './icons/restaurant.svg';


class App extends Component {
  state = {
    menuOpen: true,
    infoError: false,
    photoError: false,
    query: '',
    locations: [
      {
        id: 0,
        name: 'Pathé City Cinema',
        infoShown: false,
        info: {
          id: '',
          category: '',
          address: '',
          postal: '',
        },
        position: { lat:  52.363420, lng: 4.883704 },
        icon: movie,
        photo: ''
      },
      {
        id: 1,
        name: 'The Bulldog Palace',
        infoShown: false,
        info:  {
          id: '',
          category: '',
          address: '',
          postal: '',
        },
        position: { lat: 52.364021, lng: 4.883311 },
        icon: cafe,
        photo: ''
      },
      {
        id: 2,
        name: 'Kwakman Bakery',
        infoShown: false,
        info:  {
          id: '',
          category: '',
          address: '',
          postal: '',
        },
        position: { lat: 52.364829,  lng: 4.884283 },
        icon: cake,
        photo: ''
      },
      {
        id: 3,
        name: 'Hampshire American Hotel',
        infoShown: false,
        info:  {
          id: '',
          category: '',
          address: '',
          postal: '',
        },
        position: { lat: 52.363886, lng: 4.881300 },
        icon: hotel,
        photo: ''
      },
      {
        id: 4,
        name: 'Tandoor Indian Restaurant',
        infoShown: false,
        info:  {
          id: '',
          category: '',
          address: '',
          postal: '',
        },
        position: { lat: 52.364974, lng: 4.883029 },
        icon: restaurant,
        photo: ''
      }
    ]
  }

  componentWillMount = async () => {
    //I'm using async/await syntax to ensure that the promise resovles
    const locationPromises = this.state.locations.map(async loc => {
      let info;
      let photo;

      await FoursquareAPI.getInfo(loc)
        .then(res => info = res);
      //Error Handling for info fetch
      if(typeof info.category === 'undefined') info = '';

      await FoursquareAPI.getPhoto(info.id)
        .then(res => photo = res)
      //Error Handling for photo fetch
      if(!photo) photo = '';
      return {
        ...loc,
        info,
        photo
      };
    })

    await Promise.all(locationPromises).then(locations => this.setState({ locations }));
    //Shows the Error notification if there's an error
    if(typeof this.state.locations[0].info === 'string' || this.state.locations[0].photo.length === 0) {
      await this.setState({ infoError:true });

      setTimeout(async () => {
        await this.setState({ infoError: false });
      }, 2000);
    }

    if (this.state.locations[0].photo.length === 0) {
      await this.setState({ photoError: true });

      setTimeout(async () => {
        await this.setState({ photoError: false });
      }, 2000);
    }


    FoursquareAPI.getPhoto(this.state.locations)
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
    const { locations, query, menuOpen } = this.state;
    let shownLocations;

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      shownLocations = locations.filter(location => match.test(location.name));
    } else {
      shownLocations = locations;
    }

    return (
      <div className='container'>
      {/* Nav Bar for a11y semantics */}
        <nav style={{height: '11%'}} className='nav'>
          <Menu 
            noOverlay 
            isOpen={menuOpen} 
            disableOverlayClick={true} 
            styles={ {
              ...MapStyles,
              bmBurgerButton: {
                ...MapStyles.bmBurgerButton,
                left: menuOpen ? '315.282px' : '24px'
              }
            } }
            style={{width:'25%'}}
            customCrossIcon={ false }
            onStateChange={() => this.setState({ menuOpen: !menuOpen})}
          >
            {menuOpen && (
              <li className='bm-header'>Yazan's Leidseplein Bangers</li>
            )}
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
          {!menuOpen && (
            <li className='bm-header nav-header'>Yazan's Leidseplein Bangers</li>
          )}
        </nav>
        <div className='content' style={{
          width: menuOpen ? '77%' : '100%',
          position: menuOpen ? 'relative' : '', 
          left: '23%',
        }}>
          <Map
            loadingElement={ <div style={{height: '100%'}}/> }
            containerElement={ <main style={{height: `89vh`}}/> }
            mapElement={ <div style={{height: '100%'}}/> }
            googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyDLX20hiAwtHZ60qd92XrTZE_Kz8TqRJ40&v=3'
            locations={ shownLocations }
            triggerInfo={this.triggerInfo}
          />
        </div>
       
        {/* API Error Handling Shown to User as per rubric */}
        {this.state.infoError && (
          <div className='notification'>
              <p>Error Loading Location Info From Foursquare</p>
              <p>Please Try Again</p>  
          </div>
        )}
        {this.state.photoError && (
          <div className='notification'>
              <p>Error Loading Location Photo From Foursquare</p>
              <p>Please Try Again</p>  
          </div>
        )}
      </div>
    );
  }
}

export default App;
