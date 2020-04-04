import React, { Component } from 'react'
import { Link } from 'gatsby'

export default class Header extends Component {
    render() {
        return (
            <div>
                <header className="header">
                    <nav className="navbar is-primary">
                        <Link className="navbar-item-n" to="/">
                            <h1 className="title has-text-white">ComBud</h1>
                        </Link>
                        {this.props.loggedIn ?<Link className="navbar-item-n button is-link is-inverted is-pulled-right" to="">Sign-out</Link> : <></>}
                    </nav>
                </header>
            </div>
        )
    }
}
