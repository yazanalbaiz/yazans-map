import React, { Component } from 'react';
import PropTypes from 'prop-types'

import './style.css';

class MarkerFilter extends Component {
    render() {
        return (
        <input 
            value={ this.props.query }
            placeholder='Fiter Locations'
            onChange={ this.props.handleInput }
        />
        )
    }
}

MarkerFilter.propTypes = {
    query: PropTypes.string.isRequired,
    handleInput: PropTypes.func.isRequired
}

export default MarkerFilter;
