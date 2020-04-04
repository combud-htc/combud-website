import React, { Component } from 'react'
import Map from '../../components/Map'

export default class geolocation extends Component {
    render() {
        return (
            <div className="setup geo">
                <div className="box">
                    <Map/>
                </div>
            </div>
        )
    }
}
