import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const style=
  [
    // {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
    //           {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
    //           {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
    //           {
    //             featureType: 'administrative.locality',
    //             elementType: 'labels.text.fill',
    //             stylers: [{color: '#d59563'}]
    //           },
    //           {
    //             featureType: 'poi',
    //             elementType: 'labels.text.fill',
    //             stylers: [{color: '#d59563'}]
    //           },
    //           {
    //             featureType: 'poi.park',
    //             elementType: 'geometry',
    //             stylers: [{color: '#263c3f'}]
    //           },
    //           {
    //             featureType: 'poi.park',
    //             elementType: 'labels.text.fill',
    //             stylers: [{color: '#6b9a76'}]
    //           },
    //           {
    //             featureType: 'road',
    //             elementType: 'geometry',
    //             stylers: [{color: '#38414e'}]
    //           },
    //           {
    //             featureType: 'road',
    //             elementType: 'geometry.stroke',
    //             stylers: [{color: '#212a37'}]
    //           },
    //           {
    //             featureType: 'road',
    //             elementType: 'labels.text.fill',
    //             stylers: [{color: '#9ca5b3'}]
    //           },
    //           {
    //             featureType: 'road.highway',
    //             elementType: 'geometry',
    //             stylers: [{color: '#746855'}]
    //           },
    //           {
    //             featureType: 'road.highway',
    //             elementType: 'geometry.stroke',
    //             stylers: [{color: '#1f2835'}]
    //           },
    //           {
    //             featureType: 'road.highway',
    //             elementType: 'labels.text.fill',
    //             stylers: [{color: '#f3d19c'}]
    //           },
    //           {
    //             featureType: 'transit',
    //             elementType: 'geometry',
    //             stylers: [{color: '#2f3948'}]
    //           },
    //           {
    //             featureType: 'transit.station',
    //             elementType: 'labels.text.fill',
    //             stylers: [{color: '#d59563'}]
    //           },
    //           {
    //             featureType: 'water',
    //             elementType: 'geometry',
    //             stylers: [{color: '#17263c'}]
    //           },
    //           {
    //             featureType: 'water',
    //             elementType: 'labels.text.fill',
    //             stylers: [{color: '#515c6d'}]
    //           },
    //           {
    //             featureType: 'water',
    //             elementType: 'labels.text.stroke',
    //             stylers: [{color: '#17263c'}]
    //           }
]

export class MapContainer extends Component {

  render() {
    return (
      <Map google={this.props.google}

      zoom={12.3}
      initialCenter={{lat: 20.737783,lng: -103.583539}}
    >

        <Marker onClick={this.onMarkerClick}
                name={'lat: 20.715897,lng: -103.582482'} />


      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyC2j5czUu4g3ht731Hw8hYVJhh0Xsr3Osw')
})(MapContainer)
