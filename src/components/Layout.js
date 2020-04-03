import React, { Component } from 'react'
import Header from './Header'
import '../styles/main.scss'

export default class Layout extends Component {
    render() {
        return (
            <div className="app">
                <Header/>
            </div>
        )
    }
}

