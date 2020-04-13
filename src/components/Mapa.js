import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const styleMap=
[
    {
        "featureType": "all",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#ff0000"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#D6182C"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#b0e6fc"
            }
        ]
    }
]

export class MapContainer extends Component {

  render() {
    return (
      <Map google={this.props.google}
        zoom={12.3}
        styles={styleMap}
        initialCenter={{lat: 20.737783,lng: -103.583539}}>
      <Marker onClick={this.onMarkerClick}
          name={'lat: 20.715897,lng: -103.582482'} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyC2j5czUu4g3ht731Hw8hYVJhh0Xsr3Osw')
})(MapContainer)
