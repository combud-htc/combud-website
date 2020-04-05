import React, { Component } from 'react'
import axios from "axios";
import DatePicker from 'react-date-picker';
axios.defaults.baseURL = "/api";
axios.defaults.headers.post["Content-Type"] = "application/json";

export default class NewPost extends Component {

    constructor() {
        super();

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

        this.setState({ [name]: value }, () => {
            switch (name) {
                case 'title':
                    formErrors.title = value.length < 3 || value.length > 20 ? 'Minimum of 3 characters and maximum of 20 characters' : "";
                    break;
                case 'date':
                    formErrors.date = value.length > 0 && ((new Date(value) - new Date()) / 3600000) < 0 || ((new Date(value) - new Date()) / 3600000) > 336 ? 'Please select dates in the future and a maximum of two week ahead' : "";
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
                "Title": title,
                "Description": details,
                "Address": address,
                "Latitude": lat,
                "Longitude": lng,
                "DueDate": date

            });

            const response = r.data;

            if (response["statusCode"] != 1) {
                console.error(response["errorMessage"]);
            } else {
                // ok
            }
        } catch (e) {

        }

    }


    render() {
        return (
            <div className="newpost animated fadeIn">
                <div className="columns">
                    <div className="column">
                        <div className="box">
                            <h1 className="title">New draft</h1>
                            <form>
                                <div className="field">
                                    <label htmlFor="title">Title</label>
                                    <p className="control has-icons-left has-icons-right">
                                        <input pattern=".{3,}" className="input" type="text" name="title" placeholder="Title" onChange={this.handleChange} />
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-tag"></i>
                                        </span>
                                    </p>
                                </div>
                                {this.state.formErrors.title ? <div className="notification is-warning is-light">
                                    {this.state.formErrors.title}
                                </div> : <></>}
                                <div className="field">
                                    <label htmlFor="date">Due Date</label>
                                    <p className="control has-icons-left has-icons-right">
                                        <input pattern=".{3,}" className="input" type="datetime-local" name="date" onChange={this.handleChange} />
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-clock"></i>
                                        </span>
                                    </p>
                                </div>
                                {this.state.formErrors.date ? <div className="notification is-warning is-light">
                                    {this.state.formErrors.date}
                                </div> : <></>}
                                <div className="field">
                                    <label htmlFor="details">Details</label>
                                    <p className="control has-icons-left has-icons-right">
                                        <textarea onChange={this.handleChange} className="textarea" name="details" placeholder="e.g. Hello, I fear going outside but I really need groceries.. I need this.. I will pay using.. Here is my phone number ..."></textarea>
                                    </p>
                                </div>
                                {this.state.formErrors.details ? <div className="notification is-warning is-light">
                                    {this.state.formErrors.details}
                                </div> : <></>}
                                <div className="field">
                                    <label htmlFor="details">Address</label>
                                    <p className="control has-icons-left has-icons-right">
                                        <input pattern=".{3,}" className="input" type="text" name="address" placeholder="Riksgatan 3 " onChange={this.handleChange} />
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-compass"></i>
                                        </span>
                                    </p>
                                    <p>Current location:<b> {this.props.user.town}, {this.props.user.country}</b>. Not correct? Change it in settings.</p>
                                </div>
                                {this.state.formErrors.address ? <div className="notification is-warning is-light">
                                    {this.state.formErrors.address}
                                </div> : <></>}
                                <div className="field">
                                    <input className="button is-success" value="Post" type="submit" onClick={this.handleSubmit} />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="column">
                        <img src="/order.svg" />
                    </div>
                </div >
            </div >
        )
    }
}
