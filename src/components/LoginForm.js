import React, { Component } from 'react'
import axios from "axios";
axios.defaults.baseURL = "/api";
axios.defaults.headers.post["Content-Type"] = "application/json";

export default class LoginForm extends Component {
    constructor() {
        super();


        this.Toggle = this.Toggle.bind(this);
        this.Signin = this.Signin.bind(this);
        this.Register = this.Register.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.formValid = this.formValid.bind(this);

        this.state = {
            currentForm: this.Signin,
            username: "",
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            country: "",
            town: "",
            loginError: false,
            formErrors: {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                conPassword: "",
                username: "",
                country: "",
                town: ""
            }
        }

    }
    Toggle() {
        if (this.state.currentForm === this.Signin) {
            this.setState({
                currentForm: this.Register
            });
        }
        else if(this.state.currentForm === this.Register) {
            this.setState({
                currentForm: this.Signin
            });
        }
    }

    Signin() {
        return (
            <div className="box animated fadeInUp">
                <h1 className="title is-3">Sign-in</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="field">
                        <p className="control has-icons-left has-icons-right">
                            <input onChange={this.handleChange} className="input" name="email" type="email" placeholder="Email" />
                            <span className="icon is-small is-left">
                                <i className="fas fa-envelope"></i>
                            </span>
                        </p>
                    </div>
                    <div className="field">
                        <p className="control has-icons-left">
                            <input onChange={this.handleChange} className="input" name="password" type="password" placeholder="Password" />
                            <span className="icon is-small is-left">
                                <i className="fas fa-lock"></i>
                            </span>
                        </p>
                    </div>
                    {this.state.loginError ? <div className="notification is-warning is-light">Email or Password invalid</div> : <></>}
                    <div className="field">
                        <input className="button is-primary" value="Sign-in" type="submit" />
                    </div>
                </form>
                <p>Don't have an account? <a onClick={this.Toggle}>Create one for free!</a></p>
            </div>
        )
    }

    formValid() {
        let valid = true;

        Object.values(this.state.formErrors).forEach(val => {
            val.length > 0 && (valid = false)
        })

        return valid
    }

    handleChange(e) {
        const { name, value } = e.target
        let formErrors = this.state.formErrors

        this.setState({[name]: value}, () => {
            switch (name) {
            case 'firstName':
                formErrors.firstName = value.length > 0 && value.length < 2 || value.length > 30 ? 'Minimum of 2 characters and maximum of 30 characters' : "";
                break;
            case 'lastName':
                formErrors.lastName = value.length > 0 && value.length < 2 || value.length > 30 ? 'Minimum of 2 characters and maximum of 30 characters' : "";
                break;
            case 'username':
                formErrors.username = value.length > 0 && value.length < 3 || value.length > 20 ? 'Minimum of 3 characters and maximum of 20 characters' : "";
                break;
            case 'email':
                formErrors.email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) && value.length > 0 ? '' : "Invalid email";
                break;
            case 'password':
                formErrors.password = value.length > 0 && value.length < 6 ? 'Minimum of 6 characters' : "";
                break;
            case 'conPassword':
                formErrors.conPassword = value.length > 0 && this.state.conPassword == this.state.password ? '' : 'Needs to be the same as password';
                break;
            case 'town':
                formErrors.town = value.length > 0 && value.length > 30 ? 'Maximum of 30 characters' : '';
                break;
            case 'country':
                formErrors.country = value.length > 0 && value.length < 4 || value.length > 30 ? 'Minimum of 4 characters and maximum of 30 characters' : '';
                break;
        }
        this.setState({ formErrors: formErrors })})
    }

    async handleSubmit(e) {
        e.preventDefault()
        if (this.state.currentForm == this.Signin) {
            const email = this.state.email;
            const password = this.state.password;

            try {
                const r = await axios.post("/Authentication/Login", {
                    "Email": email,
                    "Password": password
                });
                const response = r.data;
                if(response["statusCode"] != 1) {
                    this.setState({loginError: true})
                } else {
                    this.setState({loginError: false})
                }

            } catch (e) {
                console.error(e);
                // alert user to error!
            }

        } else if (this.state.currentForm == this.Register) {
                const email = this.state.email;
                const password = this.state.password;
                const username = this.state.username;
                const firstName = this.state.firstName;
                const lastName = this.state.lastName;
                const country = this.state.country;
                const town = this.state.town;
    
                try {
                    const r = await axios.post("/Authentication/Register", {
                        "Email": email,
                        "Password": password,
                        "Username": username,
                        "FirstName": firstName,
                        "LastName": lastName
                    });
    
                    const response = r.data;
    
                    if(response["statusCode"] != 1) {
                        alert(response["errorMessage"]);
                    } else {
                        console.log("EPIC!");
                        //ask the user to check their inbocks!
                    }
                } catch (e) {
                    console.error(e);
                    // alert user to error!
                }
            } else {
                console.log('form not valid')
            }
    }

    Register() {
        return (
            <div className="box animated fadeInUp">
                <h1 className="title">Register</h1>
                <form>
                    <div className="columns">
                        <div className="column">
                            <div className="field">
                                <p className="control has-icons-left has-icons-right">
                                    <input pattern=".{3,}" className="input" type="text" name="firstName" placeholder="First Name" onChange={this.handleChange} />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-user"></i>
                                    </span>
                                </p>
                            </div>
                            {this.state.formErrors.firstName ? <div className="notification is-warning is-light">
                                    {this.state.formErrors.firstName}
                                </div> : <></>}
                        </div>
                        <div className="column">
                            <div className="field">
                                <p className="control has-icons-left has-icons-right">
                                    <input pattern=".{3,}" className="input" type="text" name="lastName" placeholder="Last Name" onChange={this.handleChange} />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-user"></i>
                                    </span>
                                </p>
                            </div>
                            {this.state.formErrors.lastName ? <div className="notification is-warning is-light">
                                {this.state.formErrors.lastName}
                            </div> : <></>}
                        </div>
                        <div className="columns">
                        <div className="column">
                            <div className="field">
                                <p className="control has-icons-left has-icons-right">
                                    <input pattern=".{3,}" className="input" type="text" name="country" placeholder="Country" onChange={this.handleChange} />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-globe-europe"></i>
                                    </span>
                                </p>
                            </div>
                            {this.state.formErrors.country ? <div className="notification is-warning is-light">
                                    {this.state.formErrors.country}
                                </div> : <></>}
                        </div>
                        <div className="column">
                            <div className="field">
                                <p className="control has-icons-left has-icons-right">
                                    <input pattern=".{3,}" className="input" type="text" name="town" placeholder="Town" onChange={this.handleChange} />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-building"></i>
                                    </span>
                                </p>
                            </div>
                            {this.state.formErrors.town ? <div className="notification is-warning is-light">
                                {this.state.formErrors.town}
                            </div> : <></>}
                        </div>
                    </div>
                    </div>
                    <div className="field">
                        <p className="control has-icons-left has-icons-right">
                            <input pattern=".{3,}" className="input" type="text" name="username" placeholder="Username" onChange={this.handleChange} />
                            <span className="icon is-small is-left">
                                <i className="fas fa-tag"></i>
                            </span>
                        </p>
                    </div>
                    {this.state.formErrors.username ? <div className="notification is-warning is-light">
                            {this.state.formErrors.username}
                        </div> : <></>}
                    <div className="field">
                        <p className="control has-icons-left has-icons-right">
                            <input className="input" type="email" name="email" placeholder="Email" onChange={this.handleChange} />
                            <span className="icon is-small is-left">
                                <i className="fas fa-envelope"></i>
                            </span>
                        </p>
                    </div>
                    {this.state.formErrors.email ? <div className="notification is-warning is-light">
                            {this.state.formErrors.email}
                        </div> : <></>}
                        
                    <div className="field">
                        <p className="control has-icons-left">
                            <input className="input" type="password" name="password" placeholder="Password" onChange={this.handleChange} />
                            <span className="icon is-small is-left">
                                <i className="fas fa-lock"></i>
                            </span>
                        </p>
                    </div>
                    {this.state.formErrors.password ? <div className="notification is-warning is-light">
                            {this.state.formErrors.password}
                        </div> : <></>}
                    <div className="field">
                        <p className="control has-icons-left">
                            <input className="input" type="password" name="conPassword" placeholder="Confirm Password" onChange={this.handleChange} />
                            <span className="icon is-small is-left">
                                <i className="fas fa-lock"></i>
                            </span>
                        </p>
                    </div>
                    {this.state.formErrors.conPassword ? <div className="notification is-warning is-light">
                            {this.state.formErrors.conPassword}
                        </div> : <></>}
                    <div className="field">
                        <input className="button is-primary" value="Register" type="submit" onClick={this.handleSubmit} />
                    </div>
                </form>
                <p>Have an account already? <a onClick={this.Toggle} href="#">Sign in here.</a></p>
            </div>
        )
    }
    render() {
        return (
            <this.state.currentForm />
        )
    }
}
