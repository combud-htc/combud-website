import React, { Component } from 'react'
import LoginForm from '../components/LoginForm'

export default class login extends Component {
    render() {
        return (
            <div className="login">
                <div className="centerer">
                    <LoginForm/>
                </div>
            </div>
        )
    }
}
