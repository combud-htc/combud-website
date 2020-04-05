import React, { Component } from 'react'
import axios from "axios";

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
            registerError: "",
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
        else if (this.state.currentForm === this.Register) {
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
                        <input className="button is-primary" value="Sign-in" type="submit" onClick={this.handleSubmit} />
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

        this.setState({ [name]: value }, () => {
            switch (name) {
                case 'firstName':
                    formErrors.firstName = value.length > 0 && value.length < 2 || value.length > 30 ? 'Minimum of 2 characters and maximum of 30 characters' : "";
                    break;
                case 'lastName':
                    formErrors.lastName = value.length > 0 && value.length < 2 || value.length > 30 ? 'Minimum of 2 characters and maximum of 30 characters' : "";
                    break;
                case 'username':
                    formErrors.username = value.length > 0 && /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(value) && value.length > 2 && value.length < 14 ? '' : "Only use ASCII characters and a minimum of 3 and maximum of 14 characters";
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
                    formErrors.country = value.length > 0 && value.length != 2 ? 'Minimum of 4 characters and maximum of 30 characters' : '';
                    break;
            }
            this.setState({ formErrors: formErrors })
            // console.log(this.state, this.state.formErrors)

        })
    }

    async handleSubmit(e) {
        e.preventDefault()
        if (this.state.currentForm == this.Signin) {
            const email = this.state.email;
            const password = this.state.password;

            try {
                const r = await axios.post("/api/Authentication/Login", {
                    "Email": email,
                    "Password": password
                });
                const response = r.data;
                if (response["statusCode"] != 1) {
                    this.setState({ loginError: true })
                } else {
                    this.setState({ loginError: false })
                    window.location.href = "/app"
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
                const r = await axios.post("/api/Authentication/Register", {
                    "Email": email,
                    "Password": password,
                    "Username": username,
                    "FirstName": firstName,
                    "LastName": lastName,
                    "Country": country,
                    "Town": town
                });

                const response = r.data;

                if (response["statusCode"] != 1) {
                    alert(response["errorMessage"]);
                    this.state.registerError = response["errorMessage"]
                } else {
                    // console.log("EPIC!");
                    //ask the user to check their inbocks!
                    window.location.href = "/login"
                }
            } catch (e) {
                console.error(e);
                // alert user to error!
            }
        } else {
            // console.log('form not valid')
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
                    </div>
                    <div className="columns">
                        <div className="column">
                            <div className="field">
                                <p className="control has-icons-left has-icons-right">
                                    <select onChange={this.handleChange} id="country" name="country" className="input form-control">
                                        <option value="AF">Afghanistan</option>
                                        <option value="AX">Åland Islands</option>
                                        <option value="AL">Albania</option>
                                        <option value="DZ">Algeria</option>
                                        <option value="AS">American Samoa</option>
                                        <option value="AD">Andorra</option>
                                        <option value="AO">Angola</option>
                                        <option value="AI">Anguilla</option>
                                        <option value="AQ">Antarctica</option>
                                        <option value="AG">Antigua and Barbuda</option>
                                        <option value="AR">Argentina</option>
                                        <option value="AM">Armenia</option>
                                        <option value="AW">Aruba</option>
                                        <option value="AU">Australia</option>
                                        <option value="AT">Austria</option>
                                        <option value="AZ">Azerbaijan</option>
                                        <option value="BS">Bahamas</option>
                                        <option value="BH">Bahrain</option>
                                        <option value="BD">Bangladesh</option>
                                        <option value="BB">Barbados</option>
                                        <option value="BY">Belarus</option>
                                        <option value="BE">Belgium</option>
                                        <option value="BZ">Belize</option>
                                        <option value="BJ">Benin</option>
                                        <option value="BM">Bermuda</option>
                                        <option value="BT">Bhutan</option>
                                        <option value="BO">Bolivia, Plurinational State of</option>
                                        <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                                        <option value="BA">Bosnia and Herzegovina</option>
                                        <option value="BW">Botswana</option>
                                        <option value="BV">Bouvet Island</option>
                                        <option value="BR">Brazil</option>
                                        <option value="IO">British Indian Ocean Territory</option>
                                        <option value="BN">Brunei Darussalam</option>
                                        <option value="BG">Bulgaria</option>
                                        <option value="BF">Burkina Faso</option>
                                        <option value="BI">Burundi</option>
                                        <option value="KH">Cambodia</option>
                                        <option value="CM">Cameroon</option>
                                        <option value="CA">Canada</option>
                                        <option value="CV">Cape Verde</option>
                                        <option value="KY">Cayman Islands</option>
                                        <option value="CF">Central African Republic</option>
                                        <option value="TD">Chad</option>
                                        <option value="CL">Chile</option>
                                        <option value="CN">China</option>
                                        <option value="CX">Christmas Island</option>
                                        <option value="CC">Cocos (Keeling) Islands</option>
                                        <option value="CO">Colombia</option>
                                        <option value="KM">Comoros</option>
                                        <option value="CG">Congo</option>
                                        <option value="CD">Congo, the Democratic Republic of the</option>
                                        <option value="CK">Cook Islands</option>
                                        <option value="CR">Costa Rica</option>
                                        <option value="CI">Côte d'Ivoire</option>
                                        <option value="HR">Croatia</option>
                                        <option value="CU">Cuba</option>
                                        <option value="CW">Curaçao</option>
                                        <option value="CY">Cyprus</option>
                                        <option value="CZ">Czech Republic</option>
                                        <option value="DK">Denmark</option>
                                        <option value="DJ">Djibouti</option>
                                        <option value="DM">Dominica</option>
                                        <option value="DO">Dominican Republic</option>
                                        <option value="EC">Ecuador</option>
                                        <option value="EG">Egypt</option>
                                        <option value="SV">El Salvador</option>
                                        <option value="GQ">Equatorial Guinea</option>
                                        <option value="ER">Eritrea</option>
                                        <option value="EE">Estonia</option>
                                        <option value="ET">Ethiopia</option>
                                        <option value="FK">Falkland Islands (Malvinas)</option>
                                        <option value="FO">Faroe Islands</option>
                                        <option value="FJ">Fiji</option>
                                        <option value="FI">Finland</option>
                                        <option value="FR">France</option>
                                        <option value="GF">French Guiana</option>
                                        <option value="PF">French Polynesia</option>
                                        <option value="TF">French Southern Territories</option>
                                        <option value="GA">Gabon</option>
                                        <option value="GM">Gambia</option>
                                        <option value="GE">Georgia</option>
                                        <option value="DE">Germany</option>
                                        <option value="GH">Ghana</option>
                                        <option value="GI">Gibraltar</option>
                                        <option value="GR">Greece</option>
                                        <option value="GL">Greenland</option>
                                        <option value="GD">Grenada</option>
                                        <option value="GP">Guadeloupe</option>
                                        <option value="GU">Guam</option>
                                        <option value="GT">Guatemala</option>
                                        <option value="GG">Guernsey</option>
                                        <option value="GN">Guinea</option>
                                        <option value="GW">Guinea-Bissau</option>
                                        <option value="GY">Guyana</option>
                                        <option value="HT">Haiti</option>
                                        <option value="HM">Heard Island and McDonald Islands</option>
                                        <option value="VA">Holy See (Vatican City State)</option>
                                        <option value="HN">Honduras</option>
                                        <option value="HK">Hong Kong</option>
                                        <option value="HU">Hungary</option>
                                        <option value="IS">Iceland</option>
                                        <option value="IN">India</option>
                                        <option value="ID">Indonesia</option>
                                        <option value="IR">Iran, Islamic Republic of</option>
                                        <option value="IQ">Iraq</option>
                                        <option value="IE">Ireland</option>
                                        <option value="IM">Isle of Man</option>
                                        <option value="IL">Israel</option>
                                        <option value="IT">Italy</option>
                                        <option value="JM">Jamaica</option>
                                        <option value="JP">Japan</option>
                                        <option value="JE">Jersey</option>
                                        <option value="JO">Jordan</option>
                                        <option value="KZ">Kazakhstan</option>
                                        <option value="KE">Kenya</option>
                                        <option value="KI">Kiribati</option>
                                        <option value="KP">Korea, Democratic People's Republic of</option>
                                        <option value="KR">Korea, Republic of</option>
                                        <option value="KW">Kuwait</option>
                                        <option value="KG">Kyrgyzstan</option>
                                        <option value="LA">Lao People's Democratic Republic</option>
                                        <option value="LV">Latvia</option>
                                        <option value="LB">Lebanon</option>
                                        <option value="LS">Lesotho</option>
                                        <option value="LR">Liberia</option>
                                        <option value="LY">Libya</option>
                                        <option value="LI">Liechtenstein</option>
                                        <option value="LT">Lithuania</option>
                                        <option value="LU">Luxembourg</option>
                                        <option value="MO">Macao</option>
                                        <option value="MK">Macedonia, the former Yugoslav Republic of</option>
                                        <option value="MG">Madagascar</option>
                                        <option value="MW">Malawi</option>
                                        <option value="MY">Malaysia</option>
                                        <option value="MV">Maldives</option>
                                        <option value="ML">Mali</option>
                                        <option value="MT">Malta</option>
                                        <option value="MH">Marshall Islands</option>
                                        <option value="MQ">Martinique</option>
                                        <option value="MR">Mauritania</option>
                                        <option value="MU">Mauritius</option>
                                        <option value="YT">Mayotte</option>
                                        <option value="MX">Mexico</option>
                                        <option value="FM">Micronesia, Federated States of</option>
                                        <option value="MD">Moldova, Republic of</option>
                                        <option value="MC">Monaco</option>
                                        <option value="MN">Mongolia</option>
                                        <option value="ME">Montenegro</option>
                                        <option value="MS">Montserrat</option>
                                        <option value="MA">Morocco</option>
                                        <option value="MZ">Mozambique</option>
                                        <option value="MM">Myanmar</option>
                                        <option value="NA">Namibia</option>
                                        <option value="NR">Nauru</option>
                                        <option value="NP">Nepal</option>
                                        <option value="NL">Netherlands</option>
                                        <option value="NC">New Caledonia</option>
                                        <option value="NZ">New Zealand</option>
                                        <option value="NI">Nicaragua</option>
                                        <option value="NE">Niger</option>
                                        <option value="NG">Nigeria</option>
                                        <option value="NU">Niue</option>
                                        <option value="NF">Norfolk Island</option>
                                        <option value="MP">Northern Mariana Islands</option>
                                        <option value="NO">Norway</option>
                                        <option value="OM">Oman</option>
                                        <option value="PK">Pakistan</option>
                                        <option value="PW">Palau</option>
                                        <option value="PS">Palestinian Territory, Occupied</option>
                                        <option value="PA">Panama</option>
                                        <option value="PG">Papua New Guinea</option>
                                        <option value="PY">Paraguay</option>
                                        <option value="PE">Peru</option>
                                        <option value="PH">Philippines</option>
                                        <option value="PN">Pitcairn</option>
                                        <option value="PL">Poland</option>
                                        <option value="PT">Portugal</option>
                                        <option value="PR">Puerto Rico</option>
                                        <option value="QA">Qatar</option>
                                        <option value="RE">Réunion</option>
                                        <option value="RO">Romania</option>
                                        <option value="RU">Russian Federation</option>
                                        <option value="RW">Rwanda</option>
                                        <option value="BL">Saint Barthélemy</option>
                                        <option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>
                                        <option value="KN">Saint Kitts and Nevis</option>
                                        <option value="LC">Saint Lucia</option>
                                        <option value="MF">Saint Martin (French part)</option>
                                        <option value="PM">Saint Pierre and Miquelon</option>
                                        <option value="VC">Saint Vincent and the Grenadines</option>
                                        <option value="WS">Samoa</option>
                                        <option value="SM">San Marino</option>
                                        <option value="ST">Sao Tome and Principe</option>
                                        <option value="SA">Saudi Arabia</option>
                                        <option value="SN">Senegal</option>
                                        <option value="RS">Serbia</option>
                                        <option value="SC">Seychelles</option>
                                        <option value="SL">Sierra Leone</option>
                                        <option value="SG">Singapore</option>
                                        <option value="SX">Sint Maarten (Dutch part)</option>
                                        <option value="SK">Slovakia</option>
                                        <option value="SI">Slovenia</option>
                                        <option value="SB">Solomon Islands</option>
                                        <option value="SO">Somalia</option>
                                        <option value="ZA">South Africa</option>
                                        <option value="GS">South Georgia and the South Sandwich Islands</option>
                                        <option value="SS">South Sudan</option>
                                        <option value="ES">Spain</option>
                                        <option value="LK">Sri Lanka</option>
                                        <option value="SD">Sudan</option>
                                        <option value="SR">Suriname</option>
                                        <option value="SJ">Svalbard and Jan Mayen</option>
                                        <option value="SZ">Swaziland</option>
                                        <option value="SE">Sweden</option>
                                        <option value="CH">Switzerland</option>
                                        <option value="SY">Syrian Arab Republic</option>
                                        <option value="TW">Taiwan, Province of China</option>
                                        <option value="TJ">Tajikistan</option>
                                        <option value="TZ">Tanzania, United Republic of</option>
                                        <option value="TH">Thailand</option>
                                        <option value="TL">Timor-Leste</option>
                                        <option value="TG">Togo</option>
                                        <option value="TK">Tokelau</option>
                                        <option value="TO">Tonga</option>
                                        <option value="TT">Trinidad and Tobago</option>
                                        <option value="TN">Tunisia</option>
                                        <option value="TR">Turkey</option>
                                        <option value="TM">Turkmenistan</option>
                                        <option value="TC">Turks and Caicos Islands</option>
                                        <option value="TV">Tuvalu</option>
                                        <option value="UG">Uganda</option>
                                        <option value="UA">Ukraine</option>
                                        <option value="AE">United Arab Emirates</option>
                                        <option value="GB">United Kingdom</option>
                                        <option value="US">United States</option>
                                        <option value="UM">United States Minor Outlying Islands</option>
                                        <option value="UY">Uruguay</option>
                                        <option value="UZ">Uzbekistan</option>
                                        <option value="VU">Vanuatu</option>
                                        <option value="VE">Venezuela, Bolivarian Republic of</option>
                                        <option value="VN">Viet Nam</option>
                                        <option value="VG">Virgin Islands, British</option>
                                        <option value="VI">Virgin Islands, U.S.</option>
                                        <option value="WF">Wallis and Futuna</option>
                                        <option value="EH">Western Sahara</option>
                                        <option value="YE">Yemen</option>
                                        <option value="ZM">Zambia</option>
                                        <option value="ZW">Zimbabwe</option>
                                    </select>
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
                    <div className="field">
                        <p className="control has-icons-left has-icons-right">
                            <input pattern=".{3,}" className="input" type="text" name="username" placeholder="Username" onChange={this.handleChange} />
                            <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
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
                            <input className="input" type="password" name="conPassword" placeholder="Confirm-password" onChange={this.handleChange} />
                            <span className="icon is-small is-left">
                                <i className="fas fa-lock"></i>
                            </span>
                        </p>
                    </div>
                    {this.state.formErrors.conPassword ? <div className="notification is-warning is-light">
                        {this.state.formErrors.conPassword}
                    </div> : <></>}
                    {this.state.registerError ? <div className="notification is-warning is-light">
                        {this.state.registerError}
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
