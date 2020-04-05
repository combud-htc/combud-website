import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios'

export class MapContainer extends Component {
    constructor() {
        super();

        this.getLatLong = this.getLatLong.bind(this);

    }

    async getLatLong(addr) {
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + addr + '&key=AIzaSyBPanGjU6aWNdTkv9vtIrGgHcKuuSDQQ0w');
        return [response.data.results[0].geometry.location.lat, response.data.results[0].geometry.location.lng]
    }

    render() {
        return (
            <div className="map">
                <div className="canvas">
                    {console.log(this.props.tasks)}
                    < Map initialCenter={{ lat: this.props.location[0], lng: this.props.location[1] }} google={this.props.google} zoom={14} disableDefaultUI={true} style={{ borderRadius: '10px' }}>
                        {this.props.tasks.map(el => (<Marker key={Math.random()} position={{ lat: el.lat, lng: el.lng }} />))}
                    </Map>
                </div>
            </div >
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyBPanGjU6aWNdTkv9vtIrGgHcKuuSDQQ0w")
})(MapContainer)