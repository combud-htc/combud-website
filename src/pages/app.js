import React, { Component } from 'react'
import Map from '../components/Map'
import NewPost from '../components/app-pages/NewPost'
import Feed from '../components/app-pages/Feed'
import Settings from '../components/app-pages/Settings'
import axios from 'axios'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class app extends Component {
    constructor() {
        super();


        this.state = {
            page: Feed,
            user: {
                username: "",
                tasks: [

                ],
                country: "United States",
                town: "New York",
                location: {
                    lat: 0,
                    lng: 0
                },
                radius: 3000
            },
            tasks: [
                {
                    title: "Groceries",
                    description: "Lmao",
                    firstName: "Jacob",
                    lastName: "Wennebro",
                    userName: "oogabooga",
                    address: "",
                    timePosted: "",
                    timeDue: "2020-04-06",
                    lat: 0,
                    lng: 0
                },
                {
                    title: "Buy me sum milk",
                    description: "xd",
                    firstName: "Alex",
                    lastName: "Howe",
                    userName: "AlexTheHoe",
                    address: "",
                    timePosted: "",
                    timeDue: "2020-04-06",
                    lat: 1,
                    lng: 0
                },
                {
                    title: "Buy me sum milk",
                    description: "xd",
                    firstName: "Alex",
                    lastName: "Howe",
                    userName: "AlexTheHoe",
                    address: "",
                    timePosted: "",
                    timeDue: "2020-04-06",
                    lat: 1,
                    lng: 0
                },
                {
                    title: "Buy me sum milk",
                    description: "xd",
                    firstName: "Alex",
                    lastName: "Howe",
                    userName: "AlexTheHoe",
                    address: "",
                    timePosted: "",
                    timeDue: "2020-04-06",
                    lat: 1,
                    lng: 0
                },
                {
                    title: "Buy me sum milk",
                    description: "xd",
                    firstName: "Alex",
                    lastName: "Howe",
                    userName: "AlexTheHoe",
                    address: "",
                    timePosted: "",
                    timeDue: "2020-04-06",
                    lat: 1,
                    lng: 0
                }
            ],
            location: []//await getLatLong(`${this.user.country} ${this.user.town}`)
        }
    }

    async getLatLong(addr) {
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + addr + '&key=AIzaSyBPanGjU6aWNdTkv9vtIrGgHcKuuSDQQ0w');
        return [response.data.results[0].geometry.location.lat, response.data.results[0].geometry.location.lng]
    }

    async componentDidMount() {
        await this.setState({ location: await this.getLatLong(`${this.state.user.country} ${this.state.user.town}`) })
    }

    render() {
        return (
            <div className="app-layout">
                <div className="app-header">
                    <div className="centerer">
                        <button onClick={() => this.setState({ page: NewPost })} className="button is-link">New post</button>
                        <button onClick={() => this.setState({ page: Feed })} className="button is-link">Feed</button>
                        <div className="right-content">
                            <button onClick={() => this.setState({ page: Settings })} className="button is-primary is-light"><i className="fas fa-cog"></i></button>
                        </div>
                    </div>
                </div>
                <div className="page">
                    <this.state.page updateMap={this.updateMap} user={this.state.user} location={this.state.location} tasks={this.state.tasks} />
                </div>
            </div>
        )
    }
}
