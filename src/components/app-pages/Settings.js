import React, { Component } from 'react'
import axios from "axios";
axios.defaults.baseURL = "/api";
axios.defaults.headers.post["Content-Type"] = "application/json";

export default class NewPost extends Component {

    constructor() {
        super();

        this.NewPost = this.NewPost.bind(this);
        this.handleChange = this.handleChange.bind(this)

        this.state = {
            title: "",
            date: "",
            details: "",
            address: "",
            lat: 0,
            lng: 0,
            formErrors: {
                title: "",
                date: "",
                details: "",
                address: ""
            }
        }
    }

    handleChange(e) {
        const { name, value } = e.target
        let formErrors = this.state.formErrors

        console.log(name, value)

        this.setState({[name]: value}, () => {
            switch (name) {
            case 'title':
                formErrors.title = value.length < 3 || value.length > 20 ? 'Minimum of 3 characters and maximum of 20 characters' : "";
                break;
            case 'date':
                formErrors.date = value.length > 0 && ((new Date(value) - new Date())/3600000) < 0 || ((new Date(value) - new Date())/3600000) > 336 ? 'Please select dates in the future and a maximum of two week ahead' : "";
                break;
            case 'details':
                formErrors.details = value.length > 0 && value.length < 30 || value.length > 1000 ? 'Minimum of 30 characters and maximum of 1000 characters' : "";
                break;
            case 'address':
                formErrors.address = value.length > 0 && value.length < 10 || value.length > 40 ? 'Minimum of 5 characters and maximum of 30' : "";
                break;
        }
        this.setState({ formErrors: formErrors })
        console.log(this.state)
    })
    }
    async getLatLong(addr) {
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + addr + '&key=AIzaSyBPanGjU6aWNdTkv9vtIrGgHcKuuSDQQ0w');
        return [response.data.results[0].geometry.location.lat, response.data.results[0].geometry.location.lng]
    }

    async handleSubmit(e) {
        e.preventDefault()
        const title = this.state.title
        const details = this.state.details
        const date = this.state.details
        const address = this.state.address;
        const [lat, lng] = await this.getLatLong(address);

        try {
            const r = await axios.post("/Post/NewPost", {
                "Title" : title,
                "Description" : details,
                "Address" : address,
                "Latitude" : lat,
                "Longitude" : lng,
                "DueDate" : date
                
            });

            const response = r.data;

            if(response["statusCode"] != 1) {
                console.error(response["errorMessage"]);
            } else {
                // ok
            }
        } catch(e) {

        }

    }

    async NewPost() {
        
    }

    render() {
        return (
            <div className="newpost animated fadeIn">
                <div className="columns">
                    <div className="column">
                        <div className="box">
                            <h1 className="title">Account settings</h1>
                            <form>
                                <div className="field">
                                    <label htmlFor="title">Country</label>
                                    <p className="control has-icons-left has-icons-right">
                                        <input pattern=".{3,}" className="input" type="text" name="title" placeholder="Sweden" value="Sweden" onChange={this.handleChange} />
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-globe"></i>
                                        </span>
                                    </p>
                                </div>
                                {this.state.formErrors.title ? <div className="notification is-warning is-light">
                                    {this.state.formErrors.title}
                                </div> : <></>}
                                <div className="field">
                                    <label htmlFor="title">Town</label>
                                    <p className="control has-icons-left has-icons-right">
                                        <input pattern=".{3,}" className="input" type="text" name="title" placeholder="Stockholm" value="Stockholm" onChange={this.handleChange} />
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-building"></i>
                                        </span>
                                    </p>
                                </div>
                                {this.state.formErrors.title ? <div className="notification is-warning is-light">
                                    {this.state.formErrors.title}
                                </div> : <></>}
                                <div className="field">
                                    <label htmlFor="title">Display radius</label>
                                    <p className="control has-icons-left has-icons-right">
                                        <input pattern=".{3,}" className="input" type="text" name="title" placeholder="3000" value="3000" onChange={this.handleChange} />
                                        <span className="icon is-small is-left">
                                            <i className="far fa-circle"></i>
                                        </span>
                                    </p>
                                </div>
                                {this.state.formErrors.title ? <div className="notification is-warning is-light">
                                    {this.state.formErrors.title}
                                </div> : <></>}
                                <div className="field">
                                    <input className="button is-success" value="Apply" type="submit" onSubmit={this.handleSubmit} />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="column">
                        <img src="/settings.svg"/>
                    </div>
                </div>
            </div>
        )
    }
}
