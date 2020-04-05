import React, { Component } from 'react'
import Map from '../components/Map'
import NewPost from '../components/app-pages/NewPost'
import Feed from '../components/app-pages/Feed'
import Settings from '../components/app-pages/Settings'
import axios from 'axios'

export default class app extends Component {


    constructor() {
        super();

        this.getNearbyTasks = this.getNearbyTasks.bind(this);
        this.getUserData = this.getUserData.bind(this);
        this.updateUserSettings = this.updateUserSettings.bind(this)

        this.state = {
            page: Feed,
            user: {
                username: "",
                tasks: [

                ],
                country: "",
                town: "",
                location: {
                    lat: 0,
                    lng: 0
                },
                radius: 2
            },
            tasks: [],
            location: []//await getLatLong(`${this.user.country} ${this.user.town}`)
        }
    }

    async updateUserSettings({ radius, country, town }) {
        try {
            const r = await axios.post("/api/User/ChangeSettings", {
                "Radius": radius,
                "Country": country,
                "Town": town
            });

            const response = r.data;

            if (response["statusCode"] != 1) {
                // show error
                let errMsg = response["errorMessage"];

            } else {
                window.location.href = "/app"
            }
        } catch (e) {
            console.error(e);
        }
    }

    async getUserData() {
        try {
            const r = await axios.get("/api/User/GetUserData");
            const response = r.data;
            console.dir(response);
            if (response["statusCode"] != 1) {
                const err = response["errorMessage"];
                // show error
                console.error(err);
            } else {



                const username = response.username;
                const firstname = response.firstName;
                const lastname = response.lastName;
                const country = response.country;
                const town = response.town;
                const radius = response.radius;

                const posts = response["Posts"];

                const tasks = [];

                for (let i in posts) {
                    const post = posts[i];
                    tasks.push({
                        "title": post.title,
                        "description": post.description,
                        "firstName": post.firstName,
                        "lastName": post.fastName,
                        "userName": post.username,
                        "address": post.address,
                        "timePosted": post.timePosted,
                        "timeDue": post.timeDue,
                        "lat": post.latitude,
                        "lng": post.longitude
                    });
                }

                this.setState({
                    "user": {
                        username, country, town, radius,
                        "tasks": tasks
                    }
                });
            }
        } catch (e) {
            console.error(e);
        }
    }

    async getNearbyTasks() {
        try {
            const r = await axios.post("/api/Post/GetNearbyPosts", {
                "Latitiude": this.state.location[0],
                "Longitude": this.state.location[1]
            }, {
                "method": "POST"
            });

            const response = r.data;

            if (response["statusCode"] != 1) {
                let errMsg = response["errorMessage"];
                // show error to user
            } else {
                const posts = response["posts"];

                const tasks = [];

                for (let i in posts) {
                    const post = posts[i];
                    tasks.push({
                        "title": post.title,
                        "description": post.description,
                        "firstName": post.firstName,
                        "lastName": post.lastName,
                        "username": post.username,
                        "address": post.address,
                        "timePosted": post.timePosted,
                        "timeDue": post.timeDue,
                        "lat": post.latitude,
                        "lng": post.longitude
                    });
                }

                this.setState({ "tasks": tasks });
            }

        } catch (e) {
            console.error(e);
            // show error to user
        }

    }


    async getLatLong(addr) {
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + addr + '&key=AIzaSyBPanGjU6aWNdTkv9vtIrGgHcKuuSDQQ0w');

        if (response.data.results.length > 0) {
            return [response.data.results[0].geometry.location.lat, response.data.results[0].geometry.location.lng]
        } else {
            return "error"
        }
    }

    async componentDidMount() {
        await this.getUserData();
        await this.getNearbyTasks();
        await this.setState({ location: await this.getLatLong(`${this.state.user.country} ${this.state.user.town}`) });
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
                    <this.state.page updateUserSettings={this.updateUserSettings} updateMap={this.updateMap} user={this.state.user} location={this.state.location} tasks={this.state.tasks} />
                </div>
            </div>
        )
    }
}
