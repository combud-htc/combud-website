import React, { Component } from 'react'
import Hero from '../components/Hero'
import About from '../components/About'

export default class index extends Component {

    render() {
        return (
            <div>
                <Hero/>
                <About/>
            </div>
        )
    }
}
