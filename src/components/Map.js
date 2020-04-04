import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios'

export class MapContainer extends Component {
    constructor() {
        super();

        this.state = {
            lat: null,
            lng: null
        }

        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.getLatLong = this.getLatLong.bind(this);
        this.changeLocation = this.changeLocation.bind(this);

    }

    async changeLocation() {
        const data = await this.getLatLong(document.getElementById('xd').value);
        console.log(data);
        this.setState({
            lat: data[0],
            lng: data[1]
        })
    }

    async onMarkerClick() {
        console.log(await this.getLatLong('Frederiksberg Allegade'))
    }

    async getLatLong(addr) {
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + addr + '&key=AIzaSyBPanGjU6aWNdTkv9vtIrGgHcKuuSDQQ0w');
        return [response.data.results[0].geometry.location.lat, response.data.results[0].geometry.location.lng]
    }

    render() {
        return (
            <div className="map">
                <div className="canvas">
                    <Map initialCenter={{
                        lat: this.state.lat,
                        lng: this.state.lng
                    }} google={this.props.google} zoom={14}>

                        <Marker position={{ lat: this.state.lat, lng: this.state.lng }} onClick={this.onMarkerClick}
                            name={'Current location'} />
                        <Marker />

                        <InfoWindow onClose={this.onInfoWindowClose}>
                            <div>
                                <h1>xd</h1>
                            </div>
                        </InfoWindow>
                    </Map>
                </div>
                <input id="xd" />
                <button onClick={this.changeLocation}>click me</button>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyBPanGjU6aWNdTkv9vtIrGgHcKuuSDQQ0w")
})(MapContainer)