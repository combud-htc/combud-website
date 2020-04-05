import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'
import '../styles/main.scss'
import Helmet from 'react-helmet'
import axios from "axios"

export default class Layout extends Component {
    constructor() {
        super();
        this.GetLoggedIn = this.GetLoggedIn.bind(this);

        this.state = {
            loggedIn: false,
            username: ""
        }

    }

    async GetLoggedIn() {
        try {
            const r = await axios.get("/api/Authentication/IsLoggedIn");
            const response = r.data;

            if (response["statusCode"] != 1) {
                console.error(response["errorMessage"]);
            } else {
                if (response["loggedIn"]) {
                    this.setState({ "username": response["Username"] });
                }

                this.setState({ "loggedIn": response["isLoggedIn"] });
            }
        } catch (e) {
            console.error(e);
        }
    }

    async componentDidMount() {
        await this.GetLoggedIn();
    }

    render() {
        return (
            <div className="app" id="luxy">
                <Helmet>
                    <title>ComBud &mdash; Helping the most vulnerable during the COVID-19 pandemic.</title>
                    <script src="https://kit.fontawesome.com/365aff2219.js" crossorigin="anonymous"></script>
                </Helmet>
                <Header loggedIn={this.state.loggedIn} />
                {this.props.children}
                <Footer />
            </div>
        )
    }
}

