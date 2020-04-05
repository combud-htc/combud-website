import React, { Component } from 'react'
import { Link } from 'gatsby'
import scrollTo from 'gatsby-plugin-smoothscroll';

export default class Hero extends Component {
    render() {
        return (
            <section className="hero">
                <div className="columns">
                    <div className="column">
                        <div className="content">
                            <h1 className="title">A platform to help the most vulnerable during the COVID-19 pandemic.</h1>
                            <div>
                                <a onClick={() => scrollTo('#about')}><button className="button is-primary">How it works</button></a>
                                <Link to="/login"><button className="button is-link is-light">Get started</button></Link>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <img src="/vector.svg" />
                    </div>
                </div>
            </section>
        )
    }
}
