import React, { Component } from 'react'
import {Link} from 'gatsby'

export default class Hero extends Component {
    render() {
        return (
            <section className="hero animated fadeIn">
                <div className="columns">
                    <div className="column">
                        <div className="content">
                            <h1 className="title">A platform to help the most vulnerable during the COVID-19 pandemic.</h1>
                            <div>
                                <Link to=""><button className="button is-primary">How it works</button></Link>
                                <Link to="/login"><button className="button is-primary is-light">Get started</button></Link>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <img src="/vector.svg"/>
                    </div>
                </div>
            </section>
        )
    }
}
